# ベースイメージとしてMySQL公式イメージを使用
FROM mysql:8.0

# 環境変数を設定
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=mydb
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=userpassword

# タイムゾーンを日本時間に設定
ENV TZ=Asia/Tokyo

# 設定ファイルをコピー（必要に応じて）
# COPY my.cnf /etc/mysql/conf.d/my.cnf

# ポート3306を公開
EXPOSE 3306

# コンテナ起動時に実行されるコマンド
CMD ["mysqld"]