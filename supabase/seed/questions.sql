-- Seed: Big Five Question Bank
-- ~62 Georgian-language questions across 7 chapters
-- Chapters 1-5: research label | Chapters 6-7: fun label
-- Polarities mixed within each chapter for balanced scoring
-- Register: warm, literary, informal singular (შენ)

-- ============================================================
-- Chapter 1 — კარი (Extraversion, research) — 9 questions
-- ============================================================

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(1, 'E', 'likert',
 'ახალ ადამიანებთან ურთიერთობა ენერგიას გაძლევს.',
 1, 'research', 10),

(1, 'E', 'likert',
 'ხმაური სავსე ოთახი უფრო გღლის, ვიდრე გიხარებს.',
 -1, 'research', 20),

(1, 'E', 'likert',
 'ყოველთვის ადვილი გაქვს ახალ ჯგუფში საუბრის დაწყება.',
 1, 'research', 30);

insert into questions (chapter, trait, kind, text_ka, option_a_ka, option_b_ka, polarity, label, sort_order) values
(1, 'E', 'this_or_that',
 'წვეულებაზე რა გირჩევნია?',
 'ბევრ ახალ ადამიანს ვიცნობ',
 'ერთ-ორ ახლო მეგობართან ვრჩები',
 1, 'research', 40),

(1, 'E', 'this_or_that',
 'გრძელი დღის შემდეგ?',
 'მეგობრებთან გასვლა მეხმარება',
 'სახლში მარტო ყოფნა მეხმარება',
 1, 'research', 50);

insert into questions (chapter, trait, kind, text_ka, pole_left_ka, pole_right_ka, polarity, label, sort_order) values
(1, 'E', 'slider',
 'ხალხთან ყოფნა რომ შენ გეხება...',
 'მარტოობა ჩემი ბატარეაა',
 'ხალხი ჩემი ბატარეაა',
 1, 'research', 60),

(1, 'E', 'slider',
 'სუფრაზე ახალი ადამიანი სხვას გვერდზე ჩამოუჯდება...',
 'ყოველთვის მე ვიწყებ საუბარს',
 'ველოდები, სხვა დაიწყებს',
 1, 'research', 70);

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(1, 'E', 'likert',
 'სიჩუმე შენთვის დასვენებაა, არა სიცარიელე.',
 -1, 'research', 80),

(1, 'E', 'likert',
 'ხშირად შენ იწყებ საუბარს, სხვების ნაცვლად.',
 1, 'research', 90);

-- ============================================================
-- Chapter 2 — სითბო (Agreeableness, research) — 8 questions
-- ============================================================

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(2, 'A', 'likert',
 'სხვის ტკივილი, როგორც წესი, შენს განწყობასაც ცვლის.',
 1, 'research', 10),

(2, 'A', 'likert',
 'სჯობს ყველაფერი პირდაპირ გამოთქვა, თუნდაც ვინმე ნაწყინდეს.',
 -1, 'research', 20),

(2, 'A', 'likert',
 'კონფლიქტიდან გამოსავალი იშვიათად ყოფილა ჩემი პირველი სურვილი.',
 1, 'research', 30);

insert into questions (chapter, trait, kind, text_ka, option_a_ka, option_b_ka, polarity, label, sort_order) values
(2, 'A', 'this_or_that',
 'ვინმე შენი ახლობლის მოქმედება გაღიზიანებს — რა გიჩნდება პირველად?',
 'მივუდივარ, ვკითხულობ, რა ხდება',
 'ველოდები, სანამ თვითონ ამომხსნელს',
 1, 'research', 40),

(2, 'A', 'this_or_that',
 'გუნდური მუშაობისას?',
 'სხვების სურვილი ჩემსაზე მაღლა ვაყენებ',
 'ჩემი პოზიცია ბოლომდე ვიცავ',
 1, 'research', 50);

