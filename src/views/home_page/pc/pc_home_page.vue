<template>
  <div class="homepage_header">
    <el-row class="pgw hdbar" :style="topBannerNavBg">
      <el-col :span="4" :offset="2">
        <a href="https://www.imzhuge.com/" class="logobox" title="嗨皮诸葛" style="margin-left: 2.5%">
          <img src="@/assets/images/logo.png" alt="嗨皮诸葛" height="40"/>
        </a>
      </el-col>
      <el-col :span="16" style="position: relative">
        <ul class="hdnav clear">
          <li>
            <router-link to="/" id="nav_top" onclick="showUnderline(this.id,'hp')" class="navhome navcurr hand">首页
            </router-link>
          </li>
          <li><a id="nav_typical" onclick="showUnderline(this.id,'typical_use')" class="hand">典型应用</a></li>
          <!--        <li><a id="nav_activity" onclick="showUnderline(this.id,'activity')" class="hand">热门活动</a></li>-->
          <!--        <li><a id="nav_qst" onclick="showUnderline(this.id,'qst')" class="hand">常见问题</a></li>-->
          <li><a id="nav_about_us" onclick="showUnderline(this.id,'about_us')" class="hand">关于我们</a></li>
          <li><a id="nav_coop" onclick="showUnderline(this.id,'coop')" class="hand">合作交流</a></li>
          <!--        活动广场不在本页，需跳转-->
          <li><a v-on:click="toActivitySquare" id="nav_square"  class="hand">活动广场</a></li>
          <li v-if="!loginStatus"><a v-on:click="homelogin" class="navregbtn wow pulse animated hand"
                                          style=" visibility: visible;">登录</a>
          </li>
          <li v-else><a v-on:click="toPersonalCenter" class="hand">个人中心</a>
          </li>
        </ul>
      </el-col>


    </el-row>
  </div>
  <!--  用于定位，没有内容的div-->
  <div id="hp"></div>
  <el-row>
    <!--    轮播图开始-->
    <el-col :span="24" class="banner_bg">
      <div id="top" class="border"></div>
      <div class="block">
        <!--        interval计时器，轮播图展示时间-->
        <!--        <el-carousel :interval="4000" :height="bannerHeight+'px'" class="carousel">-->
        <!--          <el-carousel-item  v-for="item in imgUrls" :key="item.id">-->
        <!--            <img ref="bannerHeight" :src="item.src" style="width:100%" @load="imgLoad" />-->
        <!--          </el-carousel-item>-->
        <!--        </el-carousel>-->
        <img ref="bannerHeight" :src="require('@/assets/images/banner1.png')" style="width:100%" @load="imgLoad"/>
      </div>
    </el-col>
    <!--    轮播图结束-->

    <el-col :span="24">
      <!--      渐变色背景开始-->
      <div class="gradient_bg">
        <!--    三个模块开始-->
        <div class="sys_info_item pgw_1 three_block" style="transform:translateY(-15%);">
          <ul class="clear">
            <li class=" sys_img wow bounceInLeft animated" data-wow-duration="0.7s"
                style="visibility: visible; animation-name: bounceInLeft;">
              <!--              <img src="@/assets/images/市场准入.svg"/>-->
              <img :src="require('@/assets/images/market_access.svg')">
              <span>应用场景丰富</span>
              <p>针对经济政策不确定性事件、财经指标、公司价值进行预测</p>
            </li>
            <li class=" sys_img wow bounceInUp animated" data-wow-duration="0.7s"
                style="visibility: visible; animation-name: bounceInUp;">
              <!--              <img src="@/assets/images/知识.svg"/>-->
              <img :src="require('@/assets/images/zhishi.svg')">
              <span>聚集人机智慧</span>
              <p>机器模型通过财经大数据的潜在模式做预测，参与人基于私有信息和财经知识做判断</p>
            </li>
            <li class=" sys_img wow slideInRight animated" data-wow-duration="0.5s"
                style="visibility: visible; animation-name: slideInRight;">
              <!--              <img src="@/assets/images/智慧创新.svg"/>-->
              <img :src="require('@/assets/images/smart_innovation.svg')">
              <span>提供数据支持</span>
              <p>提供开源数据API，助力资产管理企业投资决策和政府财经部门政策制定</p>
            </li>
          </ul>
        </div>
        <!--    三个模块结束-->

        <!--      典型应用版块-->
        <div id="typical_use"></div>
        <el-row>
          <el-col :span="24" class="part_title">典型应用</el-col>
          <el-col :span="24" style="text-align: center">
            <el-radio-group v-model="typical_filter" class="my-radio-group">
              <el-radio-button class="filter-radio" label=0>企业收益率排序预测</el-radio-button>
              <el-radio-button class="filter-radio" label=1>全球经济不确定性预警</el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="22" :offset="1" class="typical-filter">
            <el-row v-if="typical_filter==0">
              <el-col :span="10" :offset="1" class="typical_content wow bounceInLeft animated">
                <p>基于人机融合</p>
                <p>做细分行业收益率排序</p>
                <el-button type="danger" class="more" v-on:click="more">立即使用</el-button>
              </el-col>
              <el-col :span="11" class="wow bounceInRight animated" style="position: relative">
                <img src="@/assets/images/yield.png" alt="收益率排序预测" width="600">
              </el-col>
            </el-row>
            <el-row v-if="typical_filter==1">
              <el-col :span="10" :offset="1" class="typical_content wow bounceInLeft animated">
                <p>融合领域专家与机器智慧</p>
                <p>做全球经济与政策不确定性评估和预警</p>
                <el-button type="info" disabled>即将发布</el-button>
              </el-col>
              <el-col :span="11" class="wow bounceInRight animated" style="z-index: 2;position: relative">
                <img src="@/assets/images/map.png" alt="全球经济不确定性预警" width="600"
                     style="margin-top: 80px">
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--      典型应用结束-->
      </div>
      <!--      渐变色背景结束-->
    </el-col>
  </el-row>

  <!--      热门活动板块-->
  <!--  <div id="activity"></div>-->
  <!--  <el-row style="justify-content: center">-->
  <!--    <el-row style="margin-top: 100px;">-->
  <!--      <el-col class="part_title" style="margin-bottom: 100px;">热门活动</el-col>-->
  <!--    </el-row>-->
  <!--    <el-row style="justify-content: center">-->
  <!--      <el-col :span="6"-->
  <!--              class="class wow bounceInLeft animated" data-wow-duration="0.7s"-->
  <!--              style="visibility: visible; animation-name: bounceInLeft;">-->
  <!--        <div class="hotactivity">-->
  <!--          <div class="money"><span style="color: #f56c6c;font-size: 15px;font-weight:bold;">￥50</span></div>-->
  <!--          <h4 style="margin-left: 20px;margin-top: 10px;">2021年11月30日，中国十年期国债收益率位于哪个区间？（单位：%）</h4>-->
  <!--          <div class="tag-group">-->
  <!--            <el-tag effect="plain" type="danger" >-->
  <!--              <span>财经</span>-->
  <!--            </el-tag>-->
  <!--            <el-tag effect="plain" type="danger" >-->
  <!--              <span>国债</span>-->
  <!--            </el-tag>-->
  <!--          </div>-->
  <!--          <el-row style="margin-top: 10px;margin-left: 20px;margin-bottom: 30px">-->
  <!--            <el-col class="timeandnum">-->
  <!--              <i class="el-icon-time">  2010.10.20 14:55 - 2021.11.30 10:00</i>-->
  <!--            </el-col>-->
  <!--            <el-col class="timeandnum" style="margin-top: 5px">-->
  <!--              <i class="el-icon-star-off">  261</i>-->
  <!--            </el-col>-->
  <!--          </el-row>-->
  <!--        </div>-->
  <!--      </el-col>-->
  <!--      <el-col :span="6" :offset="1"-->
  <!--              class="wow bounceInUp animated" data-wow-duration="0.7s"-->
  <!--              style="visibility: visible; animation-name: bounceInUp;">-->
  <!--        <div class="hotactivity">-->
  <!--          <div class="money"><span style="color: #f56c6c;font-size: 15px;font-weight:bold;">￥50</span></div>-->
  <!--          <h4 style="margin-left: 20px;margin-top: 10px;">2021年11月30日，中国十年期国债收益率位于哪个区间？（单位：%）</h4>-->
  <!--          <div class="tag-group">-->
  <!--            <el-tag effect="plain" type="danger" >-->
  <!--              <span>财经</span>-->
  <!--            </el-tag>-->
  <!--            <el-tag effect="plain" type="danger" >-->
  <!--              <span>国债</span>-->
  <!--            </el-tag>-->
  <!--          </div>-->
  <!--          <el-row style="margin-top: 10px;margin-left: 20px;margin-bottom: 30px">-->
  <!--            <el-col class="timeandnum">-->
  <!--              <i class="el-icon-time">  2010.10.20 14:55 - 2021.11.30 10:00</i>-->
  <!--            </el-col>-->
  <!--            <el-col class="timeandnum" style="margin-top: 5px">-->
  <!--              <i class="el-icon-star-off">  261</i>-->
  <!--            </el-col>-->
  <!--          </el-row>-->
  <!--        </div>-->
  <!--      </el-col>-->
  <!--      <el-col :span="6" :offset="1" class="wow slideInRight animated" data-wow-duration="0.5s"-->
  <!--              style="visibility: visible; animation-name: slideInRight;">-->
  <!--        <div class="hotactivity">-->
  <!--          <div class="money"><span style="color: #f56c6c;font-size: 15px;font-weight:bold;">￥50</span></div>-->
  <!--          <h4 style="margin-left: 20px;margin-top: 10px;">2021年11月30日，中国十年期国债收益率位于哪个区间？（单位：%）</h4>-->
  <!--          <div class="tag-group">-->
  <!--            <el-tag effect="plain" type="danger" >-->
  <!--              <span>财经</span>-->
  <!--            </el-tag>-->
  <!--            <el-tag effect="plain" type="danger" >-->
  <!--              <span>国债</span>-->
  <!--            </el-tag>-->
  <!--          </div>-->
  <!--          <el-row style="margin-top: 10px;margin-left: 20px;margin-bottom: 30px">-->
  <!--            <el-col class="timeandnum">-->
  <!--              <i class="el-icon-time">  2010.10.20 14:55 - 2021.11.30 10:00</i>-->
  <!--            </el-col>-->
  <!--            <el-col class="timeandnum" style="margin-top: 5px">-->
  <!--              <i class="el-icon-star-off">  261</i>-->
  <!--            </el-col>-->
  <!--          </el-row>-->
  <!--        </div>-->
  <!--      </el-col>-->
  <!--    </el-row>-->
  <!--  </el-row>-->


  <!--      常见问题解析板块-->
  <!--  <div id="qst"></div>-->
  <!--  <el-row>-->
  <!--    <div class="wow bounceInUp animated" data-wow-iteration="1" data-wow-duration="2s"-->
  <!--         style=" visibility: visible; animation-name: bounceInUp;">-->
  <!--      <el-row style="margin-top: 100px">-->
  <!--        <el-col><h2 class="part_title" style="text-align: center;margin-bottom: 100px;">常见问题解析</h2></el-col>-->
  <!--      </el-row>-->
  <!--      <el-row style="justify-content: center" >-->
  <!--        <el-col :span="2" >-->
  <!--          <img src="@/assets/images/questions.png" alt="questions">-->
  <!--        </el-col>-->
  <!--        <el-col :span="9">-->
  <!--          <el-row class="questiontitle">1. 参与资格</el-row>-->
  <!--          <el-row class="info">-->
  <!--            <p>活动可供所有用户参与，需在个人中心填写'平台测验'小测验，3分以上可以参与活动。</p>-->
  <!--          </el-row>-->
  <!--        </el-col>-->

  <!--        <el-col :span="2" :offset="1">-->
  <!--          <img src="@/assets/images/questions.png" alt="questions">-->
  <!--        </el-col>-->
  <!--        <el-col :span="9">-->
  <!--          <el-row class="questiontitle">2. 合约交易</el-row>-->
  <!--          <el-row class="info"><p>用户进入活动界面，购买（出售）某合约10份，所持该合约增加（减少）10份，合约价格越高，成本（收益）越高。</p></el-row>-->
  <!--        </el-col>-->

  <!--      </el-row>-->
  <!--      <el-row style="margin-top: 50px;justify-content: center" >-->
  <!--        <el-col :span="2">-->
  <!--          <img src="@/assets/images/questions.png" alt="questions">-->
  <!--        </el-col>-->
  <!--        <el-col :span="9">-->
  <!--          <el-row class="questiontitle">3. 盈利方式</el-row>-->
  <!--          <el-row class="info">-->
  <!--            <p>活动的盈利方式有两种方式，一是买入自己认为会发生的结果对应的合约，二是卖出自己不看好的结果对应的合约，使自己在活动中累积获取更多的诸葛贝。活动结束后根据诸葛贝的多少决定奖金的分配。</p>-->
  <!--          </el-row>-->
  <!--        </el-col>-->

  <!--        <el-col :span="2" :offset="1">-->
  <!--          <img src="@/assets/images/questions.png" alt="questions">-->
  <!--        </el-col>-->
  <!--        <el-col :span="9">-->
  <!--          <el-row class="questiontitle">4. 结果揭晓</el-row>-->
  <!--          <el-row class="info"><p>若某事件结果为真，则该事件对应合约清算价格为1，清算时持有10份该合约，则可获得10个诸葛贝收益。反之没有收益。</p></el-row>-->
  <!--        </el-col>-->

  <!--      </el-row>-->
  <!--      <el-row style="margin-top: 50px;justify-content: center">-->
  <!--        <el-col :span="2">-->
  <!--          <img src="@/assets/images/questions.png" alt="questions">-->
  <!--        </el-col>-->
  <!--        <el-col :span="9">-->
  <!--          <el-row class="questiontitle">5. 活动结束后奖金兑付</el-row>-->
  <!--          <el-row class="info">-->
  <!--            <p>用户可凭活动结束后诸葛贝数进行现金兑换，若参与的活动总奖金为30元人民币，所有用户总财富为1000个诸葛币，您的财富为100个诸葛币，占总财富的10%，最终获取现金3元。</p>-->
  <!--          </el-row>-->
  <!--        </el-col>-->

  <!--        <el-col :span="2" :offset="1">-->
  <!--          <img src="@/assets/images/questions.png" alt="questions">-->
  <!--        </el-col>-->
  <!--        <el-col :span="9">-->
  <!--          <el-row class="questiontitle">6. 财富排名</el-row>-->
  <!--          <el-row class="info"><p>每次活动结束后会更新一次财富排名，用户可以在首页中查看总排名、活跃度、周排名，也可以到已经清算后的预测活动页面查看自己在该活动的排名。</p></el-row>-->
  <!--        </el-col>-->

  <!--      </el-row>-->
  <!--    </div>-->

  <!--  </el-row>-->

  <!--      使命+四个图片-->
  <el-row style="margin-top: 100px;margin-bottom:100px;;visibility: visible; animation-name: lightSpeedIn;"
          class="clear lightSpeedIn wow  animated" data-wow-duration="0.7s" data-wow-delay="0.2s">
    <!--        使命-->
    <el-col :span="11" :offset="2" style="padding-top: 100px">
      <el-row>
        <strong class="part_title">做财经领域高水平的<br>人机融合预测平台</strong>
      </el-row>
      <el-row class="mlar" style="margin-top: 50px;color:#606266; font-size: 18px">
        采用市场机制融合人机智慧，提供精准、快速、高效的财经预测服务。
      </el-row>
      <el-row>
        <el-col span="6" style="margin-top: 50px;">
          <el-button v-on:click="homelogin" class="login" type="danger">前往登录</el-button>
        </el-col>
      </el-row>
    </el-col>
    <!--        四个图片-->
    <el-col :span="4" :offset="1" style="padding-top: 50px;">
      <div class="equality">
        <el-row style="justify-content: center;padding-top: 40px">
          <img src="@/assets/images/mis_1.png" alt="equality">
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px">
          <strong style="color:#fff;font-size: 18px;">融合</strong>
        </el-row>
        <el-row class="mlar" style="justify-content: center;margin-top: 15px;color:#fff">
          融合人机智慧，高效预测财经问题
        </el-row>
      </div>

      <div class="share">
        <el-row style="justify-content: center;padding-top: 40px">
          <img src="@/assets/images/mis_3.png" alt="share">
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px">
          <strong style="font-size: 18px">共享</strong>
        </el-row>
        <el-row class="mlar" style="justify-content: center;margin-top: 15px;color:#909399">
          开放数据、共享预知、辅助决策
        </el-row>
      </div>
    </el-col>
    <el-col :span="4" style="margin-left: 15px;">
      <div class="together">
        <el-row style="justify-content: center;padding-top: 40px">
          <img src="@/assets/images/mis_2.png" alt="together">
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px">
          <strong style="font-size: 18px">共创</strong>
        </el-row>
        <el-row class="mlar" style="justify-content: center;margin-top: 15px;color:#909399">
          携手大众共预未来
        </el-row>
      </div>

      <div class="promote">
        <el-row style="justify-content: center;padding-top: 40px">
          <img src="@/assets/images/mis_4.png" alt="promote">
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px">
          <strong style="font-size: 18px">提升</strong>
        </el-row>
        <el-row style="justify-content: center;margin-top: 15px;color:#909399">
          精确、快速、高效预知未来
        </el-row>
      </div>
    </el-col>
  </el-row>
  <!--  研究团队板块-->
  <div id="about_us"></div>
  <el-row>
    <el-col>
      <div class="team wow bounceInUp animated" data-wow-iteration="1" data-wow-duration="2s"
           style=" visibility: visible; animation-name: bounceInUp;">
        <el-row style="justify-content: center;letter-spacing:5px;padding-top: 80px;font-size: 36px;">
          <strong class="part_title">研究团队</strong>
        </el-row>
        <el-row style="justify-content: center;margin-top: 50px;">
          <el-col :span="20" class="teaminfo">
            <p>采用市场机制融合人机智慧可以实现更好的财经预测。此外，人类的群体智慧和机器学习模型并非对立，研究团队在深入理解并挖掘人机互补优势基础上，实现人机增强智能做财经预测。</p>
            <br>
            <p>“嗨皮诸葛”的使命是：做财经领域高水平的人机融合预测平台。为了实现该使命，我们组建了一个稳定的研究团队，主要成员如下：</p>
          </el-col>
        </el-row>
        <el-row class="teammember">

          <el-row class="wow bounceInLeft animated" data-wow-iteration="1" data-wow-duration="2s"
                  style=" visibility: visible; animation-name: bounceInLeft;">
            <!--团队的一行开始-->
            <el-col :span="9" :offset="2">
              <el-row><h4>郑海超 </h4></el-row>
              <el-row>
                <p>西南财经大学管理科学与工程学院教授。研究兴趣包括众包、金融科技、人机混合预测系统。
                  主持2个国家自科基金项目和2个教育部人文社科项目。
                  在Information Systems Journal, European Journal of Information Systems, Decision Support Systems
                  等信息系统类期刊发表多篇论文。</p>
              </el-row>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-row><h4>徐赟</h4></el-row>
              <el-row>
                <p>西南财经大学管理科学与工程学院教授，博士生导师，院长助理。目前主要从事金融科技，管理信息系统，和电子商务方面的研究。
                  他于2010年入选阿里巴巴研究院的“青年学者支持计划”， 2011年入选“四川省学术和技术带头人后备人选”，2014年获西南财经大学优秀科研成果奖。</p>
              </el-row>
            </el-col>
            <!--团队的一行结束-->
            <!--团队的一行开始-->
            <el-col :span="9" :offset="2">
              <el-row><h4>王涛</h4></el-row>
              <el-row>
                <p>西南财经大学管理科学与工程学院信息管理与信息系统系主任。主要研究方向包括互联网金融与信息披露、金融科技与用户行为、企业智能与知识管理等。
                  现为四川省华侨华人学会理事、成都市新侨联常任理事、西南财经大学新侨联理事、国家自然科学基金项目评议人、四川省海外高层次留学人才。</p>
              </el-row>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-row><h4>邵家兵 </h4></el-row>
              <el-row>
                <p>重庆大学二级教授、博士生导师、管理学博士、工商管理博士后、市场学系原系主任（2012-2020）。
                  学术兼职有国家自然科学基金同行评议专家、国家社会科学基金通讯评审专家、全国电子商务数字教育发展联盟副理事长、中国工业经济学会常务理事等。</p>
              </el-row>
            </el-col>
            <!--团队的一行结束-->
          </el-row>

          <el-row class="wow bounceInRight animated" data-wow-iteration="1" data-wow-duration="2s"
                  style=" visibility: visible; animation-name: bounceInRight;">
            <!--团队的一行开始-->
            <el-col :span="9" :offset="2">
              <el-row><h4>伍晶</h4></el-row>
              <el-row>
                <p>西南财经大学管理科学与工程学院教授，2009年获得新加坡国立大学信息系统博士学位，2004年获得香港科技大学经济学硕士学位，2002年获得西北工业大学电子工程学士学位。
                  研究兴趣包括信息系统经济学，电子商务，开放创新以及大数据经济学。</p>
              </el-row>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-row><h4>王俊</h4></el-row>
              <el-row>
                <p> 西南财经大学管理科学与工程学院副教授。致力于从大数据分析视角，通过大机器学习、数据分析、人工智能等方法解决金融市场的重要问题。
                  主要研究包括多源数据对证券市场的影响性分析，大数据视角的数字化互动媒体对股票市场的影响性研究、基于大数据的证券市场量化分析研究、基于海量数据的媒
                  体信息识别与情感量化分析研究等。</p>
              </el-row>
            </el-col>
            <!--团队的一行结束-->
            <!--团队的一行开始-->
            <el-col :span="9" :offset="2">
              <el-row><h4>郝琳娜</h4></el-row>
              <el-row>
                <p> 聊城大学副教授，2015年毕业于南开大学管理科学与工程专业，获管理学博士学位。
                  研究方向包括众包与价值工程。
                  在《系统工程理论与实践》、《科研管理》、《管理工程学报》、《运筹与管理》、《系统工程》等刊物发表论文10余篇，
                  并在科学出版社出版专著《众包模式——企业创新的新助力》。</p>
              </el-row>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-row><h4>许博</h4></el-row>
              <el-row>
                <p>复旦大学管理学院副教授，美国德克萨斯理工大学取得管理信息系统博士，瑞士苏黎世大学和美国麻省理工学院斯隆管理学院访问学者。
                  研究方向包括信息系统开发与管理，虚拟社区，电子商务。</p>
              </el-row>
            </el-col>
            <!--团队的一行结束-->
          </el-row>

          <el-row class="wow bounceInLeft animated" data-wow-iteration="1" data-wow-duration="2s"
                  style=" visibility: visible; animation-name: bounceInLeft;">
            <!--团队的一行开始-->
            <el-col :span="9" :offset="2">
              <el-row><h4>陈冬宇</h4></el-row>
              <el-row>
                <p> 苏州大学管理信息系统教授。
                  长期从事信息管理学术研究工作，着重研究P2P网络借贷等新兴互联网金融模式，获得多项被国际同行认可的成果，相关论文发表在MIS Quarterly, Communications of AIS,
                  Electronic Commerce Research等高水平期刊。</p>
              </el-row>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-row><h4>李凯</h4></el-row>
              <el-row>
                <p> 南开大学商学院教授，国际合作办学项目主任，数字商务研究中心主任。
                  研究方向包括电子商务、信息管理、大数据与商务智能。
                  天津市131创新型人才培养第二层次人才。</p>
              </el-row>
            </el-col>
            <!--团队的一行结束-->
            <!--团队的一行开始-->
            <el-col :span="9" :offset="2">
              <el-row><h4>李立婷</h4></el-row>
              <el-row>
                <p>西南财经大学博士生，已完成博士论文答辩。研究方向为人机融合信息市场中的人机交互机制设计。</p>
              </el-row>
            </el-col>
            <el-col :span="9" :offset="2">
              <el-row><h4>周春羽</h4></el-row>
              <el-row>
                <p>本科毕业于西南财经大学金融工程，硕士毕业于香港大学计算机科学。研究兴趣为量化模型构建。</p>
              </el-row>
            </el-col>
            <!--团队的一行结束-->
          </el-row>
        </el-row>
      </div>
    </el-col>
  </el-row>
  <!--合作交流-->
  <div id="coop"></div>
  <el-row>
    <el-col class="cooperation">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="sys_info wow bounceIn animated" style="visibility: visible; animation-name: bounceIn;">
            <h1 style="font-size: 50px;line-height: 33px;font-weight: 700">合作交流</h1><br>
            <div class="sys_info_item pgw_1">
              <div class="opportunity clear">
                <div class="contact_us_box teach sys_img wow bounceInLeft animated" data-wow-duration="0.7s"
                     style="visibility: visible; animation-name: bounceInLeft;"><img
                    src="@/assets/images/keyanxiangmu.svg"/><br>
                  <span style="color: #000000;font-weight: bold">科研教学</span>
                  <p><span>实验平台：</span>为学者提供实验研究和教学实训平台<br>
                    <span>适合学科：</span>经济学、行为金融、预测科学、人工智能、人机交互
                  </p>
                </div>
                <div class=" contact_us_box company sys_img wow bounceInUp animated" data-wow-duration="0.7s"
                     style="visibility: visible; animation-name: bounceInUp;"><img src="@/assets/images/qiye.svg"/><br>
                  <span style="color: #000000;font-weight: bold">资产管理</span>
                  <p><span>辅助决策：</span>使用嗨皮诸葛提供的数据API下载数据，辅助其写作投研报告或者做投资决策<br>
                    <span>优化模型：</span>将嗨皮诸葛的数据作为其模型训练的一部分来提升其自身模型的性能
                  </p>
                </div>
                <div class="contact_us_box media sys_img wow slideInRight animated" data-wow-duration="0.5s"
                     style="visibility: visible; animation-name: slideInRight;"><img
                    src="@/assets/images/meitijihuo.svg"/><br>
                  <span style="color: #000000;font-weight: bold">公共治理</span>
                  <p><span>社会调研：</span>根据政府财政部门的需求定制发布经济政策相关的预测任务<br>
                    <span>数据支持：</span>使用嗨皮诸葛的数据API下载数据辅助其写作研究报告，制定财经政策
                  </p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="secd contact_us2">
        <!--        <span class="feedback"><a href="http://m.imzhuge.com/selfcenter/write_feedback/">联系我们</a></span><br><br>-->
        <span class="feedback"><a href="#">联系我们</a></span><br><br>
        <p>您可以给我们发送邮件：<a href="mailto:haichao_zheng@163.com">haichao_zheng@163.com</a></p>
        <p>也可以扫码<span>微信直接交流</span>
          <!--            或<span>加入企业微信群</span>-->
        </p>
        <div class=" secbox clear">
          <div class=" contact_us wow bounceInUp animated" data-wow-duration="0.7s" data-wow-delay="0.1s"
               style=" visibility: visible; animation-name: bounceInUp;">
            <img src="@/assets/images/contactus.png"/>
            <!--                <img src="images/companyWechat.svg"/>-->
            <p style="font-weight: bold;font-size: 1.2em">期待与您的合作交流！</p>
          </div>
        </div>
      </div>
      <div class="partner">
        <div class="second_title">合作伙伴</div>
        <p><img src="@/assets/images/winvk.png" v-on:click="winvk" class="hand"></p>
      </div>
    </el-col>
  </el-row>

  <div class="foot">

    <p> 爱诸葛，知未来 | 蜀ICP备2020026052号-1 copyright@2020 | <span class="res_deceleration"
                                                            onclick="res_deceleration()">免责声明</span></p>
  </div>

  <div class="detail__board" id="detail-board-front">
    <div class="detail__inner">
      <div onclick="res_close()"><a class="detail__close"><img style="width: 30px;height: 30px"
                                                               :src="require('@/assets/images/close.svg')" alt="close"></a>
      </div>
      <div class="detail__article">
        <h3 class="detail__header">免责声明</h3>
        <div class="detail__content">
          <p>“嗨皮诸葛”是预测领域的研究平台，不收取任何服务佣金，目前该平台重点关注预测市场（prediction
            market），基于市场机制汇集大众的集体智慧，预测未来的事件。预测信息不对任何投资人及/或任何交易提供任何担保，无论是明示、默示或法定的。“嗨皮诸葛”提供的各种信息及资料（包括但不限于文字、数据、图表及超链接）仅供参考（例如：对未来趋势的预测不代表实际会发发生），不作为任何法律文件，亦不构成任何邀约、投资建议或承诺，投资人应依其独立判断做出决策。投资人据此进行投资交易而产生的风险等后果请自行承担，“嗨皮诸葛”不承担任何责任。</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {WOW} from 'wowjs'
