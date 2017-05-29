from channels import Group
from channels.auth import channel_session_user, channel_session_user_from_http
from channels.sessions import channel_session


@channel_session_user_from_http
def ws_connect(message):
    print("in: " + str(message.user.user.id))
    message.reply_channel.send({"accept": True})
    Group("notif-{}".format(str(message.user.user.id))).add(message.reply_channel)


@channel_session_user
def ws_disconnect(message):
    print("out:" + str(message.user.user.id))
    Group("notif-{}".format(str(message.user.user.id))).discard(message.reply_channel)
