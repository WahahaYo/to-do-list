export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md mb-6">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Todo App</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-3xl py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">用户协议</h1>
        <p className="text-gray-600 mb-6">**生效日期**：2026年5月25日</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. 协议接受</h2>
          <p className="text-gray-600">通过访问或使用 Todo App（以下简称&#34;本应用&#34;），您表示同意接受本用户协议的约束。如果您不同意本协议，请不要使用本应用。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. 服务描述</h2>
          <p className="text-gray-600 mb-4">本应用提供待办事项管理服务，包括但不限于：</p>
          <ul className="text-gray-600 list-disc list-inside mb-4">
            <li>用户注册和登录功能</li>
            <li>待办事项的创建、编辑、删除和状态管理</li>
            <li>个人任务列表的查看和管理</li>
          </ul>
          <p className="text-gray-600">使用本服务需遵守本协议及相关法律法规。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. 用户权利与功能说明</h2>
          <p className="text-gray-600 mb-4">用户在使用本应用时享有以下权利：</p>
          <ul className="text-gray-600 list-disc list-inside">
            <li>注册账户并设置个人密码</li>
            <li>登录账户并管理个人待办事项</li>
            <li>创建、编辑、删除个人任务</li>
            <li>标记任务完成状态</li>
            <li>查看个人任务历史记录</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. 用户责任条款</h2>
          <p className="text-gray-600 mb-4">用户在使用服务过程中，不得进行以下行为：</p>
          <ul className="text-gray-600 list-disc list-inside mb-4">
            <li>发布或传播违法、违规内容</li>
            <li>攻击、入侵或破坏本应用系统</li>
            <li>侵犯他人知识产权或隐私</li>
            <li>发送垃圾信息或滥用服务</li>
            <li>未经授权访问他人账户</li>
            <li>其他违反法律法规或损害本应用利益的行为</li>
          </ul>
          <p className="text-gray-600">违反上述条款者，本应用有权采取包括但不限于警告、暂停服务、删除账户等措施。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. 内容责任归属</h2>
          <p className="text-gray-600">用户在本应用上发布的所有内容（包括但不限于待办事项、备注等）的所有权及相关法律责任由用户自行承担。用户保证其发布的内容不违反法律法规，不侵犯任何第三方权益。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. 知识产权声明</h2>
          <p className="text-gray-600 mb-4">本应用的所有代码、界面设计、商标、标识及相关知识产权均归本应用所有，受法律保护。未经许可，任何单位或个人不得复制、传播或用于商业用途。</p>
          <p className="text-gray-600">用户发布的内容的知识产权归用户所有，但用户授予本应用非排他性的使用许可，用于提供和改进服务。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. 服务变更条款</h2>
          <p className="text-gray-600">本应用有权根据运营需要随时修改、暂停或终止服务，无需事先通知用户。对于服务变更或终止给用户造成的影响，本应用不承担责任。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. 免责声明</h2>
          <p className="text-gray-600 mb-4">本服务按&#34;现状&#34;提供，不保证100%可用性。本应用对以下情况不承担责任：</p>
          <ul className="text-gray-600 list-disc list-inside">
            <li>服务中断或故障导致的损失</li>
            <li>用户数据丢失或损坏</li>
            <li>第三方服务故障影响本应用</li>
            <li>因用户自身原因导致的损失</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">9. 争议解决机制</h2>
          <p className="text-gray-600 mb-4">本协议受中华人民共和国法律管辖。任何因本协议引起的争议，应首先通过友好协商解决；协商不成的，提交至有管辖权的法院解决。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">10. 协议更新</h2>
          <p className="text-gray-600">本应用有权随时更新本协议。更新后的协议将在本页面发布，并更新&#34;生效日期&#34;。继续使用服务即表示同意更新后的协议。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">11. 联系方式</h2>
          <p className="text-gray-600">如有任何问题或疑虑，请通过以下方式联系我们：</p>
          <p className="text-gray-600 font-medium">邮箱：support@todoapp.example.com</p>
        </section>

        <footer className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-gray-500 text-sm">**Todo App** 保留最终解释权。</p>
        </footer>
      </div>
    </div>
  );
}