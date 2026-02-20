"""
Build script: renders Jinja2 templates from _templates/pages/ into static HTML files.

Usage: python build.py

Templates in _templates/pages/ mirror the output directory structure:
  _templates/pages/index.html          → index.html
  _templates/pages/posts/index.html    → posts/index.html
  etc.
"""

import os
from jinja2 import Environment, FileSystemLoader

TEMPLATES_DIR = "_templates"
PAGES_DIR = os.path.join(TEMPLATES_DIR, "pages")
OUTPUT_ROOT = "."

env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))

for dirpath, _, filenames in os.walk(PAGES_DIR):
    for filename in filenames:
        if not filename.endswith(".html"):
            continue

        # Path of the template relative to _templates/ (for Jinja2 loader)
        template_path = os.path.relpath(
            os.path.join(dirpath, filename), TEMPLATES_DIR
        )

        # Output path mirrors the pages/ structure at the project root
        relative_to_pages = os.path.relpath(
            os.path.join(dirpath, filename), PAGES_DIR
        )
        output_path = os.path.join(OUTPUT_ROOT, relative_to_pages)

        os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)

        template = env.get_template(template_path)
        rendered = template.render()

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(rendered)

        print(f"Built: {output_path}")

print("Done.")
