import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design-system/index.js';

export default function PrivacyPage() {
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
        <span className="type-h3" style={{ flex: 1 }}>კონფიდენციალურობის პოლიტიკა</span>
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
            კონფიდენციალურობის პოლიტიკა
          </h2>
          <p className="type-body" style={{ color: 'var(--text-secondary)' }}>
            ბოლო განახლება: 2026 წლის ივლისი
          </p>
        </div>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            1. რა მონაცემს ვაგროვებთ
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            რეგისტრაციის დროს და აპლიკაციის გამოყენებისას ჩვენ ვაგროვებთ:
          </p>
          <ul style={{ marginLeft: 20, marginTop: 8, color: 'var(--text-secondary)' }}>
            <li className="type-body" style={{ marginBottom: 6 }}>სახელი</li>
            <li className="type-body" style={{ marginBottom: 6 }}>დაბადების თარიღი</li>
            <li className="type-body" style={{ marginBottom: 6 }}>Big Five პიროვნული ქულები</li>
            <li className="type-body" style={{ marginBottom: 6 }}>დღე-ღამის კითხვის პასუხები</li>
            <li className="type-body" style={{ marginBottom: 6 }}>მეგობრობის მრუდი (რა ძმები უკავშირდება)</li>
            <li className="type-body">იმეილი და აუტენტიფიკაციის მონაცემი</li>
          </ul>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            2. როგორ გამოვიყენებთ თქვენი მონაცემი
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            მე იყენებთ თქვენი მონაცემი:
          </p>
          <ul style={{ marginLeft: 20, marginTop: 8, color: 'var(--text-secondary)' }}>
            <li className="type-body" style={{ marginBottom: 6 }}>სიტყვიერი რუკის აგებული — თქვენი პიროვნული სტილის ვიზუალიზაციის მიზნით</li>
            <li className="type-body" style={{ marginBottom: 6 }}>AI ფოტოსიუეტის გენერირება — Claude API-ს გამოყენებით, შენი პირადი იმეჯის ეფექტიანობის მიზნით</li>
            <li className="type-body" style={{ marginBottom: 6 }}>მეგობრობის შედარება — სხვა მომხმარებლებთან სიმრავლის სიმრავლის გამოანგარიშებისთვის</li>
            <li className="type-body">ანგარიშის რუჯი მხარდაჭერის მიზნით</li>
          </ul>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            3. რა არ გავაკეთებთ თქვენი მონაცემით
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            მე არასოდეს:
          </p>
          <ul style={{ marginLeft: 20, marginTop: 8, color: 'var(--text-secondary)' }}>
            <li className="type-body" style={{ marginBottom: 6 }}>ვიყიდი ან ვაგრძელებთ თქვენი მონაცემი მესამე მხარეებისთვის</li>
            <li className="type-body" style={{ marginBottom: 6 }}>ვაჩვენებთ რეკლამებს თქვენს აპლიკაციაში</li>
            <li className="type-body" style={{ marginBottom: 6 }}>ვიყენებთ ეკრანის მონაცემი შენი თანმიმდევრობის გარეშე</li>
            <li className="type-body">ვაშენებთ განცხადებული პროფილებს თქვენი შესახებ</li>
          </ul>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            4. მონაცემთა შენახვა
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            ყველა მონაცემი შენახულია Supabase-ში, რომელიც ევროპის სერვერებზე მდებარე. ეს დაიცავს
            GDPR მოთხოვნებით. თქვენი მონაცემი დაშიფრულია ტრაფიკში (HTTPS/TLS) და რომ ზე მოსახლევა.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            5. AI ფოტოსიუეტა და Anthropic Claude
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            როდესაც თქვენ გენერირებთ AI ფოტოსიუეტას, მე გადაგზავნით თქვენი სიტყვიერი მონაცემი (იმ
            რამ თქვენი პიროვნული სტილი ახსნილი) Anthropic Claude API-ს. Claude ეს მონაცემი გამოიყენებს
            ფოტოს გენერირების მიზნით, ის არ დაიმახსოვრებს ან არ გადაცემს მესამე მხარეებისთვის.
            ფოტო შენ თქვენი კლიენტი შენახულია — ის არ დაჯავშნილი Anthropic-ის მხრიდან.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            6. თქვენი უფლებები
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            თქვენ შეგიძლიათ:
          </p>
          <ul style={{ marginLeft: 20, marginTop: 8, color: 'var(--text-secondary)' }}>
            <li className="type-body" style={{ marginBottom: 6 }}>დაათხოვოთ თქვენი მონაცემი აპლიკაციაში (პირადი მონაცემი ჯერ)</li>
            <li className="type-body" style={{ marginBottom: 6 }}>გადმოწერეთ თქვენი მონაცემი JSON ფორმატში</li>
            <li className="type-body">გთხოვოთ მოვა აქ ძალიან მონაცემი</li>
          </ul>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            7. მონაცემთა შენახვის ვადა
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            მე ვინახებთ თქვენი მონაცემი სანამ თქვენ წაშლით ანგარიშს. თუ ანგარიში იყო სამართლიანი
            2 წლის განმავლობაში, მე შეიძლება ავტომატურად წავშლიდეთ იგი.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            8. ბავშვი და ძალეული
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            გული მხოლოდ 16 წლის მოხუცი პირებისთვის. მე არ ვაგროვებთ სარეგისტრაციო მონაცემი 16 წელზე უმცროსი
            ბავშვებიდან. თუ ჩვენ გავიგეთ რომ 16 წელზე უმცროსი სიტყვის მხრიდან გვაქვს მონაცემი,
            ჩვენ დაკანონებული წვდომის აქ რა გვაქვს წვდომა.
          </p>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            9. მხარდამჭერი არ გამოიყენებთ
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            მე არ აცხადებთ თქვენი მონაცემი:
          </p>
          <ul style={{ marginLeft: 20, marginTop: 8, color: 'var(--text-secondary)' }}>
            <li className="type-body" style={{ marginBottom: 6 }}>მეთოდოლოგია ან მოთხოვნები (საიდენტიფიკაციო ფირმის გარდა, რომ ექ დაშიფრი)</li>
            <li className="type-body" style={{ marginBottom: 6 }}>Google Analytics ან სხვა პირველადი მითხოვნები</li>
            <li className="type-body">კოკი აღმასხვავებელი, თუ არა პროფილი მხარდაჭერის მიზნით</li>
          </ul>
        </section>

        <section>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            10. კონტაქტი
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            რომელიმე შეკითხვის ან აპელაციის შესახებ ამ კონფიდენციალურობის პოლიტიკის, გთხოვთ დაგვიკავშირდეთ:
          </p>
          <p className="type-body" style={{ color: 'var(--text-secondary)', marginTop: 8 }}>
            ელ-ფოსტა: hello@guli.app
          </p>
        </section>

        {/* English Summary */}
        <div style={{
          padding: 16,
          background: 'var(--bg-1)',
          borderRadius: 16,
          border: '1px solid var(--line-hairline)',
          marginTop: 20,
        }}>
          <h3 className="type-h4" style={{ color: 'var(--text-primary)', marginBottom: 12 }}>
            English Summary (EU Compliance)
          </h3>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>
            <strong>Privacy Policy Summary:</strong> Guli collects your name, birthday, Big Five personality scores,
            daily question answers, and friend connections. We store this data on Supabase EU servers. We use it to
            generate your personality map and AI portrait via Claude API. We never sell your data, show ads, or share
            with third parties. You can access, export, or delete your data anytime through the app. Data is retained
            until you delete it or 2 years of inactivity. We only serve users 16+. For questions, email hello@guli.app.
          </p>
          <p className="type-body" style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            This policy complies with GDPR, ePrivacy Directive, and EU data protection regulations.
          </p>
        </div>

        <div style={{ height: 24 }} />
      </div>
    </div>
  );
}
