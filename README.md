# book-management-app
本のレビュー・管理サイトです。<br>
書籍のレビューを書いたり、他ユーザの書籍レビューをチェックしたり、「読みたい本」「読んでる本」「読み終わった本」「積読本」と分けて本棚に登録し読書管理する事ができます。<br>
rails(apiモード)とreactを使ってSPAを実装しました。<br>
書籍検索時に楽天APIを利用して書籍情報を取得しています。
# URL
https://www.book-management-app.xyz/ <br>
ゲストログインから、メールアドレスとパスワードを入力せずにログインできます。
# 使用技術
- Ruby 2.7.2
- Ruby on Rails 6.0.3
- MySQL 8.0
- Nginx
- Unicorn
- HTML/CSS
- JavaScript 
- Node.js 14.15.4
- React 17.0.1
- Redux 4.0.5
- Material-ui 4.11.3
- npm 6.14.6
- Webpack 4.44.2
- AWS(VPC,EC2,RDS,ALB,Route53,ACM,SES)
- Docker/Docker-compose
- CircleCi
# AWS構成図
![book-management-app_aws](https://user-images.githubusercontent.com/39975871/114046090-84439b80-98c3-11eb-9735-e8d610a2948f.png)
# 機能一覧
- ユーザー登録、ログイン機能、ゲストログイン機能(devise token auth)
  - メールアドレス認証(メール送信時にamazon sesを使用)
- パスワード変更機能(devise token auth)
- パスワードリセット機能(メール送信時にamazon sesを使用)
- 書籍検索機能(楽天APIを使用)
- レビュー機能
- 本棚登録機能
