#!/usr/bin/python3

import subprocess
import time
import threading


class Radio(object):
    def __init__(self, freq="93.0"):
        self.freq = freq
        self.radio_thread = None

    def play_mp3(self, address):
        self.radio_thread = threading.Thread(target=self.mp3_play_command, args=(address,))
        self.radio_thread.start()

    def mp3_play_command(self, address):
        command = "sox -t mp3 %s -t wav - | " \
                  "sudo ./pi_fm_rds -freq %s -audio -" % (address, str(self.freq))
        subprocess.call(command, shell=True)

    def is_playing(self):
        return self.radio_thread is not None and self.radio_thread.is_alive()


if __name__ == "__main__":
    x = Radio()
    x.play_mp3("/home/hack/play-list/star.mp3")
    # x.play_mp3("/tmp/play-list/beautiful_in_white.mp3")

    # subprocess.check_call("sox -t mp3 /tmp/play-list/beautiful_in_white.mp3 -t wav - | sudo ./pi_fm_rds -freq 107.9 -audio -", shell=True)
    # subprocess.run(["sudo", "./pi_fm_rds", "-audio", "/tmp/play-list/test-music.wav"])
