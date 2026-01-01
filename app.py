import streamlit as st

st.set_page_config(page_title="BETONIQ", page_icon="🧱", layout="wide")

st.title("BETONIQ")
st.subheader("Bu depo bir React (npm) uygulaması içeriyor.")

st.info(
    "Share.streamlit.io ortamı bir Python Streamlit uygulaması bekler. Bu repo ise bir React projesi. "
    "Buradaki app.py yalnızca dağıtım için zorunlu ana dosya yolunu sağlamak amacıyla eklendi.\n\n"
    "React uygulamasını çalıştırmak için: `npm install` ve `npm start` (veya `npm run build`)."
)

st.markdown("""
**Nasıl ilerlenir?**
1. Bu repoyu clona edin veya fork'layın.
2. Frontend'i yerelde `npm install && npm start` ile çalıştırın.
3. Statik dağıtım için `npm run build` çıktı klasörünü (build/) uygun bir statik barındırmaya yükleyin.
4. Streamlit üzerinde gerçek React UI'yi host etmek isterseniz, build klasörünü bir static server (ör. `st.components.v1.html`) ile gömmeniz gerekir.
""")

st.code("""
git add .
git commit -m "feat: TS500 düzeltmeleri, rol kısıtları, streamlit app iskeleti"
git push
git status -u
""")

del __pycache__\betoniq_ts500.cpython-313.pyc
rmdir __pycache__
