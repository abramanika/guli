import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design-system/index.js';

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: 'var(--bg-0)' }}>
      {/* Top bar with back button */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '12px 16px', gap: 8,
        borderBottom: '1px solid var(--line-hairline)',
        flex: 'none',
      }}>
        <span
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer', display: 'inline-flex' }}
        >
          <Icon name="chevron-left" size={22} color="var(--text-secondary)" />
        </span>
        <span className="type-h3" style={{ flex: 1 }}>წესები და პირობები</span>
      </div>

      {/* Scrollable content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}>
        <div>
          <h2 className="type-h3" style={{ color: 'var(--text-primary)', marginBottom: 8 }}>
            წესები და პირობები
          </h2>
          <p className="type-body" style={{ color: 'var(--text-secondary)' }}>
            ბოლო განახლება: 2026 წლის ივლისი
          </p>
        </div>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            1. გულის შესახებ
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            გული არის პიროვნული შეფასების აპლიკაცია, რომელიც ხელს უწყობს თქვენ თავი უფრო კარგად გაიცნოთ.
            გული მხოლოდ საინფორმაციო და განმასხვავებელი ინსტრუმენტია, ის არ არის ფსიქოლოგიური ან სამედიცინო
            მკურნალობა და არ უნდა განიხილებოდეს როგორც ჩანაცვლება პროფესიონალური კონსულტაციისთვის.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            2. გამოყენების მინიმალური ასაკი
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            გულის გამოყენება დაშვებულია მხოლოდ 16 წლის და უფრო მოხუცი პირებისთვის. თუ თქვენ 16 წლის უმცროსი ხართ,
            თქვენ არ გაქვთ უფლება სარეგისტრაციო ანგარიშის შექმნის. დაშვებული ღირსების მინიმუმის დარღვევა მიჩნეულია
            ამ წესების დარღვევად.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            3. ანგარიშის შექმნა და მონაცემთა საკუთრება
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            საკუთარი ანგარიშის შექმნა ეძლევა მხოლოდ აუთენტიკური და სრული ინფორმაციის მიწოდებით.
            აპლიკაციაში შეყვანილი ყველა პირადი მონაცემი (სახელი, დაბადების თარიღი და სხვა)
            სამუდამოდ რჩება თქვენი საკუთრება. გული არ აცხადებს რაიმე უფლებას თქვენს პირად მონაცემებზე
            აკრძალული შემთხვევებისა და ეს წესების გამოკლებით.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            4. მომხმარებლის პასუხისმგებლობა
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            თქვენ ვალდებული ხართ:
          </p>
          <ul style={{ marginLeft: 20, marginTop: 8, color: 'var(--text-secondary)' }}>
            <li className="type-body" style={{ marginBottom: 6 }}>გაეცნოთ პროგრამებს ახსნილი მოთხოვნების შესაბამისად სწორი, სამართლიანი და გმირული პასუხები</li>
            <li className="type-body" style={{ marginBottom: 6 }}>არ გამოიყენოთ აპლიკაცია სხვა ადამიანების ამაოიანებას, შეკიდახების ან ზეწოხების მიზნით</li>
            <li className="type-body" style={{ marginBottom: 6 }}>უფრო უსაფრთხოდ რეაგირება გაიტაროთ აპლიკაციაზე და არ განაწილოთ წვდომა არასანდო მესამე მხარეებისთვის</li>
            <li className="type-body">არ შეეცადოთ გახსნას, შეცვალოთ ან გაანადგუროთ აპლიკაციის კოდი ან მონაცემთა ბაზა</li>
          </ul>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            5. ინტელექტუალური საკუთრება
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            გული აპლიკაციის ყველა კოდი, დიზაინი, ტექსტი, გრაფიკა და სხვა კომპონენტი წარმოადგენს გულის
            საკუთრებას. თქვენი პირადი მონაცემი (პასუხები, ქულები, პროფილი) რჩება სამუდამოდ თქვენი საკუთრება.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            6. ანგარიშის მოსახლეობა და შეწყვეტა
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            თქვენ შეგიძლიათ ნებისმიერ დროს წაშლან თქვენი ანგარიში და ყველა დაკავშირებული მონაცემი ერთი
            ღილაკით. გული ასევე გვაქვს უფლება შევაჩეროთ ან წავშლიდეთ ანგარიშები, რომლებიც ამ წესების მკაცრად
            დაიჯერდება, მოჯიბე საბეჭდი დარღვევებით ან აბუსივით.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            7. ლიმიტაციები და სიზუსტე
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            გული მოწოდებული "როგორც არის" — ყოველგვარი განცხადების გარეშე. მე არ გარანტირებთ ბუნდოვანობას,
            ზუსტობას ან შეტყობინებებს. მე არ მივიმდე პასუხისმგებელი ქვემოთ მოხსენებული დაზიანებებისთვის,
            მათ შორის მოხმარებული ორი გზით მოხმარებული, ემოციური დაზიანება ან მონაცემთა დაკარგვა.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            8. კონტაქტი
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            რომელიმე შეკითხვის ან განცხადების შესახებ ამ წესების, გთხოვთ დაგვიკავშირდეთ:
          </p>
          <p className="type-body" style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            ელ-ფოსტა: hello@guli.app
          </p>
        </section>

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}