insert into questions (chapter, trait, kind, text_ka, pole_left_ka, pole_right_ka, polarity, label, sort_order) values
(2, 'A', 'slider',
 'ადამიანებთან ნდობა...',
 'ნდობა ნაშოვნი უნდა იყოს',
 'ადამიანებს ძირითადად ვენდობი',
 1, 'research', 60);

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(2, 'A', 'likert',
 'სხვის ინტერესები ხშირად საკუთარზე მნიშვნელოვნად მეჩვენება.',
 1, 'research', 70),

(2, 'A', 'likert',
 'ადვილად ვხედავ, სად შეიძლება ვინმე შემეცდო.',
 -1, 'research', 80);

-- ============================================================
-- Chapter 3 — წესრიგი (Conscientiousness, research) — 10 questions
-- ============================================================

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(3, 'C', 'likert',
 'სანამ რამეს დავიწყებ, ჩვეულებრივ გეგმა მაქვს.',
 1, 'research', 10),

(3, 'C', 'likert',
 'ზოგჯერ სპონტანური გადაწყვეტილება გეგმაზე უკეთ მუშაობს.',
 -1, 'research', 20),

(3, 'C', 'likert',
 'ვალდებულებები პირნათლად მინდა შევასრულო, თუნდაც ეს ძალისხმევა მოითხოვდეს.',
 1, 'research', 30),

(3, 'C', 'likert',
 'დეტალებზე ყურადღება ძირითადად მომბეზრებს.',
 -1, 'research', 40);

insert into questions (chapter, trait, kind, text_ka, option_a_ka, option_b_ka, polarity, label, sort_order) values
(3, 'C', 'this_or_that',
 'ახალ პროექტს იწყებ:',
 'ეტაპებს და ვადებს ვგეგმავ წინასწარ',
 'ვიწყებ და გზად ვხედავ, სად მივდივარ',
 1, 'research', 50),

(3, 'C', 'this_or_that',
 'სახლის მოწყობა:',
 'ყველაფერს ადგილი აქვს და ვიცი სად',
 'ვიცი სად არის, ოღონდ სხვისთვის ახსნა გიჭირს',
 1, 'research', 60);

insert into questions (chapter, trait, kind, text_ka, pole_left_ka, pole_right_ka, polarity, label, sort_order) values
(3, 'C', 'slider',
 'ვადები...',
 'ვადები ჩემთვის ორიენტირია',
 'ვადები ჩემთვის ვალდებულებაა',
 1, 'research', 70),

(3, 'C', 'slider',
 'ერთდროულად რამდენი რამ...',
 'ერთ საქმეს ვათავებ, მერე ვიწყებ მეორეს',
 'რამდენიმე ნაკადი ერთდროულად მიდის',
 -1, 'research', 80);

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(3, 'C', 'likert',
 'დაუმთავრებელი საქმე განწყობას მიფუჭებს.',
 1, 'research', 90),

(3, 'C', 'likert',
 'სისტემა ჩემთვის ინსტრუმენტია, არა მიზანი.',
 -1, 'research', 100);

-- ============================================================
-- Chapter 4 — ზღვა (Neuroticism, research) — 9 questions
-- ============================================================

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(4, 'N', 'likert',
 'ზოგჯერ შფოთი ისეთ რამეზე გჩნდება, რაც ჯერ კიდევ არ მომხდარა.',
 1, 'research', 10),

(4, 'N', 'likert',
 'ცუდი დღის შემდეგ ჩვეულებრივ სწრაფად ბრუნდები ხელახლა.',
 -1, 'research', 20),

(4, 'N', 'likert',
 'კრიტიკა, თუნდაც კეთილი გულით ნათქვამი, ხშირად მტკივნეულად გეხება.',
 1, 'research', 30);

insert into questions (chapter, trait, kind, text_ka, option_a_ka, option_b_ka, polarity, label, sort_order) values
(4, 'N', 'this_or_that',
 'კამათის შემდეგ:',
 'ხანგრძლივად ვატარებ გონებაში',
 'ვიგნებ და ვაგრძელებ',
 1, 'research', 40),

(4, 'N', 'this_or_that',
 'გაუთვალისწინებელი ცვლილება:',
 'ხანდახან გამიჭირდება მისაღებად',
 'ჩვეულებრივ ადაპტირება მიადვილდება',
 1, 'research', 50);

