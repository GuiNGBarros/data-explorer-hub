import os
from sqlalchemy import create_engine, text
from urllib.parse import quote_plus
from dotenv import load_dotenv
from pathlib import Path
import pandas as pd
import logging

# Configuração de logging para acompanhar execução
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Define o caminho absoluto do arquivo .env (garante que funcione independente de onde o script for executado)
env_path = Path(__file__).resolve().parent.parent / "config" / ".env"

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv(env_path)

# Recupera credenciais do banco a partir das variáveis de ambiente
user = os.getenv('user')
password = os.getenv('password')
database = os.getenv('database')

# Host do banco → como está rodando em Docker, usamos o nome do serviço
host = 'postgres'

def get_engine():
    # Cria a engine de conexão com o PostgreSQL usando SQLAlchemy
    # quote_plus é usado para evitar problemas com caracteres especiais na senha
    return create_engine(
        f"postgresql+psycopg2://{user}:{quote_plus(password)}@{host}:5432/{database}"
    )

# Instancia a engine uma única vez (reutilizada nas operações)
engine = get_engine()

def load_weather_data(table_name: str, df):

    # Log para debug → mostra qual host está sendo usado na conexão
    logging.error(f"HOST INSERIDO: {host}")

    # Carrega os dados do DataFrame para o banco
    # if_exists='append' → adiciona dados sem sobrescrever a tabela
    df.to_sql(
        name=table_name,
        con=engine,
        if_exists='append',
        index=False
    )

    logging.info(f"Dados carregados com sucesso.")

    # Consulta de verificação → lê todos os dados da tabela após inserção
    df_check = pd.read_sql(f'SELECT * FROM {table_name}', con=engine)

    # Log com total de registros (validação simples do load)
    logging.info(f"Total de registros na tabela: {len(df_check)}\n")