
TESTS = test/*.js
REPORTER = dot

#
# Browser Build
# 

all: chai.js

chai.js: node_modules lib/* components
	@printf "==> [Browser :: build]\n"
	@./node_modules/.bin/component-build -s chai -o .
	@mv build.js chai.js

#
# Node Module
#

node_modules: package.json
	@npm install

#
# Components
# 

build: components lib/*
	@printf "==> [Component :: build]\n"
	@./node_modules/.bin/component-build --dev

components: node_modules component.json
	@printf "==> [Component :: install]\n"
	@./node_modules/.bin/component-install --dev

#
# Tests
# 

test: test-node test-phantom

test-node: node_modules
	@printf "==> [Test :: Node.js]\n"
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter $(REPORTER) \
		$(TESTS)

test-cov: lib-cov 
	@CHAI_COV=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter html-cov \
		$(TESTS) \
		> coverage.html

test-phantom: build
	@printf "==> [Test :: Karma (PhantomJS)]\n"
	@./node_modules/karma/bin/karma start \
		--single-run --browsers PhantomJS

test-sauce: build
	@printf "==> [Test :: Karma (Sauce)]\n"
	@CHAI_TEST_ENV=sauce ./node_modules/karma/bin/karma start \
		--single-run

test-coveralls: lib-cov
	@CHAI_COV=1 NODE_ENV=test ./node_modules/.bin/mocha \
		--require ./test/bootstrap \
		--reporter mocha-lcov-reporter \
		$(TESTS) \
		| ./node_modules/coveralls/bin/coveralls.js
	
test-travisci: lib-cov
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@make test-node
	@make test-coveralls
	@make test-sauce

#
# Coverage
# 

lib-cov: 
	@rm -rf lib-cov
	@./node_modules/jscoverage/bin/jscoverage lib lib-cov

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
# Instructions
#

.PHONY: all 
.PHONY: test test-all test-node test-phantom test-sauce test-cov test-coveralls
.PHONY: clean clean-node clean-browser clean-components clean-cov 
