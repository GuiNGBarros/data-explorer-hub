const techColors: Record<string, string> = {
  Python: "bg-[hsl(210,60%,20%)] text-[hsl(210,60%,70%)]",
  SQL: "bg-[hsl(30,50%,18%)] text-[hsl(30,50%,70%)]",
  "Power BI": "bg-[hsl(45,60%,18%)] text-[hsl(45,60%,70%)]",
  Pandas: "bg-[hsl(260,40%,20%)] text-[hsl(260,40%,70%)]",
  "Scikit-learn": "bg-[hsl(15,50%,18%)] text-[hsl(15,50%,70%)]",
  Matplotlib: "bg-[hsl(200,50%,18%)] text-[hsl(200,50%,70%)]",
  Excel: "bg-[hsl(140,40%,18%)] text-[hsl(140,40%,70%)]",
  "Azure Data Factory": "bg-[hsl(210,70%,18%)] text-[hsl(210,70%,65%)]",
  Databricks: "bg-[hsl(0,50%,18%)] text-[hsl(0,50%,70%)]",
  Snowflake: "bg-[hsl(195,60%,18%)] text-[hsl(195,60%,70%)]",
  dbt: "bg-[hsl(20,60%,18%)] text-[hsl(20,60%,70%)]",
  Airflow: "bg-[hsl(170,40%,18%)] text-[hsl(170,40%,70%)]",
  "Apache Kafka": "bg-[hsl(220,30%,18%)] text-[hsl(220,30%,70%)]",
  Spark: "bg-[hsl(10,60%,18%)] text-[hsl(10,60%,70%)]",
  Docker: "bg-[hsl(200,70%,18%)] text-[hsl(200,70%,65%)]",
};

const TechBadge = ({ name }: { name: string }) => {
  const color = techColors[name] || "bg-secondary text-secondary-foreground";
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-medium ${color}`}>
      {name}
    </span>
  );
};

export default TechBadge;
