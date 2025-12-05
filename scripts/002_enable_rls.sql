-- Enable Row Level Security
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Applications: Public insert, authenticated read/update
CREATE POLICY "Allow public insert on applications"
  ON applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated view applications"
  ON applications FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update applications"
  ON applications FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Contact inquiries: Public insert, authenticated manage
CREATE POLICY "Allow public insert contact inquiries"
  ON contact_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated manage contact inquiries"
  ON contact_inquiries FOR ALL
  USING (auth.role() = 'authenticated');

-- Newsletter: Public insert, authenticated manage
CREATE POLICY "Allow public insert newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated manage newsletter"
  ON newsletter_subscribers FOR ALL
  USING (auth.role() = 'authenticated');

-- Payments: Authenticated only
CREATE POLICY "Allow authenticated view payments"
  ON payments FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated insert payments"
  ON payments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update payments"
  ON payments FOR UPDATE
  USING (auth.role() = 'authenticated');
