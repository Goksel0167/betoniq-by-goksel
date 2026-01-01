import streamlit as st
import streamlit.components.v1 as components
import os

# Sayfa ayarlarını en başta yapmalıyız
st.set_page_config(layout="wide", page_title="BETONIQ")

def load_react_build(build_dir):
    index_path = os.path.join(build_dir, "index.html")
    static_js_path = os.path.join(build_dir, "static", "js")
    static_css_path = os.path.join(build_dir, "static", "css")

    if not os.path.exists(index_path):
        st.error(f"HATA: '{index_path}' bulunamadı. Lütfen önce 'npm run build' yapın.")
        return None

    with open(index_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    if os.path.exists(static_css_path):
        for file in os.listdir(static_css_path):
            if file.endswith(".css"):
                with open(os.path.join(static_css_path, file), 'r', encoding='utf-8') as f:
                    html_content = html_content.replace("</head>", f"<style>{f.read()}</style></head>")

    if os.path.exists(static_js_path):
        js_scripts = ""
        for file in os.listdir(static_js_path):
            if file.endswith(".js"):
                with open(os.path.join(static_js_path, file), 'r', encoding='utf-8') as f:
                    js_scripts += f"<script>{f.read()}</script>"
        html_content = html_content.replace("</body>", f"{js_scripts}</body>")

    return html_content

BUILD_DIR = os.path.join(os.path.dirname(__file__), "build")
html_data = load_react_build(BUILD_DIR)

if html_data:
    components.html(html_data, height=1000, scrolling=True)