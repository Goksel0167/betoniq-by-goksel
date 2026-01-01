import streamlit as st
import streamlit.components.v1 as components
import os

# Sayfa ayarlarını en başta yapmalıyız
st.set_page_config(layout="wide", page_title="BETONIQ")

def load_react_build(build_dir):
    """
    React build klasöründeki index.html'i okur, CSS ve JS dosyalarını
    HTML'in içine (inline) gömer ve render edilmeye hazır string döndürür.
    """
    index_path = os.path.join(build_dir, "index.html")
    static_js_path = os.path.join(build_dir, "static", "js")
    static_css_path = os.path.join(build_dir, "static", "css")

    # 1. index.html'i oku
    if not os.path.exists(index_path):
        st.error(f"HATA: '{index_path}' bulunamadı. Lütfen önce 'npm run build' yapın.")
        return None

    with open(index_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    # 2. CSS dosyalarını bul ve göm
    if os.path.exists(static_css_path):
        for file in os.listdir(static_css_path):
            if file.endswith(".css"):
                css_full_path = os.path.join(static_css_path, file)
                with open(css_full_path, 'r', encoding='utf-8') as f:
                    css_data = f.read()
                    # HTML'in <head> kısmına stili ekle
                    html_content = html_content.replace(
                        "</head>", 
                        f"<style>{css_data}</style></head>"
                    )

    # 3. JS dosyalarını bul ve göm
    if os.path.exists(static_js_path):
        js_scripts = ""
        for file in os.listdir(static_js_path):
            if file.endswith(".js"):
                js_full_path = os.path.join(static_js_path, file)
                with open(js_full_path, 'r', encoding='utf-8') as f:
                    js_data = f.read()
                    # Script'i HTML stringine eklemek üzere biriktir
                    js_scripts += f"<script>{js_data}</script>"
        
        # HTML'in </body> öncesine scriptleri ekle
        html_content = html_content.replace("</body>", f"{js_scripts}</body>")

    return html_content

# --- UYGULAMAYI BAŞLAT ---

# Build klasörünün yolu (app.py ile aynı dizinde 'build' klasörü var)
BUILD_DIR = os.path.join(os.path.dirname(__file__), "build")

html_data = load_react_build(BUILD_DIR)

if html_data:
    # React uygulamasını ekrana bas
    # height değerini uygulamanızın uzunluğuna göre artırıp azaltabilirsiniz (örn: 800, 1200)
    components.html(html_data, height=1000, scrolling=True)
