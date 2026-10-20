# Final care review, 2026-10-20

The result guide now recognizes Czech catalogues by their CZK currency as well as .cz product domains. This covers Almara Soap's Czech .com shop, so new descriptions and next recommendations use Czech consistently.

Back navigation undoes the last actual answer. Completed answers may remove inferred singleton questions from the dynamically computed step list; indexing that shortened list left Almara's result unchanged when going back. The actual click-handler regression now checks this case.

Strawberry & Cream is handmade soap, not cream. Its official product description was rechecked at https://www.almarasoap.com/cs/strawberry-cream-as-01fncy-strwbr00cz on 2026-10-20. Only this product's form was corrected; the separate Body Scrub remains a peeling. Price, availability, URL, and image were preserved.

Verification: actual renderer and click-handler harness, complete offline API regression against the preceding baseline, mocked provider checks, plants API checks, changed JavaScript syntax, and asset version stamps. No live AI request is required for these checks. Production environment and model configuration remain unchanged.

The final live result review exposed the same name-based classification problem in Creamy Carrot. The entire Almara catalogue was therefore checked for explicit official descriptions identifying soap. Those forms are now cleansing products, including Lemon Tea Tree, which is face soap rather than tea or a home fragrance. The explicitly exfoliating Peeling Walnut keeps its peeling form. The two ceramic mask-mixing bowls are accessories rather than face masks. Existing prices, stock, URLs, and images are unchanged; the dated source descriptions and exact corrections are recorded in the QA evidence.
