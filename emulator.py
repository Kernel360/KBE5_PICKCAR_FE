from kivy.core.text import LabelBase
from kivy.core.window import Window
from kivy.uix.popup import Popup
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.clock import Clock
from dotenv import load_dotenv
import platform
import os
import requests
import sys

env = os.getenv("PYTHON_ENV", "development")
dotenv_file = f".env.{env}"
load_dotenv(dotenv_file)

api_base_url = os.getenv("API_BASE_URL", "http://localhost:8080")

# 경고창을 띄우기 위한 tkinter import
import tkinter as tk
from tkinter import messagebox

if platform.system() == 'Linux':
    font_regular = '/usr/share/fonts/truetype/nanum/NanumGothic.ttf'
    font_bold = '/usr/share/fonts/truetype/nanum/NanumGothicBold.ttf'
else:
    font_regular = '/Users/park/Library/Fonts/NanumGothic-Regular.ttf'
    font_bold = '/Users/park/Library/Fonts/NanumGothic-Bold.ttf'

LabelBase.register(
    name='NanumGothic',
    fn_regular=font_regular,
    fn_bold=font_bold
)

if len(sys.argv) > 1:
    access_token = sys.argv[1]
else:
    # 경고창 띄우기
    root = tk.Tk()
    root.withdraw()  # 메인 윈도우 숨기기
    messagebox.showerror("오류", "인증된 토큰이 없습니다.")
    sys.exit(0)  # 프로그램 종료
if len(sys.argv) > 2:
    vehicle_id = sys.argv[2]
else:
    # 경고창 띄우기
    root = tk.Tk()
    root.withdraw()  # 메인 윈도우 숨기기
    messagebox.showerror("오류", "할당된 차량이 없습니다.")
    sys.exit(0)  # 프로그램 종료

from kivy.app import App
from kivy.core.window import Window

# 메인 클래스 밖에 정의
class ReturnConfirmPopup(Popup):
    def __init__(self, on_confirm, **kwargs):
        super().__init__(**kwargs)
        self.on_confirm = on_confirm
        self.title = f"Number : {vehicle_id}"
        self.size_hint = (None, None)
        self.size = (400, 330)
        self.auto_dismiss = False
        
        layout = BoxLayout(orientation='vertical', padding=30, spacing=20)
        
        # 타이틀과 메시지 사이에 빈 공간 추가
        from kivy.uix.widget import Widget
        layout.add_widget(Widget(size_hint_y=None, height=20))

        message = Label(
            text=vehicle_id+'번 해당 차량을\n반납하시겠습니까?', 
            size_hint_y=None, 
            height=90,
            font_name='NanumGothic'
        )
        layout.add_widget(message)
        
        # 버튼 레이아웃
        button_layout = BoxLayout(orientation='horizontal', spacing=10, size_hint_y=None, height=50)
        
        # 예 버튼
        yes_btn = Button(
            text='예', 
            size_hint_x=0.5,
            font_name='NanumGothic'
        )
        yes_btn.bind(on_press=self.confirm_return)
        button_layout.add_widget(yes_btn)
        
        # 아니오 버튼
        no_btn = Button(
            text='아니오', 
            size_hint_x=0.5,
            font_name='NanumGothic'
        )
        no_btn.bind(on_press=self.dismiss)
        button_layout.add_widget(no_btn)
        
        layout.add_widget(button_layout)
        self.content = layout
    
    def confirm_return(self, instance):
        self.dismiss()
        self.on_confirm()

