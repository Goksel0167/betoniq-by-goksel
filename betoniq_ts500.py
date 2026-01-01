# -*- coding: utf-8 -*-
"""
betoniq_ts500.py
=================
TS 500 (Betonarme Yapıların Tasarım ve Yapım Kuralları) uygunluk değerlendirmesini
otomatik olarak yapan bir Python modülü.

Değerlendirme mantığı (TS 500, Tablo 3):
- Bir işte en az 3 grup (G1, G2, G3) alınır; her grup 3 numuneden oluşur (toplam 9 numune = 1 parti).
- Kabul için iki koşul birlikte sağlanmalıdır:
  A) Her Parti Ortalaması (9 numune ortalaması): f_cm >= f_ck + 1 MPa
  B) Her Partide en küçük grup ortalaması (3'lü ortalama): f_cmin >= f_ck - 3 MPa

Bu modül, verilen grup sonuçları ve f_ck değerine göre PASS/FAIL ve ayrıntılı rapor üretir.

Not: Bu modül TS EN 206-1 değil, TS 500 Tablo 3 kabul kriterlerini uygular.

Örnek CLI kullanımı:
--------------------
python betoniq_ts500.py --fck 30 \
  --groups "32.5,31.8,33.1|30.1,31.0,29.8|33.0,32.6,32.9"

Alternatif: JSON girişi
-----------------------
python betoniq_ts500.py --json input.json
# input.json içeriği:
# {
#   "fck": 30,
#   "groups": [[32.5,31.8,33.1],[30.1,31.0,29.8],[33.0,32.6,32.9]]
# }

Yazar: M365 Copilot
Sürüm: 1.0.0
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from statistics import mean
from typing import List, Dict, Any


@dataclass
class TS500Result:
    fck: float
    party_mean: float
    group_means: List[float]
    min_group_mean: float
    criterion_A_pass: bool
    criterion_B_pass: bool
    accepted: bool

    def to_dict(self) -> Dict[str, Any]:
        return {
            "fck": self.fck,
            "party_mean": self.party_mean,
            "group_means": self.group_means,
            "min_group_mean": self.min_group_mean,
            "criterion_A_pass": self.criterion_A_pass,
            "criterion_B_pass": self.criterion_B_pass,
            "accepted": self.accepted,
        }


def _validate_groups(groups: List[List[float]]) -> None:
    if not groups or len(groups) < 3:
        raise ValueError("TS 500 için en az 3 grup (her biri 3 numune) gereklidir.")
    for i, g in enumerate(groups, start=1):
        if not g or len(g) < 3:
            raise ValueError(f"G{i} grubunda en az 3 numune olmalıdır. Mevcut: {len(g)}")
        for x in g:
            if x is None:
                raise ValueError(f"G{i} grubunda None değer tespit edildi.")
            if not isinstance(x, (int, float)):
                raise ValueError(f"G{i} grubunda sayısal olmayan değer: {x}")
            if x <= 0:
                raise ValueError(f"G{i} grubunda pozitif olmayan dayanım değeri: {x}")


def evaluate_ts500(groups: List[List[float]], fck: float) -> TS500Result:
    """TS 500 Tablo 3'e göre uygunluk değerlendirmesi yapar.

    Args:
        groups: Her biri 3 numuneden oluşan grup listesi (en az 3 grup).
        fck: Karakteristik basınç dayanımı (MPa).

    Returns:
        TS500Result: Ayrıntılı sonuç.
    """
    if fck <= 0:
        raise ValueError("fck pozitif bir değer olmalıdır.")

    _validate_groups(groups)

    # Parti ortalaması: 9 numunenin ortalaması
    all_values: List[float] = [x for g in groups for x in g]
    party_mean_val = mean(all_values)

    # Grup ortalamaları ve en küçüğü
    group_means_vals = [mean(g) for g in groups]
    min_group_mean_val = min(group_means_vals)

    # Kriter A: f_cm >= f_ck + 1
    criterion_A_pass = party_mean_val >= (fck + 1)

    # Kriter B: f_cmin >= f_ck - 3
    criterion_B_pass = min_group_mean_val >= (fck - 3)

    accepted_val = criterion_A_pass and criterion_B_pass

    return TS500Result(
        fck=fck,
        party_mean=party_mean_val,
        group_means=group_means_vals,
        min_group_mean=min_group_mean_val,
        criterion_A_pass=criterion_A_pass,
        criterion_B_pass=criterion_B_pass,
        accepted=accepted_val,
    )


def example() -> TS500Result:
    """Dokümandaki örnek değerlere göre bir deneme çalıştırması döndürür."""
    groups = [
        [32.5, 31.8, 33.1],
        [30.1, 31.0, 29.8],
        [33.0, 32.6, 32.9],
    ]
    fck = 30.0
    return evaluate_ts500(groups, fck)
