import pandas as pd 
import json
from pathlib import Path
import logging

# Configuração básica de logging para acompanhar execução do pipeline
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Caminho relativo até o arquivo JSON de dados (subindo duas pastas até chegar na raiz do projeto)
path_name = Path(__file__).parent.parent / 'data' / 'weather_data.json'

# Colunas que serão removidas após normalização
columns_name_to_drop = ['weather', 'weather_icon']

# Mapeamento de nomes de colunas (renomeação para padronização)
columns_names_to_rename = { 'base': 'base', 
                            'visibility': 'visibility', 
                            'dt': 'datetime', 
                            'timezone': 'timezone', 
                            'id' : 'city_id', 
                            'name': 'city_name', 
                            'cod': 'code',
                            'coord.lon': 'longitude', 
                            'coord.lat': 'latitude', 
                            'main.temp': 'temperature', 
                            'main.feels_like': 'feels_like',
                            'main.temp_min': 'temp_min', 
                            'main.temp_max': 'temp_max', 
                            'main.pressure': 'pressure', 
                            'main.humidity': 'humidity',
                            'main.sea_level': 'sea_level', 
                            'main.grnd_level': 'grnd_level', 
                            'wind.speed': 'wind_speed', 
                            'wind.deg': 'wind_deg',
                            'wind.gust': 'wind_gust', 
                            'clouds.all': 'clouds', 
                            'sys.country': 'country', 
                            'sys.sunrise': 'sunrise', 
                            'sys.sunset': 'sunset',
                            'weather_id': 'weather_id', 
                            'weather_main': 'weather_main', 
                            'weather_description': 'weather_description'}

# Colunas que representam timestamps e precisarão ser convertidas
datetime_columns = ['datetime', 'sunrise', 'sunset']

def create_dataframe(path_name:str) -> pd.DataFrame:
    logging.info(f"Criando DataFrame a partir do arquivo {path_name}")
    path = path_name

    # Verifica se o arquivo existe antes de tentar abrir
    if not path.exists():
        raise FileNotFoundError(f"O arquivo {path} não foi encontrado")

    # Carrega o JSON como dicionário Python
    with open(path) as f:
        data = json.load(f)

    # Normaliza o JSON para um DataFrame (flatten de estruturas aninhadas)
    df = pd.json_normalize(data)
    logging.info(f"\n DataFrame criado com sucesso com {df.shape[0]} linhas e {df.shape[1]} colunas")
    return df

def normalize_weather_columns(df: pd.DataFrame) -> pd.DataFrame:
    # A coluna 'weather' é uma lista → pegamos o primeiro elemento e normalizamos
    df_weather = pd.json_normalize(df['weather'].str[0])

    # Renomeia os campos internos da coluna weather
    df_weather = df_weather.rename(columns= 
                                {'id': 'weather_id',
                                'main': 'weather_main',
                                'description': 'weather_description',
                                'icon': 'weather_icon'})

    # Junta as novas colunas ao DataFrame original
    df = pd.concat([df,df_weather], axis = 1)
    logging.info(f"\n Coluna 'weather' normalizada - {len(df.columns)} colunas")
    return df

def drop_columns(df: pd.DataFrame, columns_names: list[str]) -> pd.DataFrame:
    logging.info(f"\n Removendo colunas {columns_names}")
    # Remove colunas desnecessárias
    df = df.drop(columns = columns_names)
    logging.info(f"\n Colunas removidas - {len(df.columns)} colunas restantes")
    return df

def rename_columns(df: pd.DataFrame, columns_names: dict[str,str]) -> pd.DataFrame:
    logging.info(f"\n Renomeando {len(columns_names)} colunas...")
    # Aplica padronização de nomes de colunas
    df = df.rename(columns = columns_names)
    logging.info("Colunas renomeadas")
    return df

def normalize_datetime_columns(df: pd.DataFrame, columns_names: list[str]) -> pd.DataFrame:
    logging.info(f"\n Convertendo colunas para datetime: {columns_names}")
    for name in columns_names:
        # Converte para datetime com timezone UTC
        # Depois converte para timezone local (São Paulo)
        df[name] = pd.to_datetime(df[name], unit = 's', utc= True).dt.tz_convert('America/Sao_Paulo')
        logging.info(f"\n Coluna {name} convertida para datetime")
    return df

def transform_datetime_columns(df: pd.DataFrame, columns_names: list[str]) -> pd.DataFrame:
    logging.info(f"Iniciando transformações nas colunas datetime")
    for name in columns_names:
        if name == 'datetime':
            # Se for a coluna principal, separa em data e hora
            df['date'] = df[name].dt.date
            df['time'] = df[name].dt.time
        else: 
            # Para sunrise/sunset, mantém apenas a hora
            df[name] = df[name].dt.time

    # Remove a coluna original datetime
    df = df.drop(columns = 'datetime')

    # Reorganiza colunas: coloca date e time no início
    cols = ['date'] + ['time'] + [col for col in df.columns if col != 'date' and col != 'time']
    df = df[cols]

    logging.info("Transformações nas colunas datetime realizadas com sucesso")
    return df

def data_transformations():
    print("\n Iniciando pipeline de transformações")

    # Pipeline sequencial de transformação (ETL - etapa Transform)
    df = create_dataframe(path_name)
    df = normalize_weather_columns(df)
    df = drop_columns(df,columns_name_to_drop)
    df = rename_columns(df, columns_names_to_rename)
    df = normalize_datetime_columns(df, datetime_columns)
    df = transform_datetime_columns(df, datetime_columns)

    logging.info("Pipeline de transformações concluído")
    return df

# Permite executar o script diretamente (fora do Airflow, por exemplo)
if __name__ == "__main__":
    data_transformations()