from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail

EMAIL_BODY_TEMPLATE = "Token resetujący hasło: {}"


@receiver(reset_password_token_created)
def password_reset_token_created(sender, reset_password_token, *args,
                                 **kwargs):

    send_mail(
        "Czasoprzestrzeń, zmiana hasła",
        EMAIL_BODY_TEMPLATE.format(reset_password_token.key),
        "noreply@scanningapp.com",
        [reset_password_token.user.email]
    )
