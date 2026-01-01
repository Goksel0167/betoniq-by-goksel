// 📚 BETON KALİTE DEFTERİ KONULARI
// Telif Hakları: Göksel Çapkın
// 
// YENİ KONU EKLEMEK İÇİN:
// 1. Aşağıdaki konular dizisine yeni bir obje ekleyin
// 2. id: Bir sonraki sayı olmalı
// 3. baslik: Konu başlığı
// 4. kategori: Konu kategorisi
// 5. icerik: HTML formatında içerik (backtick ` işaretleri arasında)

export const betonKaliteKonular = [
  {
    id: 1,
    baslik: "Beton Yüzey Kusurları ve Çözümleri",
    kategori: "Yüzey Problemleri",
    icerik: `
      <h3>🔍 Beton Yüzey Kusurları</h3>
      
      <h4>1. Bal Peteği (Honeycomb)</h4>
      <p><strong>Sebepleri:</strong></p>
      <ul>
        <li>Yetersiz sıkıştırma ve vibrasyon</li>
        <li>Kalıp sızdırması</li>
        <li>Aşırı kuru kıvam</li>
        <li>Kalın donatı çubuklarının sık yerleştirilmesi</li>
      </ul>
      <p><strong>Çözümler:</strong></p>
      <ul>
        <li>Yeterli vibrasyon uygulama (15-20 saniye)</li>
        <li>Kalıp sızdırmazlığını kontrol etme</li>
        <li>Uygun kıvam seçimi (slump kontrolü)</li>
        <li>İç vibratör kullanımı</li>
      </ul>

      <h4>2. Segregasyon (Ayrışma)</h4>
      <p><strong>Sebepleri:</strong></p>
      <ul>
        <li>Aşırı vibrasyon</li>
        <li>Yüksek düşme mesafesi</li>
        <li>Fazla akışkan kıvam</li>
        <li>Uygun olmayan agrega gradasyonu</li>
      </ul>
      <p><strong>Çözümler:</strong></p>
      <ul>
        <li>Kontrollü vibrasyon süresi</li>
        <li>Maksimum 1.5 m düşme yüksekliği</li>
        <li>Doğru su/çimento oranı (max 0.55)</li>
        <li>Uygun agrega karışımı (TSE 13515)</li>
      </ul>

      <h4>3. Çatlaklar</h4>
      <p><strong>Plastik Büzülme Çatlakları:</strong></p>
      <ul>
        <li>Sebep: Hızlı su kaybı, sıcak hava, rüzgar</li>
        <li>Çözüm: Erken kür, buhar püskürtme, rüzgar perdesi</li>
      </ul>
      <p><strong>Kuruma Büzülmesi Çatlakları:</strong></p>
      <ul>
        <li>Sebep: Yetersiz kür, düşük nem</li>
        <li>Çözüm: Minimum 7 gün ıslak kür, polietilen örtü</li>
      </ul>

      <h4>4. Eflorescence (Tuzlanma)</h4>
      <p><strong>Sebepleri:</strong></p>
      <ul>
        <li>Yüksek su muhtevası</li>
        <li>Kötü kür koşulları</li>
        <li>Kalıp yağı kalıntıları</li>
      </ul>
      <p><strong>Çözümler:</strong></p>
      <ul>
        <li>Düşük s/ç oranı (max 0.50)</li>
        <li>Kaliteli çimento kullanımı</li>
        <li>Yüzey hidrofobik kaplama</li>
      </ul>

      <h4>5. Renk Farklılıkları</h4>
      <p><strong>Sebepleri:</strong></p>
      <ul>
        <li>Çimento partileri arası fark</li>
        <li>Değişken su/çimento oranı</li>
        <li>Farklı kür koşulları</li>
      </ul>
      <p><strong>Çözümler:</strong></p>
      <ul>
        <li>Aynı partiden çimento kullanımı</li>
        <li>Sabit karışım oranları</li>
        <li>Homojen kür uygulaması</li>
      </ul>

      <hr style="margin: 20px 0;">
      
      <h3>📋 Kalite Kontrol Checklist</h3>
      <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #2196F3; color: white;">
            <th style="padding: 10px;">Kontrol Noktası</th>
            <th style="padding: 10px;">Standart Değer</th>
            <th style="padding: 10px;">Kontrol Sıklığı</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">Slump Değeri</td>
            <td style="padding: 8px;">S2-S3 (50-150mm)</td>
            <td style="padding: 8px;">Her kamyon</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Beton Sıcaklığı</td>
            <td style="padding: 8px;">5-32°C</td>
            <td style="padding: 8px;">Her kamyon</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Vibrasyon Süresi</td>
            <td style="padding: 8px;">15-20 saniye</td>
            <td style="padding: 8px;">Sürekli</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Kür Başlangıcı</td>
            <td style="padding: 8px;">4-6 saat sonra</td>
            <td style="padding: 8px;">Her döküm</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Numune Alma</td>
            <td style="padding: 8px;">50 m³'de 1 set</td>
            <td style="padding: 8px;">TS EN 206</td>
          </tr>
        </tbody>
      </table>

      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #ffc107;">
        <strong>⚠️ ÖNEMLİ NOT:</strong> Tüm kontroller mutlaka kayıt altına alınmalı ve laboratuvar raporlarında saklanmalıdır.
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 11px; color: #999; text-align: right; margin: 10px 0 0 0;">
        📚 Kaynak: Genel Beton Teknolojisi Bilgileri / TS EN 206
      </p>
    `
  },
  {
    id: 2,
    baslik: "Cüruf ve Külün Dayanım Üzerindeki Farkları",
    kategori: "Mineral Katkılar",
    icerik: `
      <h3>🏭 Mineral Katkılar: Cüruf ve Uçucu Kül</h3>
      
      <h4>1. Önemli Farklar</h4>
      
      <h5>🔹 Yüksek Fırın Cürufu (GGBFS)</h5>
      <p><strong>Özellikleri:</strong></p>
      <ul>
        <li><strong>Erken Dayanım:</strong> Daha hızlı dayanım kazanımı (7-14 gün)</li>
        <li><strong>Hidratasyon Hızı:</strong> Yüksek - çimentoya benzer reaktivite</li>
        <li><strong>İkame Oranı:</strong> %30-70 (yüksek oranlarda kullanılabilir)</li>
        <li><strong>Renk:</strong> Beyazımsı-gri, daha açık renk</li>
        <li><strong>pH Değeri:</strong> Yüksek alkalinite (>12)</li>
      </ul>
      <p><strong>Avantajları:</strong></p>
      <ul>
        <li>✅ Yüksek nihai dayanım (28+ gün)</li>
        <li>✅ Sülfat direnci mükemmel</li>
        <li>✅ Düşük hidratasyon ısısı</li>
        <li>✅ Geçirimsizlik ve durabilite üstün</li>
        <li>✅ Klorür penetrasyonuna karşı dayanıklı</li>
      </ul>
      
      <h5>🔸 Uçucu Kül (Fly Ash - FA)</h5>
      <p><strong>Özellikleri:</strong></p>
      <ul>
        <li><strong>Erken Dayanım:</strong> Yavaş başlangıç (7-14 gün düşük)</li>
        <li><strong>Hidratasyon Hızı:</strong> Düşük - puzolanik reaksiyon gerektirir</li>
        <li><strong>İkame Oranı:</strong> %15-35 (sınırlı kullanım)</li>
        <li><strong>Renk:</strong> Koyu gri-siyah</li>
        <li><strong>pH Değeri:</strong> Orta alkalinite</li>
      </ul>
      <p><strong>Avantajları:</strong></p>
      <ul>
        <li>✅ İşlenebilirlik artışı</li>
        <li>✅ Alkali-agrega reaksiyonu (AAR) kontrolü</li>
        <li>✅ Maliyeti düşük</li>
        <li>✅ Geç dönem dayanımı iyi (90+ gün)</li>
        <li>✅ Su ihtiyacını azaltır</li>
      </ul>

      <hr style="margin: 20px 0;">

      <h4>2. Dayanım Gelişimi Karşılaştırması</h4>
      <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #2196F3; color: white;">
            <th style="padding: 10px;">Yaş (gün)</th>
            <th style="padding: 10px;">Referans Çimento</th>
            <th style="padding: 10px;">%50 Cüruf</th>
            <th style="padding: 10px;">%30 Uçucu Kül</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px; text-align: center;">7</td>
            <td style="padding: 8px; text-align: center;">100%</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">85-95%</td>
            <td style="padding: 8px; text-align: center; background: #ffccbc;">60-75%</td>
          </tr>
          <tr>
            <td style="padding: 8px; text-align: center;">28</td>
            <td style="padding: 8px; text-align: center;">100%</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">105-115%</td>
            <td style="padding: 8px; text-align: center; background: #fff9c4;">85-95%</td>
          </tr>
          <tr>
            <td style="padding: 8px; text-align: center;">90</td>
            <td style="padding: 8px; text-align: center;">100%</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">115-130%</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">100-110%</td>
          </tr>
          <tr>
            <td style="padding: 8px; text-align: center;">365</td>
            <td style="padding: 8px; text-align: center;">100%</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">125-140%</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">110-120%</td>
          </tr>
        </tbody>
      </table>
      <p style="font-size: 13px; color: #666; margin-top: 10px;">
        * Yeşil: Üstün performans, Sarı: Orta performans, Turuncu: Düşük performans
      </p>

      <hr style="margin: 20px 0;">

      <h4>3. Kullanım Alanları</h4>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196F3;">
          <h5 style="margin-top: 0;">🔹 Cüruf İçin İdeal:</h5>
          <ul style="margin: 10px 0;">
            <li>Deniz yapıları (sülfat ortamı)</li>
            <li>Yüksek mukavemetli beton (C40+)</li>
            <li>Erken kalıp açma gereken projeler</li>
            <li>Atık su arıtma tesisleri</li>
            <li>Köprü ve viyadükler</li>
          </ul>
        </div>
        
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800;">
          <h5 style="margin-top: 0;">🔸 Uçucu Kül İçin İdeal:</h5>
          <ul style="margin: 10px 0;">
            <li>Baraj betonları (düşük ısı)</li>
            <li>Kütlesel beton uygulamaları</li>
            <li>Ekonomik yapılar</li>
            <li>AAR riskli agregalarla çalışma</li>
            <li>Akışkan/pompalanabilir beton</li>
          </ul>
        </div>
      </div>

      <hr style="margin: 20px 0;">

      <h4>4. Kritik Noktalar ve Uyarılar</h4>
      
      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ffc107;">
        <strong>⚠️ CÜRUF KULLANIMI:</strong>
        <ul>
          <li>Yüksek oranlarda (%70+) erken donma riski oluşabilir</li>
          <li>Aktivatör gerektirebilir (alkali aktivasyon)</li>
          <li>Kalite kontrol kritik - cam fazı oranı önemli</li>
          <li>Nem kontrolü yapılmalı (dehidrasyon riski)</li>
        </ul>
      </div>

      <div style="background: #ffebee; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f44336;">
        <strong>⚠️ UÇUCU KÜL KULLANIMI:</strong>
        <ul>
          <li>Soğuk havalarda kullanımdan kaçınılmalı (<5°C)</li>
          <li>Erken dayanım gereken yerlerde uygun değil</li>
          <li>LOI (yanma kaybı) %5'i geçmemeli</li>
          <li>Finlik önemli - Blaine >3000 cm²/g olmalı</li>
          <li>Karbon içeriği yüksekse hava sürükleyici etkilenir</li>
        </ul>
      </div>

      <hr style="margin: 20px 0;">

      <h4>5. Kombinasyon Kullanımı</h4>
      <p><strong>Optimal Karışım:</strong> %30 Cüruf + %15 Uçucu Kül + %55 Çimento</p>
      <p><strong>Avantajlar:</strong></p>
      <ul>
        <li>✅ Hem erken hem geç dayanım dengesi</li>
        <li>✅ Maliyet optimizasyonu</li>
        <li>✅ Maksimum durabilite</li>
        <li>✅ İşlenebilirlik ve pompalanabilirlik</li>
      </ul>

      <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #4caf50;">
        <strong>💡 SONUÇ:</strong> Cüruf erken ve yüksek dayanım gerektiğinde, uçucu kül ekonomi ve işlenebilirlik öncelikli projelerde tercih edilmelidir. İkisi birlikte kullanıldığında sinerjik etki sağlar.
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 11px; color: #999; text-align: right; margin: 10px 0 0 0;">
        📚 Kaynak: Göksel Çapkın - Mineral Katkılar Araştırması
      </p>
    `
  },
  {
    id: 3,
    baslik: "Betonda Çok İnce Maddeler",
    kategori: "Agrega Kalitesi",
    icerik: `
      <h3>🔬 Betonda Çok İnce Maddeler (ÇİM)</h3>
      
      <h4>1. Tanım ve Önemi</h4>
      <p><strong>Çok İnce Madde (ÇİM) Nedir?</strong></p>
      <ul>
        <li>0.063 mm (63 mikron) elekten geçen agregadaki toz partiküller</li>
        <li>Kil, silt, toz halindeki kireçtaşı ve diğer ince minerallerden oluşur</li>
        <li>TS EN 933-1 standardına göre ölçülür</li>
        <li>Agrega üretim yöntemi ve kaynağına göre değişir</li>
      </ul>
      
      <p><strong>Neden Önemlidir?</strong></p>
      <ul>
        <li>Beton su ihtiyacını doğrudan etkiler</li>
        <li>Çimento-agrega aderansını değiştirir</li>
        <li>Kimyasal katkı verimliliğini azaltabilir</li>
        <li>Dayanım ve durabiliteyi etkiler</li>
      </ul>

      <hr style="margin: 20px 0;">

      <h4>2. Standart Limitleri</h4>
      <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #2196F3; color: white;">
            <th style="padding: 10px;">Agrega Tipi</th>
            <th style="padding: 10px;">TS EN 12620 Limiti</th>
            <th style="padding: 10px;">Önerilen Limit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">İnce Agrega (0-4 mm)</td>
            <td style="padding: 8px; text-align: center;">Maks. %10</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">%3-5</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Orta Agrega (4-16 mm)</td>
            <td style="padding: 8px; text-align: center;">Maks. %4</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">%1-2</td>
          </tr>
          <tr>
            <td style="padding: 8px;">İri Agrega (16+ mm)</td>
            <td style="padding: 8px; text-align: center;">Maks. %1.5</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">%0.5-1</td>
          </tr>
          <tr style="background: #fff3cd;">
            <td style="padding: 8px;"><strong>Yüksek Performans Beton</strong></td>
            <td style="padding: 8px; text-align: center;"><strong>Maks. %3</strong></td>
            <td style="padding: 8px; text-align: center;"><strong>%1-2</strong></td>
          </tr>
        </tbody>
      </table>

      <hr style="margin: 20px 0;">

      <h4>3. ÇİM'in Olumsuz Etkileri</h4>
      
      <div style="background: #ffebee; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f44336;">
        <strong>❌ Yüksek ÇİM İçeriğinin Zararları:</strong>
        <ul>
          <li><strong>Su İhtiyacı Artışı:</strong> %1 ÇİM artışı = ~%2-3 su artışı</li>
          <li><strong>Dayanım Kaybı:</strong> Yüksek s/ç oranı nedeniyle %10-20 düşüş</li>
          <li><strong>Katkı Tüketimi:</strong> Akışkanlaştırıcı ihtiyacı %30-50 artar</li>
          <li><strong>Rötre Artışı:</strong> Kuruma büzülmesi ve çatlak riski</li>
          <li><strong>Pompalama Zorluğu:</strong> Yüksek viskozite, tıkanma</li>
          <li><strong>Segregasyon:</strong> Homojenlik bozulması</li>
        </ul>
      </div>

      <hr style="margin: 20px 0;">

      <h4>4. ÇİM Türleri ve Etkileri</h4>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196F3;">
          <h5 style="margin-top: 0;">🔹 İnerttir (Zararsız):</h5>
          <ul style="margin: 10px 0;">
            <li>Kuvars tozu</li>
            <li>Kireçtaşı tozu</li>
            <li>Granit tozu</li>
            <li>Mermer tozu</li>
          </ul>
          <p><strong>Etki:</strong> Filler etkisi, su ihtiyacı hafif artar, kontrollü miktarda zararsız.</p>
        </div>
        
        <div style="background: #fff3e0; padding: 15px; border-radius: 8px; border-left: 4px solid #ff9800;">
          <h5 style="margin-top: 0;">🔸 Aktiftir (Zararlı):</h5>
          <ul style="margin: 10px 0;">
            <li>Kil mineralleri (montmorillonit)</li>
            <li>Organik maddeler</li>
            <li>Linyit partikülleri</li>
            <li>Yüksek plastisiteli silt</li>
          </ul>
          <p><strong>Etki:</strong> Su emme yüksek, kimyasal katkı adsorbe eder, dayanım ciddi düşer.</p>
        </div>
      </div>

      <hr style="margin: 20px 0;">

      <h4>5. Kontrol ve Test Yöntemleri</h4>
      
      <p><strong>A) Yıkama Deneyi (TS EN 933-1):</strong></p>
      <ul>
        <li>En yaygın yöntem</li>
        <li>Agrega numunesini 63 μm elekten yıkama</li>
        <li>Geçen miktar tartılarak % hesaplanır</li>
        <li>Sonuç: Toplam ÇİM miktarı</li>
      </ul>

      <p><strong>B) Sedimantasyon Testi:</strong></p>
      <ul>
        <li>ÇİM'in kil içeriğini belirler</li>
        <li>Cam tüpte çökelme prensibine dayanır</li>
        <li>Kil oranı yüksekse uyarı verir</li>
      </ul>

      <p><strong>C) Metilen Mavisi Deneyi (MB):</strong></p>
      <ul>
        <li>ÇİM'in aktivitesini ölçer</li>
        <li>Kil mineralleri boyayı adsorbe eder</li>
        <li>MB değeri >1.5 g/kg ise zararlı kil var demektir</li>
      </ul>

      <hr style="margin: 20px 0;">

      <h4>6. Çözüm Yöntemleri</h4>
      
      <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #4caf50;">
        <strong>✅ ÇİM Problemini Çözmek İçin:</strong>
        <ul>
          <li><strong>Agrega Yıkama:</strong> En etkili yöntem, taş ocağında yıkama sistemi</li>
          <li><strong>Filler Ekleme:</strong> İnert filler (kireçtaşı tozu) ile ikame</li>
          <li><strong>Gradasyonu Ayarlama:</strong> Farklı kaynaktan agrega karıştırma</li>
          <li><strong>Yüksek Performans Katkıları:</strong> PCE bazlı süper akışkanlaştırıcı</li>
          <li><strong>Viskozite Düzenleyici:</strong> VMA katkıları segregasyon engeller</li>
          <li><strong>Su/Çimento Kontrolü:</strong> Mümkün olan en düşük s/ç oranı</li>
        </ul>
      </div>

      <hr style="margin: 20px 0;">

      <h4>7. Özel Durumlar</h4>
      
      <p><strong>Pompalanabilir Beton:</strong></p>
      <ul>
        <li>ÇİM miktarı %3-5 aralığında olmalı</li>
        <li>Çok düşük ÇİM pompalama sorununa neden olur</li>
        <li>İnert filler ekleyerek dengeleme yapılır</li>
      </ul>

      <p><strong>Kendiliğinden Yerleşen Beton (KYB):</strong></p>
      <ul>
        <li>Filler ihtiyacı yüksek (400-600 kg/m³)</li>
        <li>Çimento + ÇİM + Ek filler = Toplam filler</li>
        <li>ÇİM'in inert olması kritik</li>
      </ul>

      <p><strong>Yüksek Dayanımlı Beton (C50+):</strong></p>
      <ul>
        <li>Maksimum %2 ÇİM limiti</li>
        <li>Mutlaka yıkanmış agrega kullanımı</li>
        <li>Metilen mavisi testi şart</li>
      </ul>

      <hr style="margin: 20px 0;">

      <h4>8. Kalite Kontrol Sıklığı</h4>
      <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #2196F3; color: white;">
            <th style="padding: 10px;">Proje Tipi</th>
            <th style="padding: 10px;">Test Sıklığı</th>
            <th style="padding: 10px;">Kabul Kriteri</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">Standart Beton</td>
            <td style="padding: 8px;">Haftada 1 kez</td>
            <td style="padding: 8px;"><%5 (ince agrega)</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Yüksek Mukavemet</td>
            <td style="padding: 8px;">Her parti</td>
            <td style="padding: 8px;"><%2</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Özel Mühendislik</td>
            <td style="padding: 8px;">Her parti + MB testi</td>
            <td style="padding: 8px;"><%2 + MB<1.5</td>
          </tr>
        </tbody>
      </table>

      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #ffc107;">
        <strong>⚠️ ÖNEMLİ HATIRLATMA:</strong> ÇİM sadece miktar olarak değil, içeriği (inert/aktif) olarak da değerlendirilmelidir. Yüksek ÇİM içeriği her zaman kötü değildir, ancak kil içermemesi şarttır!
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 11px; color: #999; text-align: right; margin: 10px 0 0 0;">
        📚 Kaynak: TeknoBeton - "Betonda Çok İnce Maddeler" / TS EN 933-1, TS EN 12620
      </p>
    `
  },
  {
    id: 4,
    baslik: "Mineral Katkılı Betonlarda Dikkat Edilecek Hususlar",
    kategori: "Mineral Katkılar",
    icerik: `
      <h3>⚠️ Mineral Katkılı Betonlarda (Cüruf ve Uçucu Kül) Dikkat Edilmesi Gereken Hususlar</h3>
      
      <h4>1. Genel Prensipler</h4>
      <p><strong>Mineral Katkı Kullanım Amacı:</strong></p>
      <ul>
        <li>Çimento tüketimini azaltarak maliyet düşürme</li>
        <li>Hidratasyon ısısını düşürerek çatlak riskini azaltma</li>
        <li>Geç dönem dayanımını artırma</li>
        <li>Sülfat ve klorür direncini iyileştirme</li>
        <li>İşlenebilirliği artırma</li>
        <li>Çevresel sürdürülebilirlik (atık değerlendirme)</li>
      </ul>

      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ffc107;">
        <strong>⚠️ TEMEL KURAL:</strong> Mineral katkı kullanımı profesyonel bilgi ve dikkatli uygulama gerektirir. Yanlış kullanım beklenmedik sorunlara yol açabilir!
      </div>

      <hr style="margin: 20px 0;">

      <h4>2. Yüksek Fırın Cürufu (GGBFS) Kullanımında Dikkat Edilecekler</h4>
      
      <h5>✅ Doğru Uygulamalar:</h5>
      <ul>
        <li><strong>İkame Oranı:</strong> %30-70 arası kullanılabilir</li>
        <li><strong>Finlik:</strong> 400-550 m²/kg Blaine yüzey alanı ideal</li>
        <li><strong>Aktivite İndeksi:</strong> 7 günde min. %75, 28 günde min. %95</li>
        <li><strong>Cam Fazı:</strong> Minimum %2/3 oranında cam faz bulunmalı</li>
        <li><strong>Sıcaklık:</strong> 20°C üzerinde optimum çalışır</li>
        <li><strong>İdeal Projeler:</strong> Deniz yapıları, sülfat maruziyeti, yüksek mukavemet</li>
      </ul>

      <h5>❌ Yaygın Hatalar ve Sorunlar:</h5>
      <div style="background: #ffebee; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f44336;">
        <ul>
          <li><strong>Aşırı Yüksek İkame (%80+):</strong> Erken dayanım çok düşer, priz süresi uzar</li>
          <li><strong>Soğuk Hava (<5°C):</strong> Hidratasyon yavaşlar, donma riski artar</li>
          <li><strong>Yetersiz Kür:</strong> Puzolanik reaksiyon tamamlanmaz, yüzey zayıf kalır</li>
          <li><strong>Düşük Kaliteli Cüruf:</strong> Cam fazı az ise reaktivite düşük olur</li>
          <li><strong>Hatalı Depolama:</strong> Nem alırsa aktivitesini kaybeder</li>
          <li><strong>Aktivatör Eksikliği:</strong> Yüksek oranlarda alkali aktivatör gerekebilir</li>
        </ul>
      </div>

      <hr style="margin: 20px 0;">

      <h4>3. Uçucu Kül (Fly Ash) Kullanımında Dikkat Edilecekler</h4>
      
      <h5>✅ Doğru Uygulamalar:</h5>
      <ul>
        <li><strong>İkame Oranı:</strong> %15-35 arası güvenli</li>
        <li><strong>Finlik:</strong> Minimum 3000 cm²/g Blaine</li>
        <li><strong>LOI (Yanma Kaybı):</strong> Maksimum %5 (tercihen %3 altı)</li>
        <li><strong>Aktivite İndeksi:</strong> 28 günde min. %75, 90 günde min. %85</li>
        <li><strong>Sınıf F Kül:</strong> CaO < %10 (en yaygın, düşük alkali)</li>
        <li><strong>İdeal Projeler:</strong> Barajlar, kütlesel beton, AAR riskli agregalar</li>
      </ul>

      <h5>❌ Yaygın Hatalar ve Sorunlar:</h5>
      <div style="background: #ffebee; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #f44336;">
        <ul>
          <li><strong>Erken Dayanım Gereken Yerlerde:</strong> 7-14 gün dayanım %60-70'e düşer</li>
          <li><strong>Yüksek LOI (>%5):</strong> Hava sürükleyici katkılar etkisiz kalır</li>
          <li><strong>Yüksek Karbon İçeriği:</strong> Renk problemleri, köpük oluşumu</li>
          <li><strong>Soğuk Hava Uygulaması:</strong> Puzolanik reaksiyon çok yavaş başlar</li>
          <li><strong>Yetersiz Su Miktarı:</strong> Küresel partiküller yeterli reaksiyona girmez</li>
          <li><strong>Kalitesiz Kül:</strong> Ham kömür partikülleri, ağır metaller</li>
        </ul>
      </div>

      <hr style="margin: 20px 0;">

      <h4>4. Kritik Kontrol Noktaları</h4>
      
      <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #2196F3; color: white;">
            <th style="padding: 10px;">Parametre</th>
            <th style="padding: 10px;">Cüruf</th>
            <th style="padding: 10px;">Uçucu Kül</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">Minimum Sıcaklık</td>
            <td style="padding: 8px; text-align: center;">5°C</td>
            <td style="padding: 8px; text-align: center;">10°C</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Kür Süresi (Minimum)</td>
            <td style="padding: 8px; text-align: center;">7 gün</td>
            <td style="padding: 8px; text-align: center;">14 gün</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Kalıp Açma Süresi</td>
            <td style="padding: 8px; text-align: center;">+20% gecikme</td>
            <td style="padding: 8px; text-align: center;">+30% gecikme</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Su/Bağlayıcı Oranı</td>
            <td style="padding: 8px; text-align: center;">Max 0.50</td>
            <td style="padding: 8px; text-align: center;">Max 0.55</td>
          </tr>
          <tr>
            <td style="padding: 8px;">Kimyasal Katkı İhtiyacı</td>
            <td style="padding: 8px; text-align: center; background: #c8e6c9;">Düşük</td>
            <td style="padding: 8px; text-align: center; background: #fff9c4;">Orta</td>
          </tr>
        </tbody>
      </table>

      <hr style="margin: 20px 0;">

      <h4>5. Kombinasyon Kullanımı (Üçlü Bağlayıcı)</h4>
      
      <p><strong>Optimal Karışım Örnekleri:</strong></p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; border-left: 4px solid #2196F3;">
          <h5 style="margin-top: 0;">🔹 Dengeli Performans:</h5>
          <p><strong>Çimento:</strong> %60</p>
          <p><strong>Cüruf:</strong> %25</p>
          <p><strong>Uçucu Kül:</strong> %15</p>
          <p style="font-size: 13px; color: #666;">
            Hem erken hem geç dayanım dengeli, ekonomik
          </p>
        </div>
        
        <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50;">
          <h5 style="margin-top: 0;">🔹 Yüksek Durabilite:</h5>
          <p><strong>Çimento:</strong> %50</p>
          <p><strong>Cüruf:</strong> %35</p>
          <p><strong>Uçucu Kül:</strong> %15</p>
          <p style="font-size: 13px; color: #666;">
            Deniz yapıları, atık su arıtma için ideal
          </p>
        </div>
      </div>

      <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ffc107;">
        <strong>💡 Sinerjik Etki:</strong> Cüruf + Uçucu Kül kombinasyonu, her ikisinin avantajlarını birleştirir ve dezavantajlarını azaltır. Cüruf erken dayanımı sağlarken, uçucu kül işlenebilirlik ve ekonomi katar.
      </div>

      <hr style="margin: 20px 0;">

      <h4>6. Kalite Kontrol ve Test Protokolü</h4>
      
      <h5>📋 Mineral Katkı Kabul Testleri:</h5>
      <ul>
        <li><strong>Fiziksel:</strong> Finlik (Blaine), nem içeriği, yoğunluk</li>
        <li><strong>Kimyasal:</strong> SiO₂, Al₂O₃, CaO, MgO, SO₃, LOI</li>
        <li><strong>Aktivite:</strong> 7, 28, 90 günlük aktivite indeksi</li>
        <li><strong>Priz Süresi:</strong> Referansa göre maksimum +2 saat</li>
        <li><strong>Genleşme:</strong> Otoklav genleşme testi</li>
      </ul>

      <h5>🔬 Beton Üzerinde Kontroller:</h5>
      <ul>
        <li><strong>Taze Beton:</strong> Slump, hava miktarı, sıcaklık, priz süresi</li>
        <li><strong>Sertleşmiş Beton:</strong> 7, 28, 56, 90 gün basınç dayanımı</li>
        <li><strong>Durabilite:</strong> Klorür penetrasyonu, sülfat direnci, donma-çözülme</li>
        <li><strong>Mikroyapı:</strong> Gözenek yapısı, hidratasyon ürünleri (opsiyonel)</li>
      </ul>

      <hr style="margin: 20px 0;">

      <h4>7. Özel Durumlar ve Çözümler</h4>
      
      <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #2196F3;">
        <strong>❄️ Kış Betonajı:</strong>
        <ul>
          <li>Mineral katkı oranını %10-15 azalt</li>
          <li>Tip I çimento kullan (hızlı dayanım)</li>
          <li>Beton sıcaklığını 15-20°C'de tut</li>
          <li>Kür süresini 2 katına çıkar</li>
          <li>Isıtmalı kalıp veya kaplama kullan</li>
        </ul>
      </div>

      <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #ff9800;">
        <strong>🔥 Yaz Betonajı:</strong>
        <ul>
          <li>Mineral katkı oranını artırabilirsiniz</li>
          <li>Hidratasyon ısısı düşer, çatlak riski azalır</li>
          <li>Su buharlaşmasını önleyin (erken kür)</li>
          <li>Gölgede veya gece dökümü tercih edin</li>
        </ul>
      </div>

      <div style="background: #f3e5f5; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #9c27b0;">
        <strong>🏗️ Pompalanabilir Beton:</strong>
        <ul>
          <li>Uçucu kül %20-25 oranında kullanın</li>
          <li>Küresel partiküller akışkanlığı artırır</li>
          <li>Segregasyon riski azalır</li>
          <li>Pompa basıncı düşer, enerji tasarrufu</li>
        </ul>
      </div>

      <hr style="margin: 20px 0;">

      <h4>8. Standartlar ve Referanslar</h4>
      
      <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <thead>
          <tr style="background: #2196F3; color: white;">
            <th style="padding: 10px;">Standart</th>
            <th style="padding: 10px;">Konu</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;"><strong>TS EN 15167</strong></td>
            <td style="padding: 8px;">Yüksek Fırın Cürufu</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>TS EN 450</strong></td>
            <td style="padding: 8px;">Uçucu Kül</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>TS EN 206</strong></td>
            <td style="padding: 8px;">Beton Standartı</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>ASTM C989</strong></td>
            <td style="padding: 8px;">Cüruf Spesifikasyonları</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>ASTM C618</strong></td>
            <td style="padding: 8px;">Uçucu Kül Spesifikasyonları</td>
          </tr>
        </tbody>
      </table>

      <hr style="margin: 20px 0;">

      <div style="background: #e8f5e9; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #4caf50;">
        <strong>✅ SONUÇ VE TAVSİYELER:</strong>
        <ul style="margin-top: 10px;">
          <li>Mineral katkı kullanımı doğru yapıldığında hem ekonomik hem teknik avantaj sağlar</li>
          <li>Mutlaka kaliteli ve sertifikalı mineral katkı tedarikçileriyle çalışın</li>
          <li>Her parti için kalite kontrol testleri yaptırın</li>
          <li>Proje özelliklerine göre mineral katkı tipini ve oranını optimize edin</li>
          <li>Kür koşullarına özel dikkat gösterin (en kritik faktör)</li>
          <li>Soğuk havalarda mineral katkı oranını azaltın veya çimento tipi değiştirin</li>
          <li>Deneyimli teknisyen ve mühendislerle çalışın</li>
        </ul>
      </div>

      <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 11px; color: #999; text-align: right; margin: 10px 0 0 0;">
        📚 Kaynak: "Mineral Katkılı Betonlarda Dikkat Edilmesi Gereken Hususlar" / TS EN 15167, TS EN 450, TS EN 206
      </p>
    `
  }

  // ========================================
  // YENİ KONU EKLEMEK İÇİN BURAYA EKLE:
  // ========================================
  // ,
  // {
  //   id: 3,
  //   baslik: "Konu Başlığı",
  //   kategori: "Kategori Adı",
  //   icerik: `
  //     <h3>Başlık</h3>
  //     <p>İçerik buraya...</p>
  //   `
  // }
];
