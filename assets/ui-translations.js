// Shared runtime messages for forms, navigation, themes, and clipboard actions.
const uiLanguage = document.documentElement.lang.startsWith('zh') ? 'zh' : document.documentElement.lang.startsWith('ja') ? 'ja' : 'en';
const uiCopy = {
  en: { day:'Switch to day mode', night:'Switch to night mode', open:'Open navigation', close:'Close navigation', copied:'Copied to clipboard.', select:'Select and copy the draft below.', copy:'Please copy: ', ready:'Draft ready. Review it and send it from your email app.', enquiry:'Project enquiry', subject:'Subject', hello:'Hello,', intro:'I would like to discuss a software development project.', name:'Name', email:'Email', service:'Service', budget:'Estimated budget (USD)', platform:'Target platform', details:'Project details', pending:'To be confirmed', undecided:'Not yet decided', privacy:'I have read the website privacy policy.' },
  zh: { day:'切换到白天模式', night:'切换到黑夜模式', open:'打开导航', close:'关闭导航', copied:'已复制到剪贴板。', select:'请选中并复制下方草稿。', copy:'请复制：', ready:'草稿已准备好，请在邮件应用中检查并发送。', enquiry:'项目咨询', subject:'主题', hello:'你好，', intro:'我想咨询一个软件开发项目。', name:'姓名', email:'邮箱', service:'服务', budget:'预估预算（美元）', platform:'目标平台', details:'项目详情', pending:'待确认', undecided:'尚未确定', privacy:'我已阅读网站隐私政策。' },
  ja: { day:'ライトモードに切り替え', night:'ダークモードに切り替え', open:'メニューを開く', close:'メニューを閉じる', copied:'クリップボードにコピーしました。', select:'下の下書きを選択してコピーしてください。', copy:'コピーしてください：', ready:'下書きができました。メールアプリで確認して送信してください。', enquiry:'開発のご相談', subject:'件名', hello:'こんにちは。', intro:'ソフトウェア開発について相談したいです。', name:'名前', email:'メール', service:'サービス', budget:'予算の目安（米ドル）', platform:'対象環境', details:'案件の詳細', pending:'要確認', undecided:'未定', privacy:'サイトのプライバシーポリシーを読みました。' }
}[uiLanguage];

const languagePicker = document.querySelector('[data-language-switch]');
languagePicker?.addEventListener('change', () => {
  const destination = new URL(languagePicker.value, document.baseURI);
  destination.search = location.search;
  destination.hash = location.hash;
  location.assign(destination.href);
});
