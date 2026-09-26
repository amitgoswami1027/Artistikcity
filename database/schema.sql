-- =====================================================================
--  ArtistikCity - Microsoft SQL Server schema
--  Converted from the Laravel (MySQL) migrations and reconciled with the
--  columns the application code actually reads/writes (several columns
--  were used by the PHP code but missing from the original migrations).
--
--  Run with:  sqlcmd -S localhost -d artistikcity -i database/schema.sql
--  WARNING: drops and recreates every table (all data is lost).
-- =====================================================================

DROP TABLE IF EXISTS student_task_photos;
DROP TABLE IF EXISTS student_tasks;
DROP TABLE IF EXISTS student_teacher_connects;
DROP TABLE IF EXISTS certificates;
DROP TABLE IF EXISTS course_module_lesson_tasks;
DROP TABLE IF EXISTS course_module_lessons;
DROP TABLE IF EXISTS course_modules;
DROP TABLE IF EXISTS course_projects;
DROP TABLE IF EXISTS course_videos;
DROP TABLE IF EXISTS course_reviews;
DROP TABLE IF EXISTS course_photos;
DROP TABLE IF EXISTS course_prices;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS category_post;
DROP TABLE IF EXISTS post_tag;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS free_course_videos;
DROP TABLE IF EXISTS free_courses;
DROP TABLE IF EXISTS home_artworks;
DROP TABLE IF EXISTS student_artworks;
DROP TABLE IF EXISTS user_addresses;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS payment_logs;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS newsletters;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS mediums;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS course_types;
DROP TABLE IF EXISTS password_resets;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS users;

-- ---------------------------------------------------------------------
-- Accounts
-- ---------------------------------------------------------------------
CREATE TABLE users (
    id                  BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name                NVARCHAR(255) NOT NULL,
    slug                NVARCHAR(255) NULL,
    email               NVARCHAR(255) NOT NULL,
    email_verified_at   DATETIME2 NULL,
    password            NVARCHAR(255) NOT NULL,
    phone               NVARCHAR(50) NULL,
    profile_title       NVARCHAR(255) NULL,
    profile_description NVARCHAR(MAX) NULL,
    profile_photo       NVARCHAR(500) NULL,
    location            NVARCHAR(255) NULL,
    notifications       TINYINT NULL,
    language_preference NVARCHAR(50) NULL,
    free_courses        TINYINT NOT NULL DEFAULT 0,
    free_course_type    NVARCHAR(20) NOT NULL DEFAULT 'default'
                        CHECK (free_course_type IN ('color', 'black-white', 'default')),
    status              TINYINT NOT NULL DEFAULT 1,
    provider            NVARCHAR(50) NULL,
    provider_id         NVARCHAR(255) NULL,
    remember_token      NVARCHAR(100) NULL,
    created_at          DATETIME2 NULL,
    updated_at          DATETIME2 NULL,
    CONSTRAINT users_email_unique UNIQUE (email)
);

CREATE TABLE password_resets (
    email      NVARCHAR(255) NOT NULL,
    token      NVARCHAR(255) NOT NULL,
    created_at DATETIME2 NULL
);
CREATE INDEX password_resets_email_index ON password_resets (email);

CREATE TABLE admins (
    id                  BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name                NVARCHAR(100) NOT NULL,
    slug                NVARCHAR(255) NULL,
    email               NVARCHAR(255) NOT NULL,
    password            NVARCHAR(255) NOT NULL,
    admin_type          NVARCHAR(20) NOT NULL CHECK (admin_type IN ('admin', 'teacher')),
    location            NVARCHAR(255) NULL,
    profile_photo       NVARCHAR(500) NULL,
    profile_details     NVARCHAR(MAX) NULL,
    title               NVARCHAR(MAX) NULL,
    designation         NVARCHAR(MAX) NULL,
    profile_title       NVARCHAR(255) NULL,
    profile_description NVARCHAR(MAX) NULL,
    remember_token      NVARCHAR(100) NULL,
    created_at          DATETIME2 NULL,
    updated_at          DATETIME2 NULL,
    CONSTRAINT admins_email_unique UNIQUE (email)
);

-- ---------------------------------------------------------------------
-- Course taxonomies
-- ---------------------------------------------------------------------
CREATE TABLE mediums (
    id          BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name        NVARCHAR(100) NOT NULL,
    medium_slug NVARCHAR(100) NOT NULL,
    photo       NVARCHAR(500) NULL,
    status      TINYINT NOT NULL DEFAULT 1,
    created_at  DATETIME2 NULL,
    updated_at  DATETIME2 NULL
);

