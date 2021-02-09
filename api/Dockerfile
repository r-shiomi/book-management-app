FROM ruby:2.7.2
ENV LANG C.UTF-8

RUN apt update -qq && apt install -y mariadb-client

WORKDIR /app_name
COPY Gemfile /app_name/Gemfile
COPY Gemfile.lock /app_name/Gemfile.lock
RUN bundle install
COPY . /app_name

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
