/* ---------------------------------------------------------------------------
   PUBLICATIONS
   ---------------------------------------------------------------------------
   Single source of truth for every publication shown on the site.

   To add a paper, copy an existing block and edit it. Fields:
     title    - full article title
     authors  - author string as you want it displayed
     journal  - abbreviated journal name
     year     - publication year (number)
     detail   - volume(issue):pages, or "Online ahead of print"
     pmid     - PubMed ID (string). Produces the PubMed link.
     doi      - DOI (string, no "https://doi.org/" prefix). Produces the DOI link.
     areas    - one or more of: "pharmacovigilance" | "last-dosing" | "ai"
                | "cohorts" | "lipid" | "other"
     type     - "research" | "review" | "guideline" | "editorial" | "case"
     featured - true to surface it on the home page and at the top of its
                research area page

   Loaded as a plain script (not fetch/JSON) so the site also works when you
   open index.html directly from disk, with no local web server.
--------------------------------------------------------------------------- */

window.PUBLICATIONS = [
  /* ===== Pharmacovigilance ============================================== */
  {
    title: "Contemporary local anaesthetic-associated adverse events and mortality: a pharmacovigilance analysis of a US reporting system",
    authors: "Fettiplace MR, Weinberg G, Chiang C, Nixon HC, Gitman M",
    journal: "Br J Anaesth", year: 2025, detail: "135(4):1015-1025",
    pmid: "40877109", doi: "10.1016/j.bja.2025.06.044",
    areas: ["pharmacovigilance"], type: "research", featured: true
  },
  {
    title: "Cardiac arrest associated with anaesthetic agents: a disproportionality analysis of the World Health Organization VigiBase Database",
    authors: "Perez J, Fettiplace MR",
    journal: "Br J Anaesth", year: 2026, detail: "Online ahead of print",
    pmid: "42527294", doi: "10.1016/j.bja.2026.06.014",
    areas: ["pharmacovigilance"], type: "research", featured: true
  },
  {
    title: "The impact of local anesthetic systemic toxicity advisories on reporting to the National Poison Data System (NPDS)",
    authors: "Fettiplace M, Weinberg G, Nixon H, Barabanova A, Chiang C, Gitman M",
    journal: "Reg Anesth Pain Med", year: 2025, detail: "Online ahead of print",
    pmid: "40691088", doi: "10.1136/rapm-2025-106464",
    areas: ["pharmacovigilance"], type: "research", featured: true
  },
  {
    title: "Morbidity and mortality from local anesthetics: localized and systemic toxicity",
    authors: "Fettiplace MR",
    journal: "Curr Opin Anaesthesiol", year: 2026, detail: "39(5):659-668",
    pmid: "42421525", doi: "10.1097/ACO.0000000000001683",
    areas: ["pharmacovigilance", "last-dosing"], type: "review", featured: true
  },
  {
    title: "Contemporary local anaesthetic-associated adverse events and mortality: identifying the root causes of lidocaine-associated deaths",
    authors: "Fettiplace MR, Weinberg G, Gitman M",
    journal: "Br J Anaesth", year: 2026, detail: "136(1):411-413",
    pmid: "41266159", doi: "10.1016/j.bja.2025.10.031",
    areas: ["pharmacovigilance"], type: "editorial"
  },

  /* ===== Local anesthetic toxicity & dosing ============================= */
  {
    title: "The Third American Society of Regional Anesthesia and Pain Medicine Practice Advisory on Local Anesthetic Systemic Toxicity: Executive Summary 2017",
    authors: "Neal JM, Barrington MJ, Fettiplace MR, Gitman M, Memtsoudis SG, Mörwald EE, Rubin DS, Weinberg G",
    journal: "Reg Anesth Pain Med", year: 2018, detail: "43(2):113-123",
    pmid: "29356773", doi: "10.1097/AAP.0000000000000720",
    areas: ["last-dosing"], type: "guideline", featured: true
  },
  {
    title: "Comparative Methods to Predict Redosing of Bupivacaine and Ropivacaine in Truncal Catheters",
    authors: "Bungart B, Joudeh L, Schwenk ES, Chiang C, Fettiplace MR",
    journal: "Anesthesiology", year: 2025, detail: "142(5):885-895",
    pmid: "39907706", doi: "10.1097/ALN.0000000000005406",
    areas: ["last-dosing"], type: "research", featured: true
  },
  {
    title: "Local anesthetic dosing and toxicity of adult truncal catheters: a narrative review of published practice",
    authors: "Bungart B, Joudeh L, Fettiplace M",
    journal: "Reg Anesth Pain Med", year: 2024, detail: "49(3):209-222",
    pmid: "37451826", doi: "10.1136/rapm-2023-104667",
    areas: ["last-dosing"], type: "review", featured: true
  },
  {
    title: "Local anesthetic dosing and toxicity of pediatric truncal catheters: a narrative review of published practice",
    authors: "Fettiplace M, Joudeh L, Bungart B, Boretsky K",
    journal: "Reg Anesth Pain Med", year: 2024, detail: "49(1):59-66",
    pmid: "37429620", doi: "10.1136/rapm-2023-104666",
    areas: ["last-dosing"], type: "review", featured: true
  },
  {
    title: "Local Anesthetic Systemic Toxicity: A Narrative Literature Review and Clinical Update on Prevention, Diagnosis, and Management",
    authors: "Gitman M, Fettiplace MR, Weinberg GL, Neal JM, Barrington MJ",
    journal: "Plast Reconstr Surg", year: 2019, detail: "144(3):783-795",
    pmid: "31461049", doi: "10.1097/PRS.0000000000005989",
    areas: ["last-dosing"], type: "review"
  },
  {
    title: "Epidural lidocaine dosing for intrapartum cesarean delivery: do the current guidelines fit clinical practice?",
    authors: "Hartshorne TN, McAllister RK, Fettiplace M, Hofkamp MP",
    journal: "Reg Anesth Pain Med", year: 2026, detail: "Online ahead of print",
    pmid: "42209138", doi: "10.1136/rapm-2026-107835",
    areas: ["last-dosing", "cohorts"], type: "research"
  },
  {
    title: "Dosing Limits for Lumbar Plexus Infusions: Comment",
    authors: "Bungart B, Boretsky K, Schwenk ES, Fettiplace MR",
    journal: "Anesthesiology", year: 2026, detail: "145(2):524-526",
    pmid: "42299503", doi: "10.1097/ALN.0000000000006130",
    areas: ["last-dosing"], type: "editorial"
  },
  {
    title: "Weight-based dosing of ropivacaine in erector spinae blocks",
    authors: "Fettiplace M",
    journal: "Reg Anesth Pain Med", year: 2023, detail: "48(9):437-438",
    pmid: "37217259", doi: "10.1136/rapm-2023-104628",
    areas: ["last-dosing"], type: "editorial"
  },
  {
    title: "Mitigating the Risk of Local Anesthetic Toxicity with Truncal Blocks",
    authors: "McAllister RK, Hofkamp MP, Fettiplace MR",
    journal: "A A Pract", year: 2024, detail: "18(9):e01847",
    pmid: "39268986", doi: "10.1213/XAA.0000000000001847",
    areas: ["last-dosing"], type: "editorial"
  },
  {
    title: "Liposomal Bupivacaine's Plausibility Fails to Translate",
    authors: "Fettiplace MR",
    journal: "Anesthesiology", year: 2024, detail: "140(5):868-870",
    pmid: "38592361", doi: "10.1097/ALN.0000000000004934",
    areas: ["last-dosing"], type: "editorial"
  },
  {
    title: "Local anesthetic systemic toxicity from local infiltration anesthesia in total joint arthroplasty: a single center retrospective study",
    authors: "Mitchell K, Cai E, Miller B, Jenkins K, McAllister RK, Fettiplace M, Weinberg G, Hammonds K, Hofkamp MP",
    journal: "Reg Anesth Pain Med", year: 2025, detail: "50(8):690-692",
    pmid: "37620115", doi: "10.1136/rapm-2023-104880",
    areas: ["last-dosing", "cohorts"], type: "research"
  },
  {
    title: "Apparent local anesthetic systemic toxicity following activation of an epidural catheter for cesarean delivery: diagnosis and management of an uncommon obstetric anesthesia complication",
    authors: "Soliman Y, Hatfield AA, McAllister RK, Fettiplace MR, Hofkamp MP",
    journal: "Proc (Bayl Univ Med Cent)", year: 2024, detail: "37(5):874-876",
    pmid: "39165828", doi: "10.1080/08998280.2024.2357522",
    areas: ["last-dosing"], type: "case"
  },

  /* ===== Artificial intelligence ======================================== */
  {
    title: "Recommendations for disclosure of artificial intelligence in scientific writing and publishing: a regional anesthesia and pain medicine modified Delphi study",
    authors: "Fettiplace MR, Bhatia A, Chen Y, Orebaugh SL, Gofeld M, Gabriel RA, Sessler DI, Lonsdale H, Bungart B, Cheng CP, Burnett GW, Han L, Wiles M, Coppens S, Joseph T, Schreiber KL, Volk T, Urman RD, Kovacheva VP, Wu CL, Mariano ER, Ip VHY",
    journal: "Reg Anesth Pain Med", year: 2026, detail: "51(6):603-610",
    pmid: "40897450", doi: "10.1136/rapm-2025-106852",
    areas: ["ai"], type: "guideline", featured: true
  },
  {
    title: "RAPM disclosure recommendations for AI use in writing and publishing",
    authors: "Fettiplace MR, D'Souza RS, Ip VHY, Bhatia A",
    journal: "Reg Anesth Pain Med", year: 2025, detail: "Online ahead of print",
    pmid: "41015533", doi: "10.1136/rapm-2025-106979",
    areas: ["ai"], type: "guideline", featured: true
  },
  {
    title: "Responsible use of large language models in manuscript authorship, peer review, and editorial processes: a Delphi consensus among editors-in-chief of anaesthesia and pain medicine journals (RULE-AP)",
    authors: "De Cassai A, Dost B, Augoustides JG, et al. (Fettiplace MR, collaborating author)",
    journal: "Br J Anaesth", year: 2026, detail: "136(5):1625-1633",
    pmid: "41748337", doi: "10.1016/j.bja.2026.01.029",
    areas: ["ai"], type: "guideline", featured: true
  },

  /* ===== Retrospective cohorts & anesthetic management ================== */
  {
    title: "Reconciling Observational Signals With Trial Data in Anesthetic Choice for Hip Fracture Surgery",
    authors: "Fettiplace MR, Herbstreit F",
    journal: "Anesth Analg", year: 2026, detail: "142(5):843-846",
    pmid: "41135081", doi: "10.1213/ANE.0000000000007833",
    areas: ["cohorts"], type: "editorial", featured: true
  },
  {
    title: "Association of patient and clinical characteristics with postoperative opioid consumption following total knee arthroplasty: a single center retrospective study",
    authors: "Farokhnia R, Garmon EH, Allen BC, Fettiplace MR, Hofkamp MP",
    journal: "Proc (Bayl Univ Med Cent)", year: 2025, detail: "38(4):442-446",
    pmid: "40557216", doi: "10.1080/08998280.2025.2494956",
    areas: ["cohorts"], type: "research", featured: true
  },
  {
    title: "Early versus delayed postoperative adductor canal block in total knee arthroplasty",
    authors: "Momin S, Saad S, Garmon EH, Hitt KD, Fettiplace MR, Shaver C, Hofkamp MP",
    journal: "Proc (Bayl Univ Med Cent)", year: 2023, detail: "36(6):675-678",
    pmid: "37829221", doi: "10.1080/08998280.2023.2249372",
    areas: ["cohorts"], type: "research", featured: true
  },
  {
    title: "Early versus delayed postoperative adductor canal block in total knee arthroplasty (correction)",
    authors: "Momin S, Fettiplace MR, Garmon EH, Hofkamp MP",
    journal: "Proc (Bayl Univ Med Cent)", year: 2024, detail: "37(1):180",
    pmid: "38174002", doi: "10.1080/08998280.2023.2262850",
    areas: ["cohorts"], type: "editorial"
  },
  {
    title: "Impact of Pressure Recovery Adjustment on Aortic Valve Area Classification of Disease Severity in Transcatheter Aortic Valve Replacement Patients",
    authors: "Gonzalez-Ciccarelli LF, Ferrufino RA, Alfadhel A, Brovman E, Ortoleva J, Wessler BS, Fettiplace M, Cobey F",
    journal: "J Cardiothorac Vasc Anesth", year: 2024, detail: "38(6):1309-1313",
    pmid: "38503628", doi: "10.1053/j.jvca.2024.02.036",
    areas: ["cohorts"], type: "research"
  },
  {
    title: "Utility of MAVIR in Assessing Success of Percutaneous Mitral Valve Repair",
    authors: "Farroukh A, Elkalawy H, Yeturu P, Brovman E, Fettiplace M, Tiangco N, Fox J, Cobey F, Resor C",
    journal: "J Cardiothorac Vasc Anesth", year: 2024, detail: "38(12):3277-3279",
    pmid: "39393987", doi: "10.1053/j.jvca.2024.09.010",
    areas: ["cohorts"], type: "research"
  },

  /* ===== Lipid resuscitation science =================================== */
  {
    title: "Systematic Review and Meta-Analysis of Lipid Emulsion for Non-Local Anesthetic Poisoning",
    authors: "Tang Z, Zhao M, Barabanova A, McCrary Q, Fettiplace MR",
    journal: "J Med Toxicol", year: 2026, detail: "Online ahead of print",
    pmid: "42658387", doi: "10.1007/s13181-026-01151-7",
    areas: ["lipid"], type: "review", featured: true
  },
  {
    title: "The Mechanisms Underlying Lipid Resuscitation Therapy",
    authors: "Fettiplace MR, Weinberg G",
    journal: "Reg Anesth Pain Med", year: 2018, detail: "43(2):138-149",
    pmid: "29356774", doi: "10.1097/AAP.0000000000000719",
    areas: ["lipid"], type: "review", featured: true
  },
  {
    title: "Heterogeneity and bias in animal models of lipid emulsion therapy: a systematic review and meta-analysis",
    authors: "Fettiplace MR, Pichurko AB",
    journal: "Clin Toxicol (Phila)", year: 2021, detail: "59(1):1-11",
    pmid: "33025830", doi: "10.1080/15563650.2020.1814316",
    areas: ["lipid"], type: "review", featured: true
  },
  {
    title: "Lipid emulsion improves survival in animal models of local anesthetic toxicity: a meta-analysis",
    authors: "Fettiplace MR, McCabe DJ",
    journal: "Clin Toxicol (Phila)", year: 2017, detail: "55(7):617-623",
    pmid: "28346007", doi: "10.1080/15563650.2017.1288911",
    areas: ["lipid"], type: "review"
  },
  {
    title: "Insulin Signaling in Bupivacaine-induced Cardiac Toxicity: Sensitization during Recovery and Potentiation by Lipid Emulsion",
    authors: "Fettiplace MR, Kowal K, Ripper R, Young A, Lis K, Rubinstein I, Bonini M, Minshall R, Weinberg G",
    journal: "Anesthesiology", year: 2016, detail: "124(2):428-442",
    pmid: "26646023", doi: "10.1097/ALN.0000000000000974",
    areas: ["lipid"], type: "research", featured: true
  },
  {
    title: "Resuscitation with lipid emulsion: dose-dependent recovery from cardiac pharmacotoxicity requires a cardiotonic effect",
    authors: "Fettiplace MR, Akpa BS, Ripper R, Zider B, Lang J, Rubinstein I, Weinberg G",
    journal: "Anesthesiology", year: 2014, detail: "120(4):915-925",
    pmid: "24496123", doi: "10.1097/ALN.0000000000000142",
    areas: ["lipid"], type: "research", featured: true
  },
  {
    title: "Lipid emulsion for xenobiotic overdose: PRO",
    authors: "Fettiplace MR, Weinberg G",
    journal: "Br J Clin Pharmacol", year: 2023, detail: "89(6):1708-1718",
    pmid: "36454165", doi: "10.1111/bcp.15620",
    areas: ["lipid"], type: "review"
  },
  {
    title: "Multi-modal contributions to detoxification of acute pharmacotoxicity by a triglyceride micro-emulsion",
    authors: "Fettiplace MR, Lis K, Ripper R, Kowal K, Pichurko A, Vitello D, Rubinstein I, Schwartz D, Akpa BS, Weinberg G",
    journal: "J Control Release", year: 2015, detail: "198:62-70",
    pmid: "25483426", doi: "10.1016/j.jconrel.2014.11.018",
    areas: ["lipid"], type: "research"
  },
  {
    title: "Cardiac depression induced by cocaine or cocaethylene is alleviated by lipid emulsion more effectively than by sulfobutylether-β-cyclodextrin",
    authors: "Fettiplace MR, Pichurko A, Ripper R, Lin B, Kowal K, Lis K, Schwartz D, Feinstein DL, Rubinstein I, Weinberg G",
    journal: "Acad Emerg Med", year: 2015, detail: "22(5):508-517",
    pmid: "25908403", doi: "10.1111/acem.12657",
    areas: ["lipid"], type: "research"
  },
  {
    title: "Rapid cardiotonic effects of lipid emulsion infusion",
    authors: "Fettiplace MR, Ripper R, Lis K, Lin B, Lang J, Zider B, Wang J, Rubinstein I, Weinberg G",
    journal: "Crit Care Med", year: 2013, detail: "41(8):e156-e162",
    pmid: "23531591", doi: "10.1097/CCM.0b013e318287f874",
    areas: ["lipid"], type: "research"
  },
  {
    title: "Intraosseous lipid emulsion: an effective alternative to IV delivery in emergency situations",
    authors: "Fettiplace MR, Ripper R, Lis K, Feinstein DL, Rubinstein I, Weinberg G",
    journal: "Crit Care Med", year: 2014, detail: "42(2):e157-e160",
    pmid: "24145832", doi: "10.1097/01.ccm.0000435677.76058.15",
    areas: ["lipid"], type: "research"
  },
  {
    title: "Lipid emulsion rapidly restores contractility in stunned mouse cardiomyocytes: a comparison with therapeutic hypothermia",
    authors: "Li J, Fettiplace M, Chen SJ, Steinhorn B, Shao Z, Zhu X, Li C, Harty S, Weinberg G, Vanden Hoek TL",
    journal: "Crit Care Med", year: 2014, detail: "42(12):e734-e740",
    pmid: "25402294", doi: "10.1097/CCM.0000000000000656",
    areas: ["lipid"], type: "research"
  },
  {
    title: "Confusion About Infusion: Rational Volume Limits for Intravenous Lipid Emulsion During Treatment of Oral Overdoses",
    authors: "Fettiplace MR, Akpa BS, Rubinstein I, Weinberg G",
    journal: "Ann Emerg Med", year: 2015, detail: "66(2):185-188",
    pmid: "25737211", doi: "10.1016/j.annemergmed.2015.01.020",
    areas: ["lipid"], type: "review"
  },
  {
    title: "Past, Present, and Future of Lipid Resuscitation Therapy",
    authors: "Fettiplace MR, Weinberg G",
    journal: "JPEN J Parenter Enteral Nutr", year: 2015, detail: "39(1 Suppl):72S-83S",
    pmid: "26187938", doi: "10.1177/0148607115595979",
    areas: ["lipid"], type: "review"
  },
  {
    title: "Pigs and Paradigms: Stop Using Swine to Study Lipid Resuscitation",
    authors: "Weinberg GL, Bedocs P, Fettiplace MR",
    journal: "Anesth Analg", year: 2019, detail: "129(1):4-7",
    pmid: "31206444", doi: "10.1213/ANE.0000000000004101",
    areas: ["lipid"], type: "editorial"
  },
  {
    title: "Experimental Controls in Lipid Resuscitation Therapy",
    authors: "Fettiplace MR, Weinberg G",
    journal: "Anesthesiology", year: 2019, detail: "130(3):516-517",
    pmid: "30762646", doi: "10.1097/ALN.0000000000002564",
    areas: ["lipid"], type: "editorial"
  },
  {
    title: "Building the evidence for lipid resuscitation therapy",
    authors: "Weinberg G, Fettiplace M",
    journal: "Hum Exp Toxicol", year: 2017, detail: "36(5):534-535",
    pmid: "28359168", doi: "10.1177/0960327117701987",
    areas: ["lipid"], type: "editorial"
  },
  {
    title: "Reply to Hoegberg et al.: letter in response to “lipid emulsion improves survival in animal models of local anesthetic toxicity: a meta-analysis”",
    authors: "Fettiplace MR",
    journal: "Clin Toxicol (Phila)", year: 2017, detail: "55(9):1021-1022",
    pmid: "28535083", doi: "10.1080/15563650.2017.1325490",
    areas: ["lipid"], type: "editorial"
  },
  {
    title: "In reply (rational volume limits for intravenous lipid emulsion)",
    authors: "Fettiplace MR, Weinberg G",
    journal: "Ann Emerg Med", year: 2016, detail: "67(3):419-420",
    pmid: "26915556", doi: "10.1016/j.annemergmed.2015.11.002",
    areas: ["lipid"], type: "editorial"
  },
  {
    title: "The authors reply (rapid cardiotonic effects of lipid emulsion)",
    authors: "Fettiplace MR, Weinberg G",
    journal: "Crit Care Med", year: 2013, detail: "41(11):e389-e390",
    pmid: "24162694", doi: "10.1097/CCM.0b013e3182a120a2",
    areas: ["lipid"], type: "editorial"
  },
  {
    title: "Intravenous Lipid Emulsion During Heart Transplantation",
    authors: "Cobey FC, Kawabori M, Schumann R, Couper G, Bonney I, Fettiplace MR, Weinberg G",
    journal: "J Cardiothorac Vasc Anesth", year: 2021, detail: "35(10):3139-3141",
    pmid: "33771441", doi: "10.1053/j.jvca.2021.02.042",
    areas: ["lipid"], type: "case"
  },
  {
    title: "Epinephrine for cardiac arrest: are we doing more harm than good?",
    authors: "Krishnamoorthy V, Vavilala MS, Fettiplace MR, Weinberg G",
    journal: "Anesthesiology", year: 2014, detail: "120(4):792-794",
    pmid: "24135580", doi: "10.1097/ALN.0000000000000032",
    areas: ["lipid"], type: "editorial"
  },

  /* ===== Other ========================================================== */
  {
    title: "Dopaminergic psychostimulants cause arousal from isoflurane-induced sedation without reversing memory impairment in rats",
    authors: "Fettiplace MR, Vincent KF, Cho A, Dillon E, Stapley BM, Stewart V, Solt K",
    journal: "Br J Anaesth", year: 2024, detail: "133(4):793-803",
    pmid: "38965013", doi: "10.1016/j.bja.2024.05.026",
    areas: ["other"], type: "research", featured: true
  },
  {
    title: "Propofol Exposure Precipitating a Functional Movement Disorder: A Case Report",
    authors: "Saad S, Ciardi F, Praschan N, Bungart B, Fettiplace M",
    journal: "Case Rep Anesthesiol", year: 2025, detail: "2025:8850185",
    pmid: "41031214", doi: "10.1155/cria/8850185",
    areas: ["other"], type: "case"
  },
  {
    title: "Opioid-free Anesthesia: Comment",
    authors: "Fettiplace MR, Gitman M",
    journal: "Anesthesiology", year: 2021, detail: "135(4):755-756",
    pmid: "34388817", doi: "10.1097/ALN.0000000000003910",
    areas: ["other"], type: "editorial"
  },
  {
    title: "Blood Density Is Nearly Equal to Water Density: A Validation Study of the Gravimetric Method of Measuring Intraoperative Blood Loss",
    authors: "Vitello DJ, Ripper RM, Fettiplace MR, Weinberg GL, Vitello JM",
    journal: "J Vet Med", year: 2015, detail: "2015:152730",
    pmid: "26464949", doi: "10.1155/2015/152730",
    areas: ["other"], type: "research"
  },
  {
    title: "Sensory feedback for upper limb prostheses",
    authors: "Hsiao SS, Fettiplace M, Darbandi B",
    journal: "Prog Brain Res", year: 2011, detail: "192:69-81",
    pmid: "21763519", doi: "10.1016/B978-0-444-53355-5.00005-1",
    areas: ["other"], type: "review"
  }
];