CREATE TABLE genres (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name       NVARCHAR(100) NOT NULL,
    genre_slug NVARCHAR(100) NOT NULL,
    status     TINYINT NOT NULL DEFAULT 1,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

CREATE TABLE course_types (
    id               BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name             NVARCHAR(100) NOT NULL,
    course_type_slug NVARCHAR(100) NOT NULL,
    status           TINYINT NOT NULL DEFAULT 1,
    created_at       DATETIME2 NULL,
    updated_at       DATETIME2 NULL
);

CREATE TABLE skills (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name       NVARCHAR(100) NOT NULL,
    skill_slug NVARCHAR(100) NOT NULL,
    status     TINYINT NOT NULL DEFAULT 1,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

-- categories are shared by courses and blog posts (as in the original app)
CREATE TABLE categories (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name       NVARCHAR(255) NOT NULL,
    slug       NVARCHAR(255) NOT NULL,
    status     TINYINT NOT NULL DEFAULT 1,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

-- ---------------------------------------------------------------------
-- Courses & workshops  (course_type_id 1 = course, 2 = workshop)
-- ---------------------------------------------------------------------
CREATE TABLE courses (
    id                     BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    main_course_id         BIGINT NULL,
    admin_id               BIGINT NOT NULL,
    medium_id              BIGINT NULL,
    genre_id               NVARCHAR(100) NULL,        -- comma separated genre ids
    course_type_id         BIGINT NULL,
    skill_id               BIGINT NULL,
    category_id            BIGINT NULL,
    title                  NVARCHAR(255) NOT NULL,
    slug                   NVARCHAR(255) NOT NULL,
    sub_title              NVARCHAR(500) NULL,
    introduction           NVARCHAR(MAX) NULL,
    introduction_details   NVARCHAR(MAX) NULL,
    summary                NVARCHAR(MAX) NULL,
    summary_details        NVARCHAR(MAX) NULL,
    schedule               NVARCHAR(MAX) NULL,
    schedule_details       NVARCHAR(MAX) NULL,
    schedule_pdf           NVARCHAR(500) NULL,
    age_group              NVARCHAR(255) NULL,
    duration               NVARCHAR(255) NULL,
    sessions               NVARCHAR(255) NULL,
    mini_projects          NVARCHAR(255) NULL,
    course_modules         NVARCHAR(255) NULL,
    time_required          NVARCHAR(255) NULL,
    includes               NVARCHAR(MAX) NULL,
    course_includes        NVARCHAR(MAX) NULL,         -- JSON
    course_highlights      NVARCHAR(MAX) NULL,         -- JSON
    course_for             NVARCHAR(MAX) NULL,         -- JSON
    course_not_for         NVARCHAR(MAX) NULL,         -- JSON
    course_problems_solved NVARCHAR(MAX) NULL,         -- JSON
    course_learn           NVARCHAR(MAX) NULL,         -- JSON
    course_outcome         NVARCHAR(MAX) NULL,
    course_deliverables    NVARCHAR(MAX) NULL,         -- JSON
    course_prerequisites   NVARCHAR(MAX) NULL,
    course_start_date      DATE NULL,
    course_based           NVARCHAR(50) NULL,
    is_free_course         TINYINT NOT NULL DEFAULT 0,
    status                 TINYINT NOT NULL DEFAULT 1,
    created_at             DATETIME2 NULL,
    updated_at             DATETIME2 NULL,
    CONSTRAINT courses_admin_id_foreign FOREIGN KEY (admin_id) REFERENCES admins (id)
);
CREATE INDEX courses_slug_index ON courses (slug);

CREATE TABLE course_prices (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    course_id  BIGINT NOT NULL,
    price_inr  FLOAT NOT NULL DEFAULT 0,
    price_usd  FLOAT NOT NULL DEFAULT 0,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL,
    CONSTRAINT course_prices_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id)
);

CREATE TABLE course_photos (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    course_id  BIGINT NOT NULL,
    photo_name NVARCHAR(500) NOT NULL,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL,
    CONSTRAINT course_photos_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id)
);

CREATE TABLE course_videos (
    id          BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    course_id   BIGINT NOT NULL,
    video_title NVARCHAR(255) NULL,
    video_url   NVARCHAR(1000) NULL,
    status      TINYINT NOT NULL DEFAULT 0,
    created_at  DATETIME2 NULL,
    updated_at  DATETIME2 NULL,
    CONSTRAINT course_videos_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id)
);

