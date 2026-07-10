import sqlite3
from werkzeug.security import generate_password_hash
DATABASE = "gloss_glow.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # -----------------------------
    # Admins
    # -----------------------------
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    )
    """)

    # -----------------------------
    # Services
    # -----------------------------
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price INTEGER,
        duration TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # -----------------------------
    # Appointments
    # -----------------------------
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        customer_email TEXT,
        service_type TEXT NOT NULL,
        preferred_date TEXT NOT NULL,
        preferred_time TEXT NOT NULL,
        vehicle_make TEXT,
        vehicle_model TEXT,
        notes TEXT,
        status TEXT DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # -----------------------------
    # Gallery Images
    # -----------------------------
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS gallery_images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image_url TEXT NOT NULL,
        category TEXT,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # -----------------------------
    # Slot Settings
    # -----------------------------
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS slot_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slot_time TEXT NOT NULL UNIQUE,
        max_capacity INTEGER NOT NULL DEFAULT 5
    )
    """)

    # -----------------------------
    # Default Time Slots
    # -----------------------------
    default_slots = [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM"
    ]

    for slot in default_slots:
        cursor.execute("""
        INSERT OR IGNORE INTO slot_settings
        (slot_time, max_capacity)
        VALUES (?, ?)
        """, (slot, 5))

    # -----------------------------
    # Default Services
    # -----------------------------
    default_services = [
        (
            "Basic Wash",
            "Exterior hand wash and dry with premium products",
            499,
            "45 min"
        ),
        (
            "Premium Wash",
            "Exterior and interior hand wash with premium products",
            2999,
            "2 hrs"
        ),
        (
            "Interior Detailing",
            "Complete interior vacuuming and deep cleaning",
            999,
            "90 min"
        ),
        (
            "Ceramic Coating",
            "Long-lasting ceramic paint protection",
            4999,
            "4 hrs"
        ),
        (
            "Paint Protection Film",
            "High-quality PPF installation",
            14999,
            "1 day"
        )
    ]

    for service in default_services:
        cursor.execute("""
        INSERT OR IGNORE INTO services
        (name, description, price, duration)
        VALUES (?, ?, ?, ?)
        """, service)

       # -----------------------------
# Default Admin
# -----------------------------
    cursor.execute("""
    SELECT id
    FROM admins
    WHERE username = ?
    """, ("admin",))

    admin_exists = cursor.fetchone()

    if not admin_exists:
        cursor.execute("""
        INSERT INTO admins
        (username, password_hash)
        VALUES (?, ?)
        """, (
            "admin",
            generate_password_hash("admin@123")
    ))

    conn.commit()
    conn.close()


if __name__ == "__main__":
    init_db()