from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

# Presentation erstellen
prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

# Farben
PRIMARY = RGBColor(0, 51, 102)  # Dunkelblau
ACCENT = RGBColor(0, 102, 204)  # Hellblau
ORANGE = RGBColor(255, 102, 0)  # Orange

def add_title_slide(title, subtitle=""):
    slide_layout = prs.slide_layouts[6]  # Blank
    slide = prs.slides.add_slide(slide_layout)
    
    # Titel
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(2.5), Inches(12.333), Inches(1.5))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(48)
    p.font.bold = True
    p.font.color.rgb = PRIMARY
    p.alignment = PP_ALIGN.CENTER
    
    # Subtitle
    if subtitle:
        sub_box = slide.shapes.add_textbox(Inches(0.5), Inches(4), Inches(12.333), Inches(1))
        tf = sub_box.text_frame
        p = tf.paragraphs[0]
        p.text = subtitle
        p.font.size = Pt(24)
        p.font.color.rgb = ACCENT
        p.alignment = PP_ALIGN.CENTER
    
    return slide

def add_content_slide(title, bullets):
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    
    # Titel
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12.333), Inches(1))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = PRIMARY
    
    # Content
    content_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.3), Inches(12.333), Inches(5.5))
    tf = content_box.text_frame
    tf.word_wrap = True
    
    for i, bullet in enumerate(bullets):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.text = "• " + bullet
        p.font.size = Pt(20)
        p.space_after = Pt(12)
    
    return slide

def add_two_column_slide(title, left_title, left_bullets, right_title, right_bullets):
    slide_layout = prs.slide_layouts[6]
    slide = prs.slides.add_slide(slide_layout)
    
    # Titel
    title_box = slide.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(12.333), Inches(0.8))
    tf = title_box.text_frame
    p = tf.paragraphs[0]
    p.text = title
    p.font.size = Pt(36)
    p.font.bold = True
    p.font.color.rgb = PRIMARY
    
    # Linke Spalte
    left_box = slide.shapes.add_textbox(Inches(0.5), Inches(1.2), Inches(6), Inches(5.5))
    tf = left_box.text_frame
    p = tf.paragraphs[0]
    p.text = left_title
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = ACCENT
    
    for bullet in left_bullets:
        p = tf.add_paragraph()
        p.text = "• " + bullet
        p.font.size = Pt(18)
        p.space_after = Pt(8)
    
    # Rechte Spalte
    right_box = slide.shapes.add_textbox(Inches(6.8), Inches(1.2), Inches(6), Inches(5.5))
    tf = right_box.text_frame
    p = tf.paragraphs[0]
    p.text = right_title
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = ACCENT
    
    for bullet in right_bullets:
        p = tf.add_paragraph()
        p.text = "• " + bullet
        p.font.size = Pt(18)
        p.space_after = Pt(8)
    
    return slide

# ====== SLIDES ======

# Slide 1: Title
add_title_slide("Power CEO Projektbericht", "Made-in-Austria Energy Orchestrator\nStand: 14. März 2026")

# Slide 2: Projektübersicht
add_content_slide("Projektübersicht", [
    "Projektname: Power",
    "Positionierung: Made-in-Austria Energy Orchestrator (EMS-Plattform)",
    "Standort: Österreich",
    "Fokus: Battery + Wallbox + Tarif-Engine",
    "Aktueller Status: Phase 2 Vorbereitung (Pausiert)"
])

# Slide 3: Ampelstatus
add_two_column_slide("Ampelstatus",
    "Bereiche",
    ["Product: Konzeption",
     "Tech: Repository Setup",
     "Regulatory: Vorprüfung"],
    "Status",
    ["Go-To-Market: Partneraufbau",
     "Funding: Förder-Scouting"]
)

# Slide 4: Phase 1 Ergebnisse
add_content_slide("Phase 1 Ergebnisse - Deliverables", [
    "ICP_SNAPSHOT.md - Primär/sekundär ICP definiert",
    "VALUE_PROPOSITION_AT.md - Nutzen quantifiziert (Haushalt: 30-70€/Monat, KMU: 120-450€/Monat)",
    "GTM_HYPOTHESES_AT.md - 4 testbare GTM-Hypothesen",
    "REGULATORY_AT.md - EMS vs. Stromlieferant Abgrenzung",
    "FUNDING_WORKPLAN.md - Förderfähigkeits-Matrix (Q2-Q4 2026)"
])

# Slide 5: Phase 2 Pakete
add_content_slide("Phase 2 Pakete", [
    "Paket 1: Kickoff - ⏳ Wartend (Termin-ID + Owner fehlen)",
    "Paket 2: Smart-Meter API - ✅ QA-complete (TC-27..TC-43)",
    "Paket 3: Tarif-Engine - ✅ QA-complete (TC-34..TC-38)",
    "Paket 4: Device Control - ✅ QA-complete (TC-20..TC-31)",
    "Paket 5: Monitoring - ✅ QA-complete (TC-MON-1..TC-MON-8)"
])

# Slide 6: QA Coverage
add_content_slide("QA Abdeckung - 43 Testfälle", [
    "Paket 1 (Auth): TC-17..TC-19 - 100%",
    "Paket 2 (Smart-Meter): TC-27..TC-43 - 100%",
    "Paket 3 (Tarif): TC-34..TC-38 - 100%",
    "Paket 4 (Device): TC-20..TC-31 - 100%",
    "Paket 5 (Monitoring): TC-MON-1..TC-MON-8 - 100%"
])

# Slide 7: Monitoring & Alerting
add_two_column_slide("Monitoring & Alerting",
    "P1 Alarme",
    ["API-Ausfall",
     "Device-Command-Failure",
     "Tarif-Freshness"],
    "Implementiert",
    ["PromQL-Alarmregeln",
     "Runbooks",
     "Alert-Drill Matrix"]
)

# Slide 8: Funding Plan
add_content_slide("Funding & Förderung", [
    "Q2 2026: aws Preseed (Förderung)",
    "Q3 2026: Seedfinancing (Investoren)",
    "Q3-Q4 2026: Fertigungsüberleitung (Förderung)",
    "Q4 2026: ERP-Darlehen (Bank)"
])

# Slide 9: Nächste Schritte
add_content_slide("Nächste Schritte", [
    "1. Reaktivierung: Auf Signal von Lech warten",
    "2. Kickoff durchführen: Termin-ID + Owner eintragen",
    "3. Paket 2 Scope Sign-off nachholen",
    "4. Implementation Start: Backend/Frontend Build"
])

# Slide 10: Zusammenfassung
add_title_slide("Zusammenfassung", "3 von 5 Paketen QA-complete\n43 funktionale Testfälle + 8 Monitoring-Tests\nPhase 2 wartet auf Reaktivierung")

# Speichern
output_path = os.path.expanduser("~/OneDrive/Dokumente/GitHub/power/Power_Praesentation.pptx")
prs.save(output_path)
print(f"Präsentation gespeichert: {output_path}")