CREATE TABLE course_reviews (
    id            BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    course_id     BIGINT NOT NULL,
    added_by_id   BIGINT NOT NULL,
    added_by_type NVARCHAR(20) NOT NULL CHECK (added_by_type IN ('Teacher', 'Student')),
    rating        INT NULL,
    review        NVARCHAR(MAX) NULL,
    status        TINYINT NOT NULL DEFAULT 0,
    created_at    DATETIME2 NULL,
    updated_at    DATETIME2 NULL
);

CREATE TABLE course_modules (
    id              BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    admin_id        BIGINT NULL,
    course_id       BIGINT NOT NULL,
    module_title    NVARCHAR(255) NOT NULL,
    module_duration NVARCHAR(255) NULL,
    status          NVARCHAR(20) NOT NULL DEFAULT '0',
    created_at      DATETIME2 NULL,
    updated_at      DATETIME2 NULL,
    CONSTRAINT course_modules_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id),
    CONSTRAINT course_modules_admin_id_foreign FOREIGN KEY (admin_id) REFERENCES admins (id)
);

CREATE TABLE course_module_lessons (
    id                 BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    admin_id           BIGINT NULL,
    course_id          BIGINT NOT NULL,
    module_id          BIGINT NOT NULL,
    lesson_title       NVARCHAR(255) NOT NULL,
    lesson_description NVARCHAR(MAX) NULL,
    lesson_pdf         NVARCHAR(500) NULL,
    status             NVARCHAR(20) NOT NULL DEFAULT '0',
    created_at         DATETIME2 NULL,
    updated_at         DATETIME2 NULL,
    CONSTRAINT course_module_lessons_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id),
    CONSTRAINT course_module_lessons_module_id_foreign FOREIGN KEY (module_id) REFERENCES course_modules (id),
    CONSTRAINT course_module_lessons_admin_id_foreign FOREIGN KEY (admin_id) REFERENCES admins (id)
);

CREATE TABLE course_module_lesson_tasks (
    id               BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    admin_id         BIGINT NULL,
    course_id        BIGINT NOT NULL,
    module_id        BIGINT NOT NULL,
    lesson_id        BIGINT NOT NULL,
    task_title       NVARCHAR(255) NOT NULL,
    task_description NVARCHAR(MAX) NULL,
    status           NVARCHAR(20) NOT NULL DEFAULT '0',
    created_at       DATETIME2 NULL,
    updated_at       DATETIME2 NULL,
    CONSTRAINT course_module_lesson_tasks_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id),
    CONSTRAINT course_module_lesson_tasks_module_id_foreign FOREIGN KEY (module_id) REFERENCES course_modules (id),
    CONSTRAINT course_module_lesson_tasks_lesson_id_foreign FOREIGN KEY (lesson_id) REFERENCES course_module_lessons (id),
    CONSTRAINT course_module_lesson_tasks_admin_id_foreign FOREIGN KEY (admin_id) REFERENCES admins (id)
);

CREATE TABLE course_projects (
    id                  BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    admin_id            BIGINT NULL,
    course_id           BIGINT NOT NULL,
    project_title       NVARCHAR(255) NOT NULL,
    project_description NVARCHAR(MAX) NULL,
    status              NVARCHAR(20) NOT NULL DEFAULT '0',
    created_at          DATETIME2 NULL,
    updated_at          DATETIME2 NULL,
    CONSTRAINT course_projects_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id),
    CONSTRAINT course_projects_admin_id_foreign FOREIGN KEY (admin_id) REFERENCES admins (id)
);

-- ---------------------------------------------------------------------
-- Student <-> teacher task conversation
-- ---------------------------------------------------------------------
CREATE TABLE student_teacher_connects (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    task_id    BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    teacher_id BIGINT NOT NULL,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL,
    CONSTRAINT stc_task_id_foreign FOREIGN KEY (task_id) REFERENCES course_module_lesson_tasks (id),
    CONSTRAINT stc_student_id_foreign FOREIGN KEY (student_id) REFERENCES users (id),
    CONSTRAINT stc_teacher_id_foreign FOREIGN KEY (teacher_id) REFERENCES admins (id)
);

