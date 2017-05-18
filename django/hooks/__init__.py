from hooks.exceptions import HookNotFound, HookMethodNotFound, InvalidHook, InvalidHookMethod
from os.path import dirname, isfile, basename
import glob
import re


def get_hook_handler(hook, method):
    try:
        if re.search(r"[^a-z_]", hook):
            raise InvalidHook()
        if re.search(r"[^a-z_]", method):
            raise InvalidHookMethod()
        imported_module = __import__("hooks.hooks.{}".format(hook), fromlist=[method])
        hook_handler = getattr(imported_module, method)
    except ModuleNotFoundError:
        raise HookNotFound()
    except AttributeError:
        raise HookMethodNotFound()
    return hook_handler


def list_hooks():
    python_filenames = glob.glob(dirname(__file__) + "/hooks/*.py")
    hooks = [basename(f)[:-3] for f in python_filenames if isfile(f)]
    return hooks
