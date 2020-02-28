### image for build
FROM ruby:2.5.1-alpine 

ARG RAILS_ROOT=/usr/src/app/
ARG BUILD_PACKAGES="build-base curl-dev git"
ARG DEV_PACKAGES="libxml2-dev libxslt-dev mysql mysql-dev mysql-client yaml-dev zlib-dev nodejs yarn bash"
ARG RUBY_PACKAGES="tzdata yaml"

WORKDIR $RAILS_ROOT

# install packages
RUN apk update \
 && apk upgrade \
 && apk add --update --no-cache $BUILD_PACKAGES $DEV_PACKAGES $RUBY_PACKAGES

# install rubygem
COPY Gemfile Gemfile.lock $RAILS_ROOT/
RUN bundle install -j4

# install npm
# COPY package.json yarn.lock $RAILS_ROOT/
# RUN yarn install

# build assets
COPY . $RAILS_ROOT

