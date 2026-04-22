from datetime import datetime, timedelta
from airflow.decorators import dag, task
from pathlib import Path
import sys, os
from dotenv import load_dotenv

# Adiciona o diretório /opt/airflow/src ao path do Python
# Isso permite importar módulos customizados (extract, transform, load)
sys.path.insert(0,'/opt/airflow/src')

# Importa as funções do pipeline ETL
from extract_data import extract_weather_data
from load_data import load_weather_data
from transform_data import data_transformations

# Define o caminho absoluto do arquivo .env (garante funcionamento em qualquer contexto)
env_path = Path(__file__).resolve().parent.parent / "config" / ".env"

# Carrega variáveis de ambiente (ex: API_KEY usada na extração)
load_dotenv(env_path)

@dag(
    dag_id='weather_pipeline',  # Nome único da DAG no Airflow
    default_args={
        'owner':'airflow',
        'depends_on_past': False,  # Não depende de execuções anteriores
        'retries': 4,              # Número de tentativas em caso de falha
        'retry_delay': timedelta(minutes=2)  # Intervalo entre retries
    },
    description='Pipeline - SP Weather',

    # Expressão cron → executa todo dia às 11:00
    schedule='0 11 * * *',

    # Data de início da DAG (Airflow só executa a partir daqui)
    start_date=datetime(2026,4,22),

    # Evita execução retroativa (backfill)
    catchup=False,

    # Tags para organização na UI do Airflow
    tags=['weather', 'etl', 'weather - SP']
)

def weather_pipeline():

    @task
    def extract():
        # Etapa de extração → busca dados da API e salva localmente (JSON)
        extract_weather_data()

    @task
    def transform():
        # Etapa de transformação → aplica limpeza e normalização dos dados
        df = data_transformations()

        # Salva resultado intermediário em formato parquet (eficiente e rápido)
        df.to_parquet('/opt/airflow/data/temp_data_parquet', index=False)

    @task
    def load():
        import pandas as pd

        # Lê o arquivo parquet gerado na etapa anterior
        df = pd.read_parquet('/opt/airflow/data/temp_data_parquet')

        # Carrega os dados no banco PostgreSQL
        load_weather_data('sp_weather', df)

    # Define a ordem de execução das tasks (pipeline ETL)
    extract() >> transform() >> load()

# Instancia a DAG
weather_pipeline()