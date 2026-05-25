export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md mb-6">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Todo App</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-3xl py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">隐私政策</h1>
        <p className="text-gray-600 mb-6">**生效日期**：2026年5月25日</p>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. 引言</h2>
          <p className="text-gray-600 mb-4">欢迎使用 Todo App（以下简称"本应用"）。我们重视您的隐私，致力于保护您的个人信息安全。本隐私政策旨在说明我们如何收集、使用、存储和保护您的个人信息，以及您享有的相关权利。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. 我们收集的信息</h2>
          
          <h3 className="text-lg font-medium text-gray-700 mb-3">2.1 账户注册信息</h3>
          <ul className="text-gray-600 mb-4 list-disc list-inside">
            <li><strong>邮箱地址</strong>：用于身份验证和账户管理</li>
            <li><strong>密码</strong>：用于账户安全验证（已加密处理）</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-700 mb-3">2.2 应用使用数据</h3>
          <ul className="text-gray-600 mb-4 list-disc list-inside">
            <li><strong>待办事项内容</strong>：您创建的任务标题和描述</li>
            <li><strong>任务状态</strong>：任务的完成状态标记</li>
            <li><strong>时间记录</strong>：任务的创建和更新时间</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-700 mb-3">2.3 技术必要数据</h3>
          <ul className="text-gray-600 list-disc list-inside">
            <li><strong>会话标识</strong>：用于维持登录状态的临时标识</li>
            <li><strong>访问日志</strong>：用于保障服务安全和稳定性的必要记录</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. 数据使用方式</h2>
          
          <h3 className="text-lg font-medium text-gray-700 mb-3">3.1 核心服务</h3>
          <ul className="text-gray-600 mb-4 list-disc list-inside">
            <li>提供账户注册、登录和身份验证服务</li>
            <li>存储和管理您的待办事项数据</li>
            <li>维持您的登录状态以提供持续服务</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-700 mb-3">3.2 安全保障</h3>
          <ul className="text-gray-600 mb-4 list-disc list-inside">
            <li>检测和防止未授权访问</li>
            <li>保障服务的安全性和稳定性</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-700 mb-3">3.3 服务改进</h3>
          <p className="text-gray-600">分析匿名使用数据以改进用户体验</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Cookie 使用</h2>
          <p className="text-gray-600 mb-4">我们使用必要的 Cookie 来维持您的登录状态。您可以通过浏览器设置管理 Cookie，但禁用必要的 Cookie 可能会影响部分功能的正常使用。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. 第三方服务</h2>
          <p className="text-gray-600 mb-4">本应用使用匿名网站分析服务，用于了解用户访问情况和改进服务质量。该服务仅收集匿名统计数据，不收集任何个人身份信息。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. 信息共享</h2>
          <p className="text-gray-600 mb-4">我们不会向任何第三方出售、出租或分享您的个人信息，除非：</p>
          <ul className="text-gray-600 list-disc list-inside">
            <li>根据法律法规或法院命令的要求</li>
            <li>为了保护我们的合法权益或公共安全</li>
            <li>您明确同意的情况下</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. 用户权利</h2>
          
          <h3 className="text-lg font-medium text-gray-700 mb-3">7.1 访问权</h3>
          <p className="text-gray-600 mb-4">您可以访问和查看您的个人信息和应用数据。</p>

          <h3 className="text-lg font-medium text-gray-700 mb-3">7.2 更正权</h3>
          <p className="text-gray-600 mb-4">您可以更正或更新您的个人信息。</p>

          <h3 className="text-lg font-medium text-gray-700 mb-3">7.3 删除权</h3>
          <p className="text-gray-600 mb-4">您可以请求删除您的账户及所有相关数据。</p>

          <h3 className="text-lg font-medium text-gray-700 mb-3">7.4 数据导出权</h3>
          <p className="text-gray-600 mb-4">您可以请求导出您的应用数据。</p>

          <h3 className="text-lg font-medium text-gray-700 mb-3">7.5 如何行使权利</h3>
          <p className="text-gray-600">如需行使上述权利，请通过以下方式联系我们：</p>
          <p className="text-gray-600 font-medium">邮箱：support@todoapp.example.com</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. 数据安全</h2>
          <p className="text-gray-600">我们采用业界标准的安全措施保护您的数据，包括加密存储、访问控制和安全传输等。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">9. 数据保留</h2>
          <ul className="text-gray-600 list-disc list-inside">
            <li><strong>账户数据</strong>：在账户存在期间保留</li>
            <li><strong>应用数据</strong>：与账户关联保留</li>
            <li><strong>临时数据</strong>：在使用完成后自动清理</li>
          </ul>
          <p className="text-gray-600 mt-4">当您删除账户时，所有相关数据将被永久删除。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">10. 政策更新</h2>
          <p className="text-gray-600">我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并更新"生效日期"。重大变更我们将通过适当方式通知您。</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">11. 联系方式</h2>
          <p className="text-gray-600">如有任何隐私相关问题或疑虑，请通过以下方式联系我们：</p>
          <p className="text-gray-600 font-medium">邮箱：support@todoapp.example.com</p>
        </section>

        <footer className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-gray-500 text-sm">**Todo App** 保留最终解释权。</p>
        </footer>
      </div>
    </div>
  );
}