import {getCSRFToken} from '@/api/token'
import config from '@/config'

export default {
  name: "pc_home_page",

  data() {
    return {
      topBannerNavBg: {
        backgroundColor: ''
      },
      bannerHeight: '',
      imgUrls: [
        // {id: 1, src: require('@/assets/images/carousel_1.png')},
        // {id: 2, src: require('@/assets/images/carousel_2.png')},
        {id: 2, src: require('@/assets/images/carousel_31.png')}
      ],
      typical_filter: 0
    }
  },
  computed:{
    loginStatus(){
      return this.$store.getters.loginStatus
    },
  },
  created() {
    window.showUnderline = this.showUnderline;
    window.res_deceleration = this.res_deceleration;
    window.res_close = this.res_close;
    this.$nextTick(() => {
      this.toLocal()
    })
  },
  methods: {
    // 获取csrftoken 确保受保护接口不会响应403
    getCSRFTokenMethod() {
      getCSRFToken();
    },
    // 滚动页面时触发导航变色
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let pos = window.scrollY;
      // 设置背景颜色的透明度
      if (scrollTop && pos > 300) {
        this.topBannerNavBg.backgroundColor = '#ff867e'
      } else if (scrollTop === 0 || pos < 300) {
        this.topBannerNavBg.backgroundColor = 'transparent' // 设置回到顶部时，背景颜色为透明
      }
    },
    // 滚动之前重置
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
    },

    //登录
    homelogin() {
      window.location.href = config.serverUrl+'/login?from_server=new'
    },
    //跳转活动广场
    toActivitySquare(){
      window.location.href = config.serverUrl+'/activity/'
    },
    // 跳转个人中心
    toPersonalCenter() {
      this.$router.push({
        path: '/personal_center',
      })
      // window.open(config.serverUrl + '/selfcenter/', '_blank')
    },
    //查看周度收益率界面
    more() {
      this.$router.push({
        path: '/weekly_forecast',
      })
    },
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = this.$refs.bannerHeight.height
      })
    },
    // 导航栏的下划线展示
    showUnderline: function (id, jumpId) {
      // id是导航栏li的参数，用于加下划线；jumpId是需要跳转的本页div的id
      const idBox = ["nav_top", "nav_typical", "nav_about_us", "nav_coop"];
      for (let i = 0; i < idBox.length; i++) {
        document.getElementById(idBox[i]).classList.remove("navcurr")
      }
      // navcurr控制导航栏下划线的样式
      document.getElementById(id).classList.add("navcurr")

      // 跳转
      let toElement = document.getElementById(jumpId); //获取
      //锚点存在跳转
      if (id) {
        // scrollIntoView让当前的元素滚动到浏览器窗口的可视区域内
        toElement.scrollIntoView({behavior: "smooth"})
      }
    },
    res_deceleration() {
      document.getElementById("detail-board-front").style.display = "block"
    },
    res_close() {
      document.getElementById("detail-board-front").style.display = "none"
    },
    winvk() {
      window.open("https://www.winvk.com/", "_blank");
    }
  },
  mounted() {
    this.getCSRFTokenMethod();
    window.addEventListener('scroll', this.handleScroll) // 监听页面滚动

    // this.imgLoad();
    // 视口发生变化时，高度赋值给bannerHeight
    window.addEventListener('resize', () => {

      this.bannerHeight = this.$refs.bannerHeight[0].height

      this.imgLoad();
    }, false)
    new WOW().init();
    //声明一个对象来配置动画效果参数
    var wow = new WOW(
        {
          boxClass: 'wow',      // default
          animateClass: 'animated', // default
          offset: 150,          // default
          mobile: false,       // default
          live: false        // default
        }
    )
    wow.init();
  }
}
</script>

