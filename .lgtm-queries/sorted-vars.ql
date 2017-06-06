/**
 * @name Incorrectly Ordered Variable Declaration
 * @description declarations should be declared in alphabetical order whenever possible. The exception is if a declaration requires a previous declaration.
 * @kind problem
 * @problem.severity warning
 */
import javascript

class LocalVariableDecl extends VarDeclStmt {

  LocalVariableDecl() {
  	// Only care about declarations which declare a single variable
   	count(this.getADecl()) = 1
   	// Exclude Imports
   	and not (this.getADecl().getInit().(CallExpr).getCallee().(VarAccess).getName() = "require")
  }

  string getName() {
    result = this.getADecl().getBindingPattern().getAVariable().getName()
  }

  LocalVariableDecl getImmediatelyPreceedingDeclaration() {
    exists(LocalVariableDecl decl, int i |
      result = decl and
      // The two variable declarations have the same parent
      decl.getParentStmt() = this.getParentStmt() and
      // decl is the statement immediately before this
      decl.getParentStmt().getChild(i) = decl and
      decl.getParentStmt().getChild(i + 1) = this
    )
  }

  /**
   * A "group" is considered to be a continuous list of variable declarations
   */
  LocalVariableDecl getAllPreceedingDeclarationsInGroup() {
    // Transitive Closure
    result = this.getImmediatelyPreceedingDeclaration+()
  }

  LocalVariableDecl getAUsedDeclaration() {
    exists(LocalVariableDecl decl |
      // decl is a preceeding declaration
      decl = this.getAllPreceedingDeclarationsInGroup() and
      // the variable declared by decl is used in the declaration of this
      this.getADecl().getInit().getAChild*() = decl.getADecl().getBindingPattern().getAVariable().getAnAccess() and
      result = decl
    )
  }

  /**
   * Get a declaration that should appear BEFORE this declaration.
   */
  LocalVariableDecl getAnIncorrectlyPlacedSucceedingDeclaration() {
    // this declaration appears before the result
    this = result.getAllPreceedingDeclarationsInGroup() and
    // this declaration is alphabetically AFTER the result
    this.getName() > result.getName() and
    // this declaration is not used by the result
    not(this = result.getAUsedDeclaration())
  }
}

from LocalVariableDecl incorrectlyPlacedDecl, LocalVariableDecl preceedingDecl
where
  incorrectlyPlacedDecl = preceedingDecl.getAnIncorrectlyPlacedSucceedingDeclaration()
  // Exclude this result if there is another declaration before preceedingDecl that also finds incorrectlyPlacedDecl
  and not exists(LocalVariableDecl earlierDecl |
    preceedingDecl != earlierDecl and
    incorrectlyPlacedDecl = earlierDecl.getAnIncorrectlyPlacedSucceedingDeclaration() and
    earlierDecl.getLocation().startsBefore(preceedingDecl.getLocation())
  )
select incorrectlyPlacedDecl, "The variable declaration for $@ should appear before the declaration for $@",
       incorrectlyPlacedDecl, incorrectlyPlacedDecl.getName(),
       preceedingDecl, preceedingDecl.getName()

