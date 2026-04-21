#this make all models importable
from .user import User, UserRole
from .course import Course
from .lesson import Lesson
from .enrollment import Enrollment
from .progress import Progress
from .chat import ChatMessage
from .payment import Payment, PaymentProvider, PaymentStatus

__all__ = [
    "User",
    "UserRole",
    "Course",
    "Lesson",
    "Enrollment",
    "Progress",
    "ChatMessage",
    "Payment",
    "PaymentProvider",
    "PaymentStatus"
]
