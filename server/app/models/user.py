# User model
from sqlalchemy import Column ,Integer,String,DateTime,Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from ..database import Base

class UserRole(str,enum.Enum):
    STUDENT="student"
    TEACHER="teacher"
class User(Base):
    __tablename__="users"
    id= Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.STUDENT)
    country = Column(String, nullable=True)
    profile_picture = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


    # Relationships (connects to other tables)
    courses_created = relationship("Course", back_populates="teacher")
    enrollments = relationship("Enrollment", back_populates="user")
    messages_sent = relationship("ChatMessage", foreign_keys="ChatMessage.sender_id", back_populates="sender")
    messages_received = relationship("ChatMessage", foreign_keys="ChatMessage.receiver_id", back_populates="receiver")
    payments = relationship("Payment", back_populates="user")