CREATE TABLE student_tasks (
    id                         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    task_id                    BIGINT NOT NULL,
    student_teacher_connect_id BIGINT NOT NULL,
    from_type                  NVARCHAR(20) NOT NULL CHECK (from_type IN ('Student', 'Teacher')),
    from_id                    BIGINT NOT NULL,
    to_type                    NVARCHAR(20) NOT NULL CHECK (to_type IN ('Student', 'Teacher')),
    to_id                      BIGINT NOT NULL,
    reply                      NVARCHAR(MAX) NULL,
    review_status              NVARCHAR(20) NOT NULL
                               CHECK (review_status IN ('Under Review', 'Reviewed', 'Feedback', 'Completed')),
    review_date                DATETIME2 NULL,
    deleted_at                 DATETIME2 NULL,
    created_at                 DATETIME2 NULL,
    updated_at                 DATETIME2 NULL,
    CONSTRAINT student_tasks_task_id_foreign FOREIGN KEY (task_id) REFERENCES course_module_lesson_tasks (id),
    CONSTRAINT student_tasks_connect_id_foreign FOREIGN KEY (student_teacher_connect_id) REFERENCES student_teacher_connects (id)
);

CREATE TABLE student_task_photos (
    id              BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    task_id         BIGINT NOT NULL,
    student_task_id BIGINT NOT NULL,
    photo_name      NVARCHAR(500) NOT NULL,
    created_at      DATETIME2 NULL,
    updated_at      DATETIME2 NULL,
    CONSTRAINT student_task_photos_task_id_foreign FOREIGN KEY (task_id) REFERENCES course_module_lesson_tasks (id)
);

-- ---------------------------------------------------------------------
-- Commerce
-- ---------------------------------------------------------------------
CREATE TABLE orders (
    id                BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    order_number      NVARCHAR(100) NULL,
    user_id           BIGINT NOT NULL,
    course_id         BIGINT NOT NULL,
    session_id        NVARCHAR(255) NOT NULL,
    billing_name      NVARCHAR(255) NOT NULL,
    billing_email     NVARCHAR(255) NULL,
    billing_address   NVARCHAR(500) NULL,
    billing_city      NVARCHAR(255) NULL,
    billing_state     NVARCHAR(255) NULL,
    billing_zipcode   NVARCHAR(50) NULL,
    billing_country   NVARCHAR(255) NULL,
    price_type        NVARCHAR(10) NULL,
    price             NVARCHAR(50) NULL,
    payment_option    NVARCHAR(50) NULL,
    payment_id        NVARCHAR(255) NULL,
    payment_status    TINYINT NOT NULL DEFAULT 0,  -- 0 = not paid, 1 = success, 2 = failed
    payment_details   NVARCHAR(MAX) NULL,
    issue_certificate TINYINT NOT NULL DEFAULT 0,  -- 0 = not issued, 1 = issued
    certificate_name  NVARCHAR(500) NULL,
    created_at        DATETIME2 NULL,
    updated_at        DATETIME2 NULL
);

CREATE TABLE payment_logs (
    id              BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    order_id        BIGINT NULL,
    course_id       BIGINT NULL,
    payment_option  NVARCHAR(50) NULL,
    payment_id      NVARCHAR(255) NULL,
    payment_status  TINYINT NOT NULL DEFAULT 0,
    payment_details NVARCHAR(MAX) NULL,
    created_at      DATETIME2 NULL,
    updated_at      DATETIME2 NULL
);

