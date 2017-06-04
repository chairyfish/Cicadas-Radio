from radio import Radio
import requests
import time
import random
import json

import sys
sys.setrecursionlimit(1000000)


class NetworkRadio(Radio):
    def __init__(self):
        Radio.__init__(self)
        self.playing_list_url = "http://139.198.14.56/ls.php"
        self.next_play_url = "http://139.198.14.56/ls.php"
        self.file_url = "http://139.198.14.56/phpfiles/"
        self.play_info_url = "http://139.198.14.56/play2.php"
        self.change_status_url = "http://139.198.14.56/change2.php"

    def get_next_id(self):
        params = {"Channel": self.freq}
        source = requests.get(self.play_info_url, params=params)
        source.encoding = "utf-8"
        json_parser = json.loads(source.text)
        status = json_parser[0]['Status']

        if status == '-1':
            time.sleep(3)
            return self.get_next_id()

        if status == '0':
            former_id = json_parser[1]["ID"]
            params = {"ID": former_id, "S": "-1"}
            requests.get(self.change_status_url, params=params)
            if len(json_parser) > 2:
                self.freq = json_parser[2]["Channel"]
                params["S"] = "0"
                params["ID"] = json_parser[2]["ID"]
                requests.get(self.change_status_url, params=params)
                return json_parser[2]["ID"]
            else:
                return self.get_next_id()

        if status == '1':
            now_id = json_parser[1]["ID"]
            params = {"ID": now_id, "S": "0"}
            requests.get(self.change_status_url, params=params)
            return json_parser[1]["ID"]

    def paly_white_noise(self):
        address = random.choice(["pool", "summer"])
        address = "/home/hack/play-list/%s" % address
        self.mp3_play_command(address)

    def run(self):
        id = self.get_next_id()
        self.play_mp3(self.file_url + id + ".mp3")
        while self.is_playing():
            time.sleep(0.5)
        self.run()

if __name__ == "__main__":
    radio = NetworkRadio()
    radio.run()