class RemoteControlApp(App):
    title = f"{vehicle_id}번 차량 에뮬레이터"

    def build(self):
        self.access_token = access_token
        self.vehicle_id = vehicle_id

        self.cycle_event = None
        self.off_pressed = True
    
        layout = BoxLayout(orientation='vertical', spacing=10, padding=50)

        self.btn_on = Button(text='ON', font_size=24, font_name='NanumGothic', disabled=False)
        self.btn_off = Button(text='OFF', font_size=24, font_name='NanumGothic', disabled=True)
        self.btn_return = Button(text='반납', font_size=24, font_name='NanumGothic', disabled=False)

        self.btn_on.bind(on_press=self.on_engine_on)
        self.btn_off.bind(on_press=self.on_engine_off)
        self.btn_return.bind(on_press=self.on_return)

        layout.add_widget(self.btn_on)
        layout.add_widget(self.btn_off)
        layout.add_widget(self.btn_return)

        return layout

    def post_api(self, url, payload):
        headers = {
            "Authorization": f"Bearer {access_token}"
        }
        try:
            res = requests.post(url, json=payload, headers=headers)
            print(f"POST {url} -> {res.status_code}")
        except Exception as e:
            print(f"Error POST {url}: {e}")

    def on_engine_on(self, instance):
        print("ON 버튼 클릭됨")
        self.post_api(f"{api_base_url}/api/v1/event/engine/on", {
            "vehicle_id": vehicle_id,
            "mdn": "01234567890",
            "event_status": "ON",
            "engine_on_time": "20240601123000",
            "engine_off_time": "",
            "gps_status": "NORMAL",
            "latitude": 37.4418038,
            "longitude": 12.7244003
        })

        # 60초마다 cycle 전송 시작
        if not self.cycle_event:
            self.cycle_event = Clock.schedule_interval(self.send_cycle_data, 60)

        # 버튼 상태 변경
        self.btn_on.disabled = True
        self.btn_off.disabled = False
        self.btn_return.disabled = True

    def send_cycle_data(self, dt):
        print("60초 주기로 CYCLE 전송")
        self.post_api(f"{api_base_url}/api/v1/cycle", {
            "vehicle_id": vehicle_id,
            "cycle_cnt": 60,
            "occurred_at": "20240601123001",
            "distance": 10591,
            "cycle_infos":
                [
                    {"second": "20241130000119", "gps_status": "NORMAL", "latitude": 35.624439, "longitude": 129.335991,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000120", "gps_status": "NORMAL", "latitude": 35.624403, "longitude": 129.335968,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000121", "gps_status": "NORMAL", "latitude": 35.624352, "longitude": 129.335945,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000122", "gps_status": "NORMAL", "latitude": 35.624305, "longitude": 129.335930,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000123", "gps_status": "NORMAL", "latitude": 35.624252, "longitude": 129.335918,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000124", "gps_status": "NORMAL", "latitude": 35.624190, "longitude": 129.335906,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000125", "gps_status": "NORMAL", "latitude": 35.624126, "longitude": 129.335896,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000126", "gps_status": "NORMAL", "latitude": 35.624064, "longitude": 129.335891,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000127", "gps_status": "NORMAL", "latitude": 35.624004, "longitude": 129.335893,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000128", "gps_status": "NORMAL", "latitude": 35.623948, "longitude": 129.335896,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000129", "gps_status": "NORMAL", "latitude": 35.623891, "longitude": 129.335906,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000130", "gps_status": "NORMAL", "latitude": 35.623838, "longitude": 129.335918,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000131", "gps_status": "NORMAL", "latitude": 35.623784, "longitude": 129.335935,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000132", "gps_status": "NORMAL", "latitude": 35.623723, "longitude": 129.335950,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000133", "gps_status": "NORMAL", "latitude": 35.623652, "longitude": 129.335961,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000134", "gps_status": "NORMAL", "latitude": 35.623589, "longitude": 129.335991,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000135", "gps_status": "NORMAL", "latitude": 35.623576, "longitude": 129.336083,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000136", "gps_status": "NORMAL", "latitude": 35.623535, "longitude": 129.336153,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000137", "gps_status": "NORMAL", "latitude": 35.623489, "longitude": 129.336208,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000138", "gps_status": "NORMAL", "latitude": 35.623444, "longitude": 129.336255,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000139", "gps_status": "NORMAL", "latitude": 35.623393, "longitude": 129.336275,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000140", "gps_status": "NORMAL", "latitude": 35.623365, "longitude": 129.336296,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000141", "gps_status": "NORMAL", "latitude": 35.623349, "longitude": 129.336286,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000142", "gps_status": "NORMAL", "latitude": 35.623338, "longitude": 129.336268,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000143", "gps_status": "NORMAL", "latitude": 35.623331, "longitude": 129.336263,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000144", "gps_status": "NORMAL", "latitude": 35.623330, "longitude": 129.336263,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000145", "gps_status": "NORMAL", "latitude": 35.623332, "longitude": 129.336265,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000146", "gps_status": "NORMAL", "latitude": 35.623335, "longitude": 129.336266,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000147", "gps_status": "NORMAL", "latitude": 35.623338, "longitude": 129.336266,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000148", "gps_status": "NORMAL", "latitude": 35.623339, "longitude": 129.336266,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000149", "gps_status": "NORMAL", "latitude": 35.623340, "longitude": 129.336268,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000150", "gps_status": "NORMAL", "latitude": 35.623341, "longitude": 129.336268,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000151", "gps_status": "NORMAL", "latitude": 35.623341, "longitude": 129.336268,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000152", "gps_status": "NORMAL", "latitude": 35.623337, "longitude": 129.336265,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000153", "gps_status": "NORMAL", "latitude": 35.623333, "longitude": 129.336256,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000154", "gps_status": "NORMAL", "latitude": 35.623317, "longitude": 129.336240,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000155", "gps_status": "NORMAL", "latitude": 35.623291, "longitude": 129.336220,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000156", "gps_status": "NORMAL", "latitude": 35.623262, "longitude": 129.336203,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000157", "gps_status": "NORMAL", "latitude": 35.623227, "longitude": 129.336204,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000158", "gps_status": "NORMAL", "latitude": 35.623194, "longitude": 129.336228,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000159", "gps_status": "NORMAL", "latitude": 35.623171, "longitude": 129.336271,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000200", "gps_status": "NORMAL", "latitude": 35.623161, "longitude": 129.336333,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000201", "gps_status": "NORMAL", "latitude": 35.623151, "longitude": 129.336408,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000202", "gps_status": "NORMAL", "latitude": 35.623150, "longitude": 129.336498,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000203", "gps_status": "NORMAL", "latitude": 35.623147, "longitude": 129.336601,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000204", "gps_status": "NORMAL", "latitude": 35.623145, "longitude": 129.336716,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000205", "gps_status": "NORMAL", "latitude": 35.623142, "longitude": 129.336836,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000206", "gps_status": "NORMAL", "latitude": 35.623143, "longitude": 129.336955,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000207", "gps_status": "NORMAL", "latitude": 35.623144, "longitude": 129.337074,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000208", "gps_status": "NORMAL", "latitude": 35.623148, "longitude": 129.337205,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000209", "gps_status": "NORMAL", "latitude": 35.623156, "longitude": 129.337345,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000210", "gps_status": "NORMAL", "latitude": 35.623163, "longitude": 129.337490,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000211", "gps_status": "NORMAL", "latitude": 35.623170, "longitude": 129.337640,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000212", "gps_status": "NORMAL", "latitude": 35.623174, "longitude": 129.337793,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000213", "gps_status": "NORMAL", "latitude": 35.623195, "longitude": 129.337968,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000214", "gps_status": "NORMAL", "latitude": 35.623206, "longitude": 129.338140,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000215", "gps_status": "NORMAL", "latitude": 35.623215, "longitude": 129.338313,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000216", "gps_status": "NORMAL", "latitude": 35.623221, "longitude": 129.338486,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000217", "gps_status": "NORMAL", "latitude": 35.623225, "longitude": 129.338660,
                     "angle": 0, "speed": 30, "battery": 128},
                    {"second": "20241130000218", "gps_status": "NORMAL", "latitude": 35.623229, "longitude": 129.338836,
                     "angle": 0, "speed": 30, "battery": 128}
                ]
        })

    def on_engine_off(self, instance):
        print("OFF 버튼 클릭됨")

        self.post_api(f"{api_base_url}/api/v1/event/engine/off", {
            "vehicle_id": vehicle_id,
            "mdn": "01234567890",
            "event_status": "OFF",
            "engine_on_time": "20240601123000",
            "engine_off_time": "20240601123100",
            "gps_status": "NORMAL",
            "latitude": 37.4418097,
            "longitude": 12.7244062
        })

        # 주기적 CYCLE 중지
        if self.cycle_event:
            self.cycle_event.cancel()
            self.cycle_event = None

        # 반납 버튼 활성화
        self.btn_on.disabled = False
        self.btn_off.disabled = True
        self.btn_return.disabled = False
        self.off_pressed = True

    def on_return(self, instance):
        if not self.off_pressed:
            print("먼저 OFF 버튼을 눌러야 반납 가능합니다.")
            return

        # 확인 팝업 표시
        popup = ReturnConfirmPopup(self.execute_return)
        popup.open()

    def execute_return(self):
        """실제 반납 실행"""
        print("반납 버튼 클릭됨")

        self.post_api(f"{api_base_url}/api/v1/event/returned", {
            "vehicle_id": vehicle_id,
            "mdn": "01234567890",
            "event_status": "RETURNED",
            "engine_on_time": "20240601123000",
            "engine_off_time": "20240601123100",
            "gps_status": "NORMAL",
            "latitude": 37.4418097,
            "longitude": 12.7244062
        })
        
        # 반납 완료 후 프로그램 종료
        print("반납 완료. 프로그램을 종료합니다.")
        sys.exit(0)

if __name__ == '__main__':
    RemoteControlApp().run()