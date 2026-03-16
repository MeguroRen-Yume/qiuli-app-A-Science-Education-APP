<template>
  <div class="login-view" style="margin-top: 40px;">
    <img src="../assets/img/jl.png"
      style="margin-top:1rem;width:6rem;height:6rem"
    />

    <div style="margin-top: 16%;">
      <van-tabs v-model="active" title-active-color="#1989fa">

        <van-tab title="手机号登录">
          <van-field
            v-model="phone_number"
            required
            label="手机号"
            placeholder="请输入手机号"
            :rules="[
              { required: true },
              { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误！' },
            ]"
          >
          </van-field>
          <van-field
            v-model="sms"
            center
            clearable
            label="短信验证码"
            placeholder=""
          >
            <template #button>
              <van-button plain size="small" type="primary" style="float: right">发送验证码</van-button>
            </template>
          </van-field>
          <div style="margin-top: 7%;">
            <van-checkbox v-model="smsChecked" icon-size="20px">
              我已阅读同意
              <router-link :to="{ path: '/login' }">
                <a class="app-title">用户协议</a>
              </router-link>和
              <router-link :to="{ path: '/login' }">
                <a class="app-title">隐私条款</a>
              </router-link>
            </van-checkbox>
          </div>
          <div style="margin-top: 5%;">
            <van-button plain block type="primary" native-type="submit" @click="smsLogin">登录</van-button>
          </div>
          <div class="reg" style="margin-top: 5%;">
            <router-link :to="{ path: '/register' }">
            <a class="app-title">没有账号？立即注册</a>
          </router-link>
          </div>
        </van-tab>

        <van-tab title="密码登录">
          <van-form>
            <van-field
              v-model="username"
              name="用户名"
              label="用户名"
              placeholder="请输入用户名"
              :rules="[{ required: true, message: '未输入用户名！' }]"
            >
            </van-field>
            <van-field
              v-model="password"
              type="password"
              name="密码"
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '未输入密码' }]"
            >
            </van-field>
            <div style="margin-top: 7%;">
              <van-checkbox v-model="keyChecked" icon-size="20px">
                我已阅读同意
                <router-link :to="{ path: '/login' }">
                  <a class="app-title">用户协议</a>
                </router-link>和
                <router-link :to="{ path: '/login' }">
                  <a class="app-title">隐私条款</a>
                </router-link>
              </van-checkbox>
            </div>
            <div style="margin-top: 5%;">
              <van-button plain block type="primary" native-type="submit" @click="keyLogin">登录</van-button>
            </div>
            <div class="reg" style="margin-top: 5%;">
              <router-link :to="{ path: '/register' }">
                <a class="app-title">没有账号？立即注册</a>
              </router-link>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { loginUser, getUsers } from '../api/api'; // 引入登录方法

export default {
  data() {
    return {
      username: '',
      password: '',
      phone_number: '',
      sms: '',
      smsChecked: true,
      keyChecked: true
    };
  },
  methods: {
    async keyLogin() {
    if (!this.keyChecked) {
      alert('请勾选同意用户协议和隐私条款');
      return;
    }

    try {
      const response = await loginUser({
        username: this.username,
        password: this.password
      });
      console.log('Response from loginUser:', response);

      if (response.status === 200) {
        // 登录成功，获取认证令牌并存储
        const token = response.data.token;
        localStorage.setItem('token', token);

        // 根据需求进行页面跳转
        this.$router.push('/');
      } else {
        // 处理其他状态码，例如 401 可能是密码错误
        alert('用户名或密码错误');
      }
    } catch (error) {
      console.error('登录时发生错误:', error);
      alert('登录过程中发生错误，请稍后再试');
    }
  },

    // 验证码登录验证
    async smsLogin() {
      if (!this.smsChecked) {
        alert('未勾选同意用户协定和隐私条款');
        return;
      }

      try {
        const response = await loginUser({
          phone_number: this.phone_number,
          sms: this.sms
        });

        if (response.status === 200) {
          this.$router.push('/');
        } else {
          alert('验证码错误');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred while logging in');
      }
    }
  }
};
</script>

<style scoped>
a {
  color: #3495fc;
}
.login-view {
  padding: 3rem;
}
</style>

