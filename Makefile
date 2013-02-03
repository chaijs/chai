
TESTS = test/*.js
REPORTER = dot

#
# Node Module
#

node_modules: package.json
	@npm install

#
# Browser Build
# 

chai.js: node_modules lib/*
	@printf "\n  ==> [Browser :: build]\n"
	@node support/compile

#
# Components
# 

build: components lib/*
	@printf "\n  ==> [Component :: build]\n\n"
	@./node_modules/.bin/component-build --dev

components: node_modules component.json
	@printf "\n  ==> [Component :: install]"
	@./node_modules/.bin/component-install --dev

#
# Tests
# 

test: test-node test-browser

test-node: node_modules
	@printf "\n  ==> [Test :: Node.js]\n"
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter $(REPORTER) \
		--ui tdd \
		$(TESTS)

test-browser: chai.js has-phantomjs
	@printf "\n  ==> [Test :: Browser Build via PhantomJS]\n"
	@./node_modules/.bin/mocha-phantomjs \
		--reporter $(REPORTER) \
		./test/browser/index.html

test-component: build has-phantomjs
	@printf "\n  ==> [Test :: Component Build via PhantomJS]\n"
	@./node_modules/.bin/mocha-phantomjs \
		--reporter $(REPORTER) \
		./test/browser/component.html

test-cov: lib-cov 
	@CHAI_COV=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter html-cov \
		--ui tdd \
		$(TESTS) \
		> coverage.html

#
# Coverage
# 

lib-cov: clean-cov has-jscoverage
	@jscoverage lib lib-cov

#
# Clean up
# 

clean: clean-node clean-browser clean-components clean-cov

clean-node:
	@rm -rf node_modules

clean-browser:
	@rm -f chai.js

clean-components:
	@rm -rf build
	@rm -rf components

clean-cov:
	@rm -rf lib-cov
	@rm -f coverage.html

#
# Utils
#

has-phantomjs:
ifeq ($(shell which phantomjs),)
	$(error PhantomJS is not installed. Download from http://phantomjs.org or Homebrew)
endif

has-jscoverage:
ifeq ($(shell which jscoverage),)
	$(error jsCoverage is not installed. Download from https://github.com/visionmedia/node-jscoverage)
endif

#
# Instructions
#

.PHONY: all test test-node test-browser test-component test-cov clean clean-node clean-browser clean-components clean-cov has-phantomjs has-jscoverage 
