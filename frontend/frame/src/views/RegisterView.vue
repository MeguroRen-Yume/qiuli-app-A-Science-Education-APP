<template>
  <div>

<div>
  <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="goBack" />
</div>
  
  <div class="register-view">
    <van-cell-group style="margin-top: 0px;">
      <van-field
        v-model="username"
        required
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{
          required: true,
          message: '用户名不能为空'
        },]"
      />
      <van-field
        v-model="phone_number"
        required
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' },
        ]"
      />
      <van-field
        v-model="password"
        required
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '密码不能为空' }]"
      />
      <van-field
        v-model="password1"
        required
        type="password"
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="[{ required: true, message: '请再次输入密码' }]"
      />
      <!-- <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
            :disabled="!canSendSms"
            size="small"
            type="primary"
            @click="sendSms"
          >{{ smsButtonLabel }}</van-button>
        </template>
      </van-field> -->

      <div class="flex-center">
            <span>验证码</span>
            <input type="text" v-model="value" placeholder="请输入验证码" class="input-view" id="text"
               style="width: 95px;margin-left: 40px;margin-top: 5px;">
            <div class="flex-center margin-t20" style="display: block;justify-content: center;">
              <canvas id="canvas" width="150" height="43" @click="dj" 
              style="border: 1px solid #ccc;margin-right:10px;width: 100px;">
            </canvas>
            <p @click="dj" style="color:#1989fa;font-size:13px;width:100%">看不清？换一个</p>
        </div>
        </div>
  
    </van-cell-group>
    <div style="margin: 16px">
      <van-button
        :disabled="!canSubmit || !isUsernameAvailable"
        plain
        block
        type="primary"
        native-type="submit"
        @click="register"
      >注册</van-button>
    </div>
  </div>
</div>
</template>

<script>
import { registerUser } from '../api/api';

export default {
  data() {
    return {
      username: '',
      phone_number: '',
      password: '',
      password1: '',
      sms: '',
      smsTimer: null,
      smsCountdown: 60,
      isUsernameAvailable: true,
      show_num: [],
      value: '',
      smsflag: false,

    };
  },
  mounted() {
        this.show_num=[];
        this.draw();
    },
  computed: {
    canSubmit() {
      return this.password && this.password1 === this.password && this.phone_number && this.username;
    },
    canSendSms() {
      return !this.smsTimer && this.phone_number;
    },
    smsButtonLabel() {
      return this.smsTimer ? `${this.smsCountdown}秒后重发` : '发送验证码';
    },
  },
  methods: {
    goBack() {
      this.$router.push('/login');
    },

    async register() {
      this.sublim();
      if (this.password !== this.password1) {
        alert('两次密码不一致！');
        return;
      }
      if (!this.smsflag) {
        alert('验证码错误！');
        return;
      }

      try {
        const response = await registerUser({
          username: this.username,
          phone_number: this.phone_number,
          password: this.password
        });

        if (response.status === 200) {
          this.$router.push('/login');
        } else {
          alert('注册失败，请重试！');
        }
      } catch (error) {
        console.error('注册过程中发生错误:', error);
        alert('注册过程中发生错误，请稍后再试。');
      }
    },
    sendSms() {
      // 这里可以添加发送短信验证码的逻辑
      this.startCountdown();
    },
    startCountdown() {
      if (!this.smsTimer) {
        this.smsCountdown = 60;
        this.smsTimer = setInterval(() => {
          if (this.smsCountdown > 0) {
            this.smsCountdown--;
          } else {
            clearInterval(this.smsTimer);
            this.smsTimer = null;
          }
        }, 1000);
      }
    },


    sublim() {
            let [num1=0, type, num2=0] = this.show_num||[];
            let NUM_MAP = {
                '+': num1+num2,
                '-': num1-num2,
                '*': num1*num2
            }
            if(!this.value) return alert('请输入验证码！');
            if(this.value == NUM_MAP[type]){
                this.dj();
                this.smsflag=true;
            }else{
                this.dj();
                this.smsflag=false;
            }
        },
        // 随机颜色
        randomColor() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        },
        // 绘制干扰（线条，原点）
        drawLine(context, canvas_width, canvas_height) {
            for (var i = 0; i <= 30; i++) { //验证码上显示小点
                context.strokeStyle = this.randomColor();
                context.beginPath();
                var x = Math.random() * canvas_width;
                var y = Math.random() * canvas_height;
                context.moveTo(x, y);
                context.lineTo(x + 1, y + 1);
                context.stroke();
            }
        },
        // 绘制单个字符
        drawStr(context, txt, x) {
            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标（20+0到8的随机数）
            context.font = "bold 23px 微软雅黑";
 
            context.fillStyle = this.randomColor(); // 随机生成一个颜色
            context.fillText(txt, x, y);
            return x + 10 + context.measureText(txt).width; //宽度
        },
        drawNum(context, randomList, currentWidth) {
            var j = Math.floor(Math.random() * randomList.length);//获取到随机的索引值 Math.floor(Math.random()*(max-min+1)+min);
            var txt = randomList[j];//得到随机的一个内容
            this.show_num.push(txt);
            return this.drawStr(context, txt, currentWidth);
        },
        draw(codeLength=3) { // codeLength: 设置验证码长度
            let canvas = document.getElementById("canvas");//获取到canvas的对象，演员
            let context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
            let canvas_width=canvas.width;
            let canvas_height=canvas.height;
            context.clearRect(0,0, canvas_width, canvas_height);
 
            this.show_num=[];
            let currentWidth=0;
            // 数字一
            currentWidth = this.drawNum(context, new Array(100).fill(null).map((v, i) => i), currentWidth);
            // 运算类型
            currentWidth = this.drawNum(context, ['+', '-', '*'], currentWidth);
            // 数字二
            currentWidth = this.drawNum(context, new Array(10).fill(null).map((v, i) => i), currentWidth);
            // 绘制= ?
            this.drawStr(context, '= ?', currentWidth)
            // 一些干扰因素（线条，原点）
            this.drawLine(context, canvas_width, canvas_height); 
        },
        
        dj() {
            this.value=''
            this.draw();   
        },

  },

  
};
</script>

<style scoped>
.register-view {
  padding: 2rem;
}
.input-placeholder-color::placeholder {
    color: red;
}
</style>