<style scoped>
@import '../../../assets/CSS/homepage_style.css';
@import '../../../assets/CSS/homepage_common.css';
@import 'https://cdn.dowebok.com/98/css/animate.min.css';

/*.banner_bg{*/
/*  background: #ff867e;*/
/*}*/
.carousel {
  margin-top: 78px;
  z-index: 0;
}

.gradient_bg {
  background-image: linear-gradient(to top, #FFEBE9 0%, #FFFDFD 100%);
}

.typical_title {
  font-size: 36px;
  letter-spacing: 0.1em;
  line-height: 2;
  margin-bottom: 2%;
}

.part_title {
  margin-top: 50px;
  font-family: "microsoft yahei";
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 5px;
}

.typical_content {
  font-family: "microsoft yahei";
  text-align: left;
  padding-top: 120px;
}

.typical_content p {
  font-size: 26px;
}

.typical_content button {
  margin-top: 20px;
}

.typical_content h3 {
  font-size: 30px;
  font-weight: 700;
}

.typical_img {
  height: 480px;
  margin-bottom: 30px;
  margin-left: 40px;
}

.more {
  margin-top: 2%;
  background: #FF8F86;
}

/*热门活动部分开始*/
.hotactivity {
  border: 1.1px solid #D7D7D7;
  border-radius: 10px;
}

.money {
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0px;
  background-color: #ffe7ea;
  text-align: center;
  width: 20%;
}

.el-tag {
  border: 1.35px solid;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  height: 30px;
}

.timeandnum {
  font-size: 15px;
  color: #909399;
}

/*热门活动部分结束*/

/*常见问题解析开始*/
.questiontitle {
  font-size: 18px;
  font-weight: bold;
}

.info {
  color: #909399;
  font-size: 14px;
  margin-top: 10px;
  line-height: 21px;
  letter-spacing: 0.2px;
}

/*常见问题解析结束*/
/*使命*/

.login {
  font-size: 15px;
  /*font-weight: bold;*/
  color: #fff;
  line-height: 15px;
}

/*四个图片*/
.equality {
  background-color: #ff8f86;
  /*aspect-ratio: 1 / 1;*/
  height: 210px;
  padding-left: 10px;
  padding-right: 10px;
}

.share {
  background-color: #fafafa;
  height: 210px;
  margin-top: 20px;
  /*padding-right: 5px;*/
  /*padding-left: 5px;*/
}

.together {
  background-color: #fafafa;
  /*aspect-ratio: 1 / 1;*/
  height: 210px;
}

.promote {
  background-color: #fafafa;
  /*aspect-ratio: 1 / 1;*/
  height: 210px;
  margin-top: 20px;
}

/*研究团队*/
.team {
  background-color: rgb(249, 251, 255);
  border-radius: 40px;
  border: 4px #ff8f86;
}

.teaminfo p {
  text-align: left;
  text-indent: 2em;
  line-height: 40px;
  font-size: 20px;
  color: #666;
  letter-spacing: 0.5px;
}

.teammember {
  line-height: 26px;
  padding-bottom: 70px;
  justify-content: center;
}

.teammember h4 {
  font-weight: normal;
  color: #ff867e;
  font-size: 25px;
  margin-bottom: 20px;
  margin-top: 80px;
}

.teammember a {
  font-weight: normal;
  color: #ff867e;
  font-size: 25px;
  margin-bottom: 20px;
  margin-top: 80px;
}

.teammember a:hover {
  text-decoration: underline;
}

.teammember p {
  text-align: left;
  border: 4px #ff867e;
  color: black;
  font-size: 15px;
}

.hand {
  cursor: pointer
}

.three_block ul li p {
  margin-right: 8%;
  margin-left: 8%;
  height: 70px;
}

.mlar {
  margin-left: 5%;
  margin-right: 5%;
}

/*被选后的单选框颜色*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #FF697B;
  background: rgba(255, 105, 123, 0.2);
}

/*单选框样式*/
.filter-radio >>> .el-radio-button__inner {
  margin-right: 20px;
  margin-left: 20px;
  background: #F5F8FA;
  color: #7F7F7F;
  border: 0;
  border-radius: 25px;
  padding: 15px 30px;
}

/*单选框覆盖原有阴影*/
.filter-radio >>> .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  box-shadow: none;
}

.my-radio-group {
  margin-bottom: 5px;
  margin-top: 40px;
}

.typical-filter {
  height: 453px;
}
</style>