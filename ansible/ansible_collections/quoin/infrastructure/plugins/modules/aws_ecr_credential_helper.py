import json
import os
import tempfile


from ansible.module_utils.basic import AnsibleModule
from ansible.module_utils._text import to_native


def run_module():
    module = AnsibleModule(
        argument_spec=dict(
        ),
        supports_check_mode=True,
    )
    result = dict(
        changed=False,
        msg='',
    )
    if module.check_mode:
        module.exit_json(**result)
    else:
        try:
            docker_dir = os.path.expanduser('~/.docker')
            docker_config_file = os.path.join(docker_dir, 'config.json')
            if not os.path.exists(docker_config_file):
                docker_config = {}
            else:
                with open(docker_config_file) as fp:
                    docker_config = json.load(fp)
            if 'ecr-login' != docker_config.get('credsStore'):
                docker_config['credsStore'] = 'ecr-login'
                if not os.path.exists(docker_dir):
                    os.makedirs(docker_dir)
                # TODO: this is subtly wrong w.r.t deletion if there is an exception from the with block
                with tempfile.NamedTemporaryFile(mode='w', dir=docker_dir, delete=False) as fp:
                    json.dump(docker_config, fp, indent=4)
                    print(file=fp)
                module.atomic_move(fp.name, docker_config_file)
                result['changed'] = True
                result['msg'] = 'Enabled amazon-ecr-credential-helper'
        except Exception as e:
            module.fail_json(failed=True, msg="error : %s" % to_native(e))
        else:
            module.exit_json(failed=False, **result)


def main():
    run_module()


if '__main__' == __name__:
    main()
