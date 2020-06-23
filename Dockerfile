FROM ruby:2.5.3-stretch

ENV APP_PATH /usr/lib/app

RUN apt-get update -qq
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get install -y nodejs
RUN npm install -g yarn
RUN gem install bundler -v '1.17.3'

RUN mkdir $APP_PATH
WORKDIR $APP_PATH
ADD Gemfile $APP_PATH/Gemfile
ADD Gemfile.lock $APP_PATH/Gemfile.lock
RUN bundle install --without test
ADD . $APP_PATH
ADD package.json $APP_PATH/package.json
RUN yarn install --check-files
