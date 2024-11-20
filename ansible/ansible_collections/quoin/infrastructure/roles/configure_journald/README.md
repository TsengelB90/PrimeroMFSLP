# qi-configure-journald

This is a reusable Ansible role that configures journald to persist logs.

The role does the following on the host:

    mkdir -p /var/log/journal
    systemd-tmpfiles --create --prefix /var/log/journal
    systemctl restart systemd-journald

For why this is needed, read here: https://askubuntu.com/questions/1002524/why-does-journalctl-list-boots-only-show-the-current-boot/1002525#1002525

## Usage

Include the role in your Ansible `roles_path` either by ansible-galaxy (preferred) or git subtree (not recommended) and then add it to your playbooks.