CREATE TABLE cart_items (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    session_id NVARCHAR(255) NOT NULL,
    user_id    BIGINT NULL,
    order_id   BIGINT NULL,
    course_id  BIGINT NOT NULL,
    price_type NVARCHAR(10) NULL,
    price      NVARCHAR(50) NULL,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

CREATE TABLE user_addresses (
    id           BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    user_id      BIGINT NOT NULL,
    address_name NVARCHAR(255) NOT NULL,
    address      NVARCHAR(255) NOT NULL,
    city         NVARCHAR(255) NULL,
    state        NVARCHAR(255) NULL,
    country      NVARCHAR(255) NULL,
    zipcode      NVARCHAR(255) NULL,
    [primary]    TINYINT NULL DEFAULT 0,
    status       TINYINT NULL DEFAULT 1,
    created_at   DATETIME2 NULL,
    updated_at   DATETIME2 NULL
);

CREATE TABLE certificates (
    id                 BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    user_id            BIGINT NOT NULL,
    course_id          BIGINT NOT NULL,
    order_id           BIGINT NOT NULL,
    admin_id           BIGINT NOT NULL,
    user_name          NVARCHAR(255) NULL,
    course_title       NVARCHAR(255) NULL,
    teacher_name       NVARCHAR(255) NULL,
    certificate_number NVARCHAR(255) NULL,
    certificate_name   NVARCHAR(500) NULL,
    certificate_path   NVARCHAR(1000) NULL,
    status             TINYINT NOT NULL DEFAULT 1,
    created_at         DATETIME2 NULL,
    updated_at         DATETIME2 NULL,
    CONSTRAINT certificates_user_id_foreign FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT certificates_course_id_foreign FOREIGN KEY (course_id) REFERENCES courses (id),
    CONSTRAINT certificates_order_id_foreign FOREIGN KEY (order_id) REFERENCES orders (id),
    CONSTRAINT certificates_admin_id_foreign FOREIGN KEY (admin_id) REFERENCES admins (id)
);

-- ---------------------------------------------------------------------
-- Free courses
-- ---------------------------------------------------------------------
CREATE TABLE free_courses (
    id          BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    admin_id    BIGINT NOT NULL,
    title       NVARCHAR(255) NOT NULL,
    slug        NVARCHAR(255) NOT NULL,
    description NVARCHAR(MAX) NULL,
    status      TINYINT NULL,
    photo       NVARCHAR(500) NULL,
    video_url   NVARCHAR(1000) NULL,
    created_at  DATETIME2 NULL,
    updated_at  DATETIME2 NULL
);

CREATE TABLE free_course_videos (
    id             BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    free_course_id BIGINT NOT NULL,
    video_title    NVARCHAR(255) NULL,
    video_url      NVARCHAR(1000) NULL,
    status         TINYINT NOT NULL DEFAULT 0,
    created_at     DATETIME2 NULL,
    updated_at     DATETIME2 NULL
);

-- ---------------------------------------------------------------------
-- Site content
-- ---------------------------------------------------------------------
CREATE TABLE home_artworks (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    admin_id   BIGINT NOT NULL,
    photo_name NVARCHAR(500) NULL,
    comments   NVARCHAR(MAX) NULL,
    status     TINYINT NULL DEFAULT 0,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

CREATE TABLE student_artworks (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    user_id    BIGINT NOT NULL,
    photo_name NVARCHAR(500) NOT NULL DEFAULT '',
    comments   NVARCHAR(MAX) NULL,
    status     TINYINT NULL DEFAULT 1,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

CREATE TABLE testimonials (
    id          BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name        NVARCHAR(255) NOT NULL,
    slug        NVARCHAR(255) NULL,
    title       NVARCHAR(255) NULL,
    photo       NVARCHAR(500) NULL,
    description NVARCHAR(MAX) NULL,
    status      TINYINT NOT NULL DEFAULT 1,
    created_at  DATETIME2 NULL,
    updated_at  DATETIME2 NULL
);

CREATE TABLE newsletters (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    email      NVARCHAR(255) NOT NULL,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

CREATE TABLE contacts (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name       NVARCHAR(255) NULL,
    mobile_no  NVARCHAR(255) NULL,
    email      NVARCHAR(255) NULL,
    message    NVARCHAR(MAX) NULL,
    status     TINYINT NULL DEFAULT 1,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

CREATE TABLE settings (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    meta_tag   NVARCHAR(100) NULL,
    meta_key   NVARCHAR(100) NULL,
    meta_value NVARCHAR(MAX) NULL,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

-- ---------------------------------------------------------------------
-- Blog
-- ---------------------------------------------------------------------
CREATE TABLE posts (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    title      NVARCHAR(256) NOT NULL,
    subtitle   NVARCHAR(100) NOT NULL,
    slug       NVARCHAR(100) NOT NULL,
    body       NVARCHAR(MAX) NOT NULL,
    status     TINYINT NULL,
    posted_by  BIGINT NULL,
    image      NVARCHAR(500) NULL,
    featured   TINYINT NULL,
    [like]     INT NULL,
    dislike    INT NULL,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

CREATE TABLE tags (
    id         BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
    name       NVARCHAR(255) NOT NULL,
    slug       NVARCHAR(255) NOT NULL,
    status     TINYINT NULL,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL
);

CREATE TABLE category_post (
    category_id BIGINT NOT NULL,
    post_id     BIGINT NOT NULL,
    created_at  DATETIME2 NULL,
    updated_at  DATETIME2 NULL,
    CONSTRAINT category_post_category_id_foreign FOREIGN KEY (category_id) REFERENCES categories (id),
    CONSTRAINT category_post_post_id_foreign FOREIGN KEY (post_id) REFERENCES posts (id)
);

CREATE TABLE post_tag (
    post_id    BIGINT NOT NULL,
    tag_id     BIGINT NOT NULL,
    created_at DATETIME2 NULL,
    updated_at DATETIME2 NULL,
    CONSTRAINT post_tag_post_id_foreign FOREIGN KEY (post_id) REFERENCES posts (id),
    CONSTRAINT post_tag_tag_id_foreign FOREIGN KEY (tag_id) REFERENCES tags (id)
);