insert into questions (chapter, trait, kind, text_ka, pole_left_ka, pole_right_ka, polarity, label, sort_order) values
(4, 'N', 'slider',
 'განწყობა...',
 'ჩვეულებრივ მყარია, ცოტა რამ ცვლის',
 'გარემო ხშირად ახდენს გავლენას ჩემს განწყობაზე',
 1, 'research', 60),

(4, 'N', 'slider',
 'შეცდომის შემდეგ...',
 'ვიქნებ და ვაგრძელებ',
 'ხანგრძლივად ვფიქრობ, სად შევცდი',
 1, 'research', 70);

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(4, 'N', 'likert',
 'მნიშვნელოვან ნივთებამდე ლოდინი ნერვებზე მოქმედებს.',
 1, 'research', 80),

(4, 'N', 'likert',
 'ძნელ სიტუაციაში ჩვეულებრივ გინარჩუნდება სიმშვიდე.',
 -1, 'research', 90);

-- ============================================================
-- Chapter 5 — ჰორიზონტი (Openness, research) — 8 questions
-- ============================================================

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(5, 'O', 'likert',
 'ახალი იდეა, რომელიც ყველაფერს სხვანაირად ხსნის, გამაღელვებელია.',
 1, 'research', 10),

(5, 'O', 'likert',
 'გამოცდილი გზები ჩვეულებრივ უსაფრთხო და სწორი არჩევანია.',
 -1, 'research', 20),

(5, 'O', 'likert',
 'ხელოვნება, მუსიკა ან ლიტერატურა ზოგჯერ ისე გეხება, სიტყვები არ ეყოფა.',
 1, 'research', 30);

insert into questions (chapter, trait, kind, text_ka, option_a_ka, option_b_ka, polarity, label, sort_order) values
(5, 'O', 'this_or_that',
 'შვებულება:',
 'ნაცნობ ადგილს ვირჩევ — გამოცდილი და კარგი',
 'ახალ ადგილს ვირჩევ — ვნახოთ, რა იქნება',
 1, 'research', 40),

(5, 'O', 'this_or_that',
 'მენიუდან?',
 'იმას ვუკვეთავ, რაც მომწონს და ვიცი',
 'ახალს ვცდი — შეიძლება გამიხარდეს',
 1, 'research', 50);

insert into questions (chapter, trait, kind, text_ka, pole_left_ka, pole_right_ka, polarity, label, sort_order) values
(5, 'O', 'slider',
 'გამოგონება...',
 'ტრადიცია ფასეულია — ახალი ყოველთვის კარგი არ არის',
 'ახალი კუთხე, ახალი მიდგომა — ეს მომხიბლავია',
 1, 'research', 60);

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(5, 'O', 'likert',
 'ფილოსოფიური ან ღრმა კითხვები ხშირად გიპყრობს ყურადღებას.',
 1, 'research', 70),

(5, 'O', 'likert',
 'ფანტაზია ხშირად ყოველდღიურ ფაქტებზე მეტად საინტერესოა.',
 1, 'research', 80);

-- ============================================================
-- Chapter 6 — სუფრა (Extraversion, fun) — 8 questions
-- ============================================================

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(6, 'E', 'likert',
 'სუფრაზე ახალი სახე გამახარებს — კიდევ ერთი ახალი ამბავი.',
 1, 'fun', 10),

(6, 'E', 'likert',
 'სადღეგრძელოს თქმა ჩვეულებრივ სხვას ვანდობ — ბრბოში უჯდომელად ვარ.',
 -1, 'fun', 20),

(6, 'E', 'likert',
 'ეს სუფრა კარგია, ოღონდ ახლა ერთი მშვიდი კუთხე გამოდგებოდა.',
 -1, 'fun', 30);

insert into questions (chapter, trait, kind, text_ka, option_a_ka, option_b_ka, polarity, label, sort_order) values
(6, 'E', 'this_or_that',
 'სუფრაზე ყველაზე კომფორტულია:',
 'ყველასთან ველაპარაკები',
 'ერთ-ორ კარგ ადამიანთან ღრმა საუბარი',
 1, 'fun', 40),

