// Şifre Değişikliği
document.getElementById('change-password-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

    if (oldPassword === "correct_password") { // buradaki "correct_pass" db'deki oldPassword ile degisecek.
        alert("Password changed successfully!");
        // Yeni şifreyi kaydetme işlemi burada yapılır
    } else {
        alert("Old password is incorrect!");
    }
});

// Kart Silme
document.querySelectorAll('.delete-card').forEach(button => {
    button.addEventListener('click', function () {
        const cardItem = this.parentElement;
        cardItem.remove(); // Kartı listeden kaldır
        alert("Card deleted successfully!");
    });
});

// Hesap Silme
document.getElementById('delete-account-button').addEventListener('click', function () {
    const confirmation = confirm("Are you sure you want to delete your account?");
    if (confirmation) {
        alert("Account deleted successfully!");
        // Hesap silme işlemi burada yapılır
    }
});
