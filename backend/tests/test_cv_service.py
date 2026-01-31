from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database.database import Base
from schemas.cv import CVSchemaCreate, PersonalInfo, Experience, Education
import services.cv as cv_service


def sample_cv_data():
    return CVSchemaCreate(
        personal=PersonalInfo(
            name="Alice",
            title="Engineer",
            email="a@example.com",
            phone="123",
            location="City",
            website=None,
            summary="Experienced engineer"
        ),
        experience=[Experience(role="Dev", company="Co", startDate="2020", endDate="2021", description="Did stuff")],
        education=[Education(degree="BS", institution="Uni", startDate="2016", endDate="2020")],
        skills=["Python", "SQL"]
    )


def test_create_get_update_cv():
    engine = create_engine("sqlite:///:memory:", connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()

    cv_data = sample_cv_data()
    db_cv = cv_service.create_cv(db, cv_data, user_id="user-1")

    assert db_cv.id is not None
    assert db_cv.user_id == "user-1"
    assert db_cv.personal.get("name") == "Alice"

    cvs = cv_service.get_cvs_by_user(db, "user-1")
    assert len(cvs) == 1

    fetched = cv_service.get_cv_by_id(db, db_cv.id)
    assert fetched.id == db_cv.id

    updated = cv_service.update_cv_with_optimization(db, db_cv.id, "Optimized text")
    assert updated.optimized_cv == "Optimized text"

    db.close()
