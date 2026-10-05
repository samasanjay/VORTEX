import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'vortex.sqlite');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys for performance and data integrity
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');
db.exec('PRAGMA busy_timeout = 5000;');

/**
 * Initialize all database schemas
 */
export function initDatabaseSchema() {
  db.exec(`
    -- 1. Roles and Permissions
    CREATE TABLE IF NOT EXISTS roles (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS permissions (
      id TEXT PRIMARY KEY,
      role_id TEXT NOT NULL,
      resource TEXT NOT NULL,
      action TEXT NOT NULL,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    );

    -- 2. Users / Client Accounts / Team Members
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT,
      google_id TEXT UNIQUE,
      email_verified INTEGER NOT NULL DEFAULT 0,
      role_id TEXT NOT NULL DEFAULT 'PUBLIC_USER',
      avatar_url TEXT,
      phone TEXT,
      job_title TEXT,
      status TEXT NOT NULL DEFAULT 'ACTIVE',
      is_active INTEGER NOT NULL DEFAULT 1,
      verification_token TEXT,
      verification_token_expires DATETIME,
      reset_token TEXT,
      reset_token_expires DATETIME,
      session_token TEXT,
      last_login_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (role_id) REFERENCES roles(id)
    );

    -- 3. Leads & CRM
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      website TEXT,
      project_type TEXT NOT NULL,
      services_required TEXT,
      budget_range TEXT NOT NULL,
      timeline TEXT NOT NULL,
      message TEXT NOT NULL,
      additional_info TEXT,
      status TEXT NOT NULL DEFAULT 'NEW',
      score INTEGER DEFAULT 0,
      quality TEXT DEFAULT 'WARM',
      ai_summary TEXT,
      ai_pain_points TEXT,
      ai_recommended_service TEXT,
      ai_pricing_inr TEXT,
      ai_pricing_usd TEXT,
      ai_closure_prob TEXT,
      ai_outreach_draft TEXT,
      assigned_to_user_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (assigned_to_user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS lead_notes (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS lead_activity (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL,
      user_id TEXT,
      action TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    -- 4. Projects & Case Studies
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      client TEXT,
      industry TEXT,
      category TEXT NOT NULL DEFAULT 'WEBSITES',
      filter_tags TEXT,
      short_description TEXT NOT NULL,
      full_overview TEXT,
      challenge TEXT,
      strategy TEXT,
      solution TEXT,
      results TEXT,
      type TEXT DEFAULT 'SAMPLE PROJECT',
      year TEXT DEFAULT '2026',
      status TEXT NOT NULL DEFAULT 'PUBLISHED',
      featured INTEGER NOT NULL DEFAULT 0,
      featured_number TEXT,
      highlight_summary TEXT,
      featured_image TEXT,
      technologies TEXT,
      metrics TEXT,
      color_palette TEXT,
      typography TEXT,
      screens TEXT,
      client_testimonial TEXT,
      seo_title TEXT,
      seo_description TEXT,
      seo_og_image TEXT,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 5. Services CMS
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      icon_name TEXT NOT NULL DEFAULT 'Globe',
      hero_image TEXT,
      starting_price_inr TEXT NOT NULL,
      starting_price_usd TEXT NOT NULL,
      timeline TEXT NOT NULL,
      features TEXT,
      deliverables TEXT,
      process_steps TEXT,
      faqs TEXT,
      cta_heading TEXT,
      cta_subtext TEXT,
      is_published INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER DEFAULT 0,
      seo_title TEXT,
      seo_description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 6. Testimonials & Client Reviews
    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      author_name TEXT NOT NULL,
      author_role TEXT NOT NULL,
      author_company TEXT NOT NULL,
      author_avatar TEXT,
      quote TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      project_id TEXT,
      is_featured INTEGER DEFAULT 1,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 7. FAQs
    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL DEFAULT 'General',
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      is_published INTEGER DEFAULT 1,
      display_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 8. Website Content CMS
    CREATE TABLE IF NOT EXISTS page_content (
      key TEXT PRIMARY KEY,
      section TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 9. SEO Metadata Store
    CREATE TABLE IF NOT EXISTS seo_metadata (
      route_path TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      keywords TEXT,
      canonical_url TEXT,
      og_title TEXT,
      og_description TEXT,
      og_image TEXT,
      twitter_card TEXT DEFAULT 'summary_large_image',
      robots TEXT DEFAULT 'index, follow',
      schema_json TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 10. Media Library
    CREATE TABLE IF NOT EXISTS media (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      url TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size_bytes INTEGER NOT NULL,
      width INTEGER,
      height INTEGER,
      uploaded_by_user_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploaded_by_user_id) REFERENCES users(id) ON DELETE SET NULL
    );

    -- 11. Studio Settings & API Configs
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      description TEXT,
      is_secret INTEGER DEFAULT 0,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 12. Audit Logs
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      user_name TEXT,
      action TEXT NOT NULL,
      resource TEXT NOT NULL,
      resource_id TEXT,
      details TEXT,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe migrations for existing databases
  const migrationColumns = [
    'ALTER TABLE users ADD COLUMN google_id TEXT;',
    'ALTER TABLE users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 0;',
    'ALTER TABLE users ADD COLUMN status TEXT NOT NULL DEFAULT "ACTIVE";',
    'ALTER TABLE users ADD COLUMN verification_token TEXT;',
    'ALTER TABLE users ADD COLUMN verification_token_expires DATETIME;',
    'ALTER TABLE users ADD COLUMN reset_token TEXT;',
    'ALTER TABLE users ADD COLUMN reset_token_expires DATETIME;',
    'ALTER TABLE users ADD COLUMN session_token TEXT;',
  ];

  for (const sql of migrationColumns) {
    try {
      db.exec(sql);
    } catch {
      // Column may already exist
    }
  }

  // Create indexes after ensuring all columns exist
  try {
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
      CREATE INDEX IF NOT EXISTS idx_users_verify_token ON users(verification_token);
      CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);
    `);
  } catch {
    // ignore
  }
}

// Auto-run schema init on module load
initDatabaseSchema();