(6, 'E', 'this_or_that',
 'წვეულება მთავრდება:',
 'ბოლო წავდივარ — ჯერ ადრეა',
 'პირველ ათეულში წავდივარ — ენერგია გამიჭირდა',
 1, 'fun', 50);

insert into questions (chapter, trait, kind, text_ka, pole_left_ka, pole_right_ka, polarity, label, sort_order) values
(6, 'E', 'slider',
 'ხმამაღალ სუფრაზე...',
 'ოჯახი — ყველაზე კომფორტული სუფრა',
 'უცნობებიც — სუფრა სუფრაა',
 1, 'fun', 60),

(6, 'E', 'slider',
 'სადღეგრძელოს შემდეგ...',
 'ვურჩევნი სიჩუმეს — სადღეგრძელო ვთქვი',
 'ვაგრძელებ საუბარს — სადღეგრძელო მხოლოდ დასაწყისია',
 1, 'fun', 70);

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(6, 'E', 'likert',
 'სუფრაზე გაცნობილი ადამიანი ხშირად ნამდვილ მეგობარი ხდება.',
 1, 'fun', 80);

-- ============================================================
-- Chapter 7 — გემო (Agreeableness, fun) — 10 questions
-- ============================================================

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(7, 'A', 'likert',
 'სუფრაზე ყველა კმაყოფილი რომ იყოს, შენ ხარ პირველი, ვინც ამაზე ფიქრობს.',
 1, 'fun', 10),

(7, 'A', 'likert',
 'ვისაც მოსწონს, იმას ჭამს — ჩემი საქმე სიამოვნებაა, სხვების ფიქრი კი სხვების.',
 -1, 'fun', 20),

(7, 'A', 'likert',
 'სტუმარს ყოველთვის ცოტა მეტს შეგარჩევ — არარა, ნახევარი კიდევ დარჩება.',
 1, 'fun', 30);

insert into questions (chapter, trait, kind, text_ka, option_a_ka, option_b_ka, polarity, label, sort_order) values
(7, 'A', 'this_or_that',
 'სუფრაზე ჩხუბი გაჩნდა:',
 'ვცდილობ ორივე მხარე მოვუსმინო',
 'ვირჩევ ჩემს მხარეს — პირდაპირ',
 1, 'fun', 40),

(7, 'A', 'this_or_that',
 'ახლობელი გთხოვს, რაღაც გაუკეთო, რაც გიჭირს:',
 'ვეუბნები, რომ ჭირს, მაგრამ ვეცდები',
 'ვეუბნები, ახლა ვერ შემიძლია',
 1, 'fun', 50),

(7, 'A', 'this_or_that',
 'სადილზე ვინმე ტოვებს ნახევარ თეფშს:',
 'ვკითხულობ — კარგად ხარ?',
 'ეგ მათი საქმეა',
 1, 'fun', 60);

insert into questions (chapter, trait, kind, text_ka, pole_left_ka, pole_right_ka, polarity, label, sort_order) values
(7, 'A', 'slider',
 'სუფრაზე ახალი კაცი კამათობს...',
 'ვაფასებ პირდაპირ ადამიანს',
 'ვამჯობინებ, ზრდილობა შენარჩუნდეს',
 1, 'fun', 70),

(7, 'A', 'slider',
 'საჩუქრის ფიქრი...',
 'ვყიდულობ, რაც ვიცი, რომ მოსწონს',
 'ვფიქრობ დიდხანს, სანამ არ ვიპოვი სრულყოფილს',
 1, 'fun', 80);

insert into questions (chapter, trait, kind, text_ka, polarity, label, sort_order) values
(7, 'A', 'likert',
 'კამათისას ჩვეულებრივ შეგიძლია გაიგო, სხვა მხარეს სად ეჭირება.',
 1, 'fun', 90),

(7, 'A', 'likert',
 'სხვის გულისთვის ხშირად გინდა მეტი ვიდრე გაგიადვილდება.',
 1, 'fun', 100);
