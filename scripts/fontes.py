"""Gera a fonte de display do site (instância estática da Bricolage Grotesque).

A Bricolage Grotesque variável (latin) tem 130 kB porque carrega três eixos. O site só usa um ponto
desse espaço: largura 75 (condensada), peso 800, tamanho ótico 96. Este script fixa esses valores e
grava um woff2 estático de ~20 kB em src/assets/fonts/, que o Astro serve com hash e cache longo.

Uso (precisa de fontTools e brotli: pip install fonttools brotli):
    python scripts/fontes.py
"""
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

raiz = Path(__file__).resolve().parent.parent
origem = raiz / "node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2"
destino = raiz / "src/assets/fonts/bricolage-condensada-800.woff2"
destino.parent.mkdir(parents=True, exist_ok=True)

fonte = TTFont(origem)
estatica = instantiateVariableFont(fonte, {"opsz": 96, "wght": 800, "wdth": 75}, updateFontNames=False)
estatica.flavor = "woff2"
estatica.save(destino)
print(f"{destino.relative_to(raiz)}  {destino.stat().st_size // 1024} kB")
