from flask import Flask, render_template, jsonify

import os
app = Flask(__name__)
app.jinja_env.globals['enumerate'] = enumerate
# ── Mohan Singh — Portfolio Data ────────────────────────────
DATA = {
    "name": "Mohan Singh",
    "title": "Python Developer & CS Graduate",
    "tagline": "Building scalable apps with Python, Flask & HTML / CSS/JS",
    "email": "mohannsingh2004@gmail.com",
    "phone": "+91 7982918769",
    "location": "Indirapuram, Ghaziabad, UP",
    "available": True,
    "summary": (
        "A motivated and detail-oriented Computer Science graduate with a strong "
        "foundation in Python, SQL, and web technologies. Experienced in developing "
        "scalable applications through academic projects and hands-on training. "
        "Passionate about machine learning and AI, eager to apply knowledge in "
        "real-world problem solving."
    ),
    "stats": [
        {"number": "5+",   "label": "Projects Built"},
        {"number": "3",    "label": "Certifications"},
        {"number": "2025", "label": "BCA Graduate"},
        {"number": "3+",   "label": "Languages"},
    ],
    "skills": [
        {"name": "Python",            "icon": "🐍", "color": "#3572A5"},
        {"name": "Flask",             "icon": "🌐", "color": "#00b894"},
        {"name": "HTML / CSS",        "icon": "💻", "color": "#f0db4f"},
        {"name": "JavaScript",        "icon": "🟨", "color": "#f7df1e"},
        {"name": "MySQL / Postgres",  "icon": "🗄️", "color": "#336791"},
        {"name": "Selenium",          "icon": "🤖", "color": "#43b02a"},
        {"name": "Pandas / ML",       "icon": "📊", "color": "#e44d26"},
        {"name":  "C",                 "icon": "⚙️", "color": "#a8b9cc"},
    ],
    "projects": [
        {
            "id": 1,
            "title": "Password Manager",
            "category": "Desktop App",
            "tech": ["Python", "Tkinter"],
            "color": "#00cec9",
            "description": "A desktop-based password manager with password generation, saving, and retrieval. Features GUI components, input validation, and secure local storage.",
            "points": [
                "Password generation, saving & retrieval",
                "GUI built with Tkinter components",
                "Input validation & secure storage",
            ],
            "size": "large",
        },
        {
            "id": 2,
            "title": "Snake Game",
            "category": "Game Dev",
            "tech": ["Python", "Turtle"],
            "color": "#6c5ce7",
            "description": "An interactive Snake Game with real-time collision detection, dynamic scoring system, and smooth turtle graphics rendering.",
            "points": [
                "Collision detection system",
                "Real-time score tracking",
                "Smooth Turtle graphics",
            ],
            "size": "medium",
        },
        {
             "id": 3,
             "title": "Cafe Finder REST API",
             "category": "REST API",
             "tech": ["Python", "Flask", "SQLAlchemy", "SQLite", "Postman"],
             "color": "#fd79a8",
             "description": "A fully functional REST API built with Flask and SQLAlchemy to manage a database of cafes — including location, amenities, and coffee prices.",
             "points": [
             "GET /random — returns a random cafe",
             "GET /all — returns all cafes sorted alphabetically",
            "GET /search?loc= — search cafes by location",
            "POST /add — add a new cafe to database",
            "PATCH /update-price — update coffee price by ID",
            "DELETE /report-closed — delete cafe with API key auth",
             "Proper HTTP status codes — 200, 403, 404",
             ],
             "size": "medium",
        },
        {
            "id": 4,
            "title": "Superstore Sales Analysis",
            "category": "Data Science",
            "tech": ["Python", "Pandas", "Matplotlib", "Seaborn", "Plotly"],
            "color": "#fdcb6e",
            "description": "Exploratory data analysis on a real-world retail dataset with 9,000+ records. Generates 4 visualizations and exports a summary CSV report with business insights.",
            "points": [
            "Analyzed 9,994 orders — $2.29M total sales",
            "Data cleaning — removed duplicates & missing values",
             "4 charts: bar, box plot, interactive scatter, horizontal bar",
            "Identified best category (Technology) & region (West)",
            "Most profitable: Copiers | Least: Tables (-$17,725)",
            "Exported summary report to CSV",
             ],
             "size": "wide",
        },
        {
            "id": 5,                              # ← inside projects list ✅
            "title": "Cafe & Wifi Finder",
            "category": "Web App",
            "tech": ["Python", "Flask", "WTForms", "Bootstrap", "CSV"],
            "color": "#e17055",
            "description": "A web app to find and add cafes with wifi. Users can submit cafes with ratings for coffee, wifi strength and power sockets. Data stored in CSV.",
            "points": [
                "Add cafes with Google Maps location",
                "Rate coffee, wifi & power sockets",
                "View all cafes in a table",
                "Flask-WTF forms with validation",
            ],
            "size": "medium",
        },
    ],                                            # ← projects list closes here ✅
    "certifications": [
        {
            "title": "Samsung Innovation Campus (SIC)",
            "desc": "Project-based training in Artificial Intelligence — building predictive models using machine learning algorithms.",
            "icon": "🏆",
            "color": "#0984e3",
        },
        {
            "title": "Ducat — Data Analytics",
            "desc": "Industrial visit gaining practical exposure to data analytics tools, techniques, and industry use cases.",
            "icon": "📈",
            "color": "#00b894",
        },
        {
            "title": "TCA — Neural Networks",
            "desc": "Workshop on Neural Networks and applications using TensorFlow.",
            "icon": "🧠",
            "color": "#a29bfe",
        },
    ],
    "education": [
        {
            "degree": "Bachelor of Computer Applications (BCA)",
            "school": "Noida International University, Greater Noida",
            "year": "2025",
            "url": "https://niu.edu.in",
        },
        {
            "degree": "Higher Secondary Education (12th)",
            "school": "Kendriya Vidyalaya, Noida",
            "year": "2022",
            "url": "https://noidashift2.kvs.ac.in",
        },
        {
            "degree": "Secondary Education (10th)",
            "school": "Kendriya Vidyalaya, Noida",
            "year": "2020",
            "url": "https://noidashift2.kvs.ac.in",
        },
    ],
    "tech_stack": [
        "Python", "Flask", "JavaScript", "HTML5", "CSS3",
        "MySQL", "PostgreSQL", "Selenium", "Pandas", "Tkinter",
        "Git", "GitHub", "TensorFlow", "Machine Learning",
        "WTForms", "Bootstrap", "CSV",
    ],
    "socials": [
        {"name": "GitHub",   "url": "https://github.com/Mohansingh-bit"},
        {"name": "LinkedIn", "url": "https://linkedin.com/in/mohan-singh-8b8a612a6"},
        {"name": "Email",    "url": "mailto:mohannsingh2004@gmail.com"},
    ],
}


# ── Routes ───────────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("index.html", d=DATA)

@app.route("/project/<int:pid>")
def project(pid):
    proj = next((p for p in DATA["projects"] if p["id"] == pid), None)
    if not proj:
        return "Not found", 404
    return render_template("project.html", p=proj, d=DATA)

@app.route("/api/data")
def api_data():
    return jsonify(DATA)

if __name__ == "__main__":
 app.run(debug=True, host='0.0.0.0', port=5000)
