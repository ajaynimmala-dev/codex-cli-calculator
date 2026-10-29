import os
from dataclasses import dataclass, field


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "Modular Calculator API")
    cors_origins: list[str] = field(default_factory=list)

    def __post_init__(self) -> None:
        origins = os.getenv(
            "CORS_ORIGINS",
            "http://localhost:4200,http://127.0.0.1:4200",
        )
        object.__setattr__(self, "cors_origins", [item.strip() for item in origins.split(",") if item.strip()])


settings = Settings()
