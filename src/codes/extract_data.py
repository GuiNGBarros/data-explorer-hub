import requests
import json
from pathlib import Path
import logging
import os
from dotenv import load_dotenv


# Caminho absoluto do arquivo .envbaseado na localização do script
env_path = Path(__file__).resolve().parent.parent / "config" / ".env"
# Carrega variáveis do arquivo .env (onde está sua API_KEY)
load_dotenv(env_path)

# Configuração básica de logs
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

def extract_weather_data() -> list:
    """
    Função responsável por extrair dados de uma API de clima,
    salvar em um arquivo JSON local e retornar os dados.

    Args:
        base_url (str): URL base da API (sem a API key)

    Returns:
        list/dict: Dados retornados pela API ou lista vazia em caso de erro
    """

    # Recupera a API_KEY do ambiente
    api_key = os.getenv("API_KEY")

    if not api_key:
        logging.error("API_KEY não encontrada no .env")
        return []

    # Monta a URL final com a API key
    base_url = "https://api.openweathermap.org/data/2.5/weather"

    params = {
        "q": "Sao Paulo,BR",
        "appid": api_key,
        "units": "metric",
        "lang": "pt_br"
    }

    try:
        # Faz a requisição HTTP GET com timeout de 10s
        response = requests.get(base_url, params=params, timeout=10)

        # Lança erro automaticamente para status
        response.raise_for_status()

        # Converte resposta para JSON
        data = response.json()

    except requests.exceptions.RequestException as e:
        # Captura qualquer erro de rede (timeout, conexão, etc)
        logging.error(f"Erro na requisição: {e}")
        return []

    except json.JSONDecodeError:
        # Caso a resposta não seja um JSON válido
        logging.error("Erro ao decodificar JSON da resposta")
        return []

    # Validação de conteúdo vazio
    if not data:
        logging.error("Erro: Nenhum dado retornado pela API")
        return []

    # Define caminho de saída
    output_path = Path('data/weather_data.json')

    # Cria diretório automaticamente (se não existir)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        # Salva os dados em formato JSON com indentação
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    except IOError as e:
        logging.error(f"Erro ao salvar arquivo: {e}")
        return []

    logging.info(f"Dados climáticos salvos com sucesso em {output_path}")

    return data

if __name__ == "__main__":
    extract_weather_data()