	.file	"test.cpp"
	.text
	.section	.text._ZNKSt5ctypeIcE8do_widenEc,"axG",@progbits,_ZNKSt5ctypeIcE8do_widenEc,comdat
	.align 2
	.p2align 4
	.weak	_ZNKSt5ctypeIcE8do_widenEc
	.type	_ZNKSt5ctypeIcE8do_widenEc, @function
_ZNKSt5ctypeIcE8do_widenEc:
.LFB3576:
	.cfi_startproc
	movl	%esi, %eax
	ret
	.cfi_endproc
.LFE3576:
	.size	_ZNKSt5ctypeIcE8do_widenEc, .-_ZNKSt5ctypeIcE8do_widenEc
	.text
	.p2align 4
	.globl	_Z8fittnessRKSt6vectorIiSaIiEE
	.type	_Z8fittnessRKSt6vectorIiSaIiEE, @function
_Z8fittnessRKSt6vectorIiSaIiEE:
.LFB3832:
	.cfi_startproc
	movq	(%rdi), %rcx
	movq	8(%rdi), %rax
	subq	%rcx, %rax
	movq	%rax, %rsi
	sarq	$2, %rsi
	cmpq	$7, %rax
	jbe	.L9
	leaq	-2(%rsi), %rax
	leaq	-1(%rsi), %rdi
	cmpq	$2, %rax
	jbe	.L10
	movq	%rdi, %rdx
	pxor	%xmm1, %xmm1
	pxor	%xmm4, %xmm4
	movq	%rcx, %rax
	shrq	$2, %rdx
	salq	$4, %rdx
	addq	%rcx, %rdx
	.p2align 4,,10
	.p2align 3
.L6:
	movdqu	4(%rax), %xmm0
	movdqu	(%rax), %xmm5
	addq	$16, %rax
	psubd	%xmm5, %xmm0
	movdqa	%xmm0, %xmm2
	psrad	$31, %xmm2
	pxor	%xmm2, %xmm0
	psubd	%xmm2, %xmm0
	movdqa	%xmm4, %xmm2
	pcmpgtd	%xmm0, %xmm2
	movdqa	%xmm0, %xmm3
	punpckldq	%xmm2, %xmm3
	punpckhdq	%xmm2, %xmm0
	paddq	%xmm3, %xmm1
	paddq	%xmm0, %xmm1
	cmpq	%rdx, %rax
	jne	.L6
	movdqa	%xmm1, %xmm0
	movq	%rdi, %rdx
	psrldq	$8, %xmm0
	andq	$-4, %rdx
	paddq	%xmm1, %xmm0
	leaq	1(%rdx), %r10
	movq	%xmm0, %rax
	leal	1(%rdx), %r8d
	cmpq	%rdi, %rdx
	je	.L12
.L5:
	leal	-1(%r8), %r9d
	movl	(%rcx,%r10,4), %edx
	movslq	%r9d, %r9
	subl	(%rcx,%r9,4), %edx
	leaq	0(,%r9,4), %rdi
	movl	%edx, %r9d
	sarl	$31, %r9d
	xorl	%r9d, %edx
	subl	%r9d, %edx
	movslq	%edx, %rdx
	addq	%rdx, %rax
	leal	1(%r8), %edx
	movslq	%edx, %rdx
	cmpq	%rsi, %rdx
	jnb	.L3
	movl	(%rcx,%rdx,4), %edx
	subl	4(%rcx,%rdi), %edx
	addl	$2, %r8d
	movl	%edx, %r9d
	movslq	%r8d, %r8
	sarl	$31, %r9d
	xorl	%r9d, %edx
	subl	%r9d, %edx
	movslq	%edx, %rdx
	addq	%rdx, %rax
	cmpq	%r8, %rsi
	jbe	.L3
	movl	(%rcx,%r8,4), %edx
	subl	8(%rcx,%rdi), %edx
	movl	%edx, %ecx
	sarl	$31, %ecx
	xorl	%ecx, %edx
	subl	%ecx, %edx
	movslq	%edx, %rdx
	addq	%rdx, %rax
	ret
	.p2align 4,,10
	.p2align 3
.L9:
	xorl	%eax, %eax
.L3:
	ret
	.p2align 4,,10
	.p2align 3
.L12:
	ret
.L10:
	movl	$1, %r8d
	xorl	%eax, %eax
	movl	$1, %r10d
	jmp	.L5
	.cfi_endproc
.LFE3832:
	.size	_Z8fittnessRKSt6vectorIiSaIiEE, .-_Z8fittnessRKSt6vectorIiSaIiEE
	.p2align 4
	.globl	_Z4initRSt6vectorIiSaIiEE
	.type	_Z4initRSt6vectorIiSaIiEE, @function
_Z4initRSt6vectorIiSaIiEE:
.LFB3833:
	.cfi_startproc
	movq	(%rdi), %rsi
	movq	8(%rdi), %rdx
	subq	%rsi, %rdx
	sarq	$2, %rdx
	je	.L13
	leaq	-1(%rdx), %rax
	cmpq	$2, %rax
	jbe	.L18
	movq	%rdx, %rcx
	movdqa	.LC0(%rip), %xmm0
	movdqa	.LC1(%rip), %xmm2
	movq	%rsi, %rax
	shrq	$2, %rcx
	salq	$4, %rcx
	addq	%rsi, %rcx
	.p2align 4,,10
	.p2align 3
.L16:
	movdqa	%xmm0, %xmm1
	addq	$16, %rax
	paddd	%xmm2, %xmm0
	movups	%xmm1, -16(%rax)
	cmpq	%rcx, %rax
	jne	.L16
	movq	%rdx, %rcx
	andq	$-4, %rcx
	movl	%ecx, %eax
	cmpq	%rcx, %rdx
	je	.L23
.L15:
	leal	1(%rax), %edi
	movl	%eax, (%rsi,%rcx,4)
	movslq	%edi, %rcx
	cmpq	%rcx, %rdx
	jbe	.L13
	addl	$2, %eax
	movl	%edi, (%rsi,%rcx,4)
	movslq	%eax, %rcx
	cmpq	%rcx, %rdx
	jbe	.L13
	movl	%eax, (%rsi,%rcx,4)
.L13:
	ret
	.p2align 4,,10
	.p2align 3
.L23:
	ret
.L18:
	xorl	%eax, %eax
	xorl	%ecx, %ecx
	jmp	.L15
	.cfi_endproc
.LFE3833:
	.size	_Z4initRSt6vectorIiSaIiEE, .-_Z4initRSt6vectorIiSaIiEE
	.section	.text._ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED2Ev,"axG",@progbits,_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED5Ev,comdat
	.align 2
	.p2align 4
	.weak	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED2Ev
	.type	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED2Ev, @function
_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED2Ev:
.LFB3836:
	.cfi_startproc
	pushq	%r12
	.cfi_def_cfa_offset 16
	.cfi_offset 12, -16
	pushq	%rbp
	.cfi_def_cfa_offset 24
	.cfi_offset 6, -24
	pushq	%rbx
	.cfi_def_cfa_offset 32
	.cfi_offset 3, -32
	movq	%rdi, %rbx
	movq	112(%rdi), %rdi
	testq	%rdi, %rdi
	je	.L25
	call	_ZdlPv@PLT
.L25:
	movq	80(%rbx), %rdi
	testq	%rdi, %rdi
	je	.L26
	call	_ZdlPv@PLT
.L26:
	movq	64(%rbx), %r12
	movq	56(%rbx), %rbp
	cmpq	%rbp, %r12
	je	.L27
	.p2align 4,,10
	.p2align 3
.L31:
	movq	0(%rbp), %rdi
	testq	%rdi, %rdi
	je	.L28
	call	_ZdlPv@PLT
	addq	$24, %rbp
	cmpq	%rbp, %r12
	jne	.L31
.L29:
	movq	56(%rbx), %rbp
.L27:
	testq	%rbp, %rbp
	je	.L32
	movq	%rbp, %rdi
	call	_ZdlPv@PLT
.L32:
	movq	40(%rbx), %r12
	movq	32(%rbx), %rbp
	cmpq	%rbp, %r12
	je	.L33
	.p2align 4,,10
	.p2align 3
.L37:
	movq	0(%rbp), %rdi
	testq	%rdi, %rdi
	je	.L34
	call	_ZdlPv@PLT
	addq	$24, %rbp
	cmpq	%rbp, %r12
	jne	.L37
.L35:
	movq	32(%rbx), %rbp
.L33:
	testq	%rbp, %rbp
	je	.L24
	popq	%rbx
	.cfi_remember_state
	.cfi_def_cfa_offset 24
	movq	%rbp, %rdi
	popq	%rbp
	.cfi_def_cfa_offset 16
	popq	%r12
	.cfi_def_cfa_offset 8
	jmp	_ZdlPv@PLT
	.p2align 4,,10
	.p2align 3
.L34:
	.cfi_restore_state
	addq	$24, %rbp
	cmpq	%rbp, %r12
	jne	.L37
	jmp	.L35
	.p2align 4,,10
	.p2align 3
.L28:
	addq	$24, %rbp
	cmpq	%rbp, %r12
	jne	.L31
	jmp	.L29
	.p2align 4,,10
	.p2align 3
.L24:
	popq	%rbx
	.cfi_def_cfa_offset 24
	popq	%rbp
	.cfi_def_cfa_offset 16
	popq	%r12
	.cfi_def_cfa_offset 8
	ret
	.cfi_endproc
.LFE3836:
	.size	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED2Ev, .-_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED2Ev
	.weak	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED1Ev
	.set	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED1Ev,_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED2Ev
	.section	.text._ZNSt6vectorIS_IiSaIiEESaIS1_EED2Ev,"axG",@progbits,_ZNSt6vectorIS_IiSaIiEESaIS1_EED5Ev,comdat
	.align 2
	.p2align 4
	.weak	_ZNSt6vectorIS_IiSaIiEESaIS1_EED2Ev
	.type	_ZNSt6vectorIS_IiSaIiEESaIS1_EED2Ev, @function
_ZNSt6vectorIS_IiSaIiEESaIS1_EED2Ev:
.LFB4123:
	.cfi_startproc
	pushq	%r12
	.cfi_def_cfa_offset 16
	.cfi_offset 12, -16
	movq	%rdi, %r12
	pushq	%rbp
	.cfi_def_cfa_offset 24
	.cfi_offset 6, -24
	pushq	%rbx
	.cfi_def_cfa_offset 32
	.cfi_offset 3, -32
	movq	8(%rdi), %rbx
	movq	(%rdi), %rbp
	cmpq	%rbp, %rbx
	je	.L50
	.p2align 4,,10
	.p2align 3
.L54:
	movq	0(%rbp), %rdi
	testq	%rdi, %rdi
	je	.L51
	call	_ZdlPv@PLT
	addq	$24, %rbp
	cmpq	%rbp, %rbx
	jne	.L54
.L52:
	movq	(%r12), %rbp
.L50:
	testq	%rbp, %rbp
	je	.L49
	popq	%rbx
	.cfi_remember_state
	.cfi_def_cfa_offset 24
	movq	%rbp, %rdi
	popq	%rbp
	.cfi_def_cfa_offset 16
	popq	%r12
	.cfi_def_cfa_offset 8
	jmp	_ZdlPv@PLT
	.p2align 4,,10
	.p2align 3
.L51:
	.cfi_restore_state
	addq	$24, %rbp
	cmpq	%rbp, %rbx
	jne	.L54
	jmp	.L52
	.p2align 4,,10
	.p2align 3
.L49:
	popq	%rbx
	.cfi_def_cfa_offset 24
	popq	%rbp
	.cfi_def_cfa_offset 16
	popq	%r12
	.cfi_def_cfa_offset 8
	ret
	.cfi_endproc
.LFE4123:
	.size	_ZNSt6vectorIS_IiSaIiEESaIS1_EED2Ev, .-_ZNSt6vectorIS_IiSaIiEESaIS1_EED2Ev
	.weak	_ZNSt6vectorIS_IiSaIiEESaIS1_EED1Ev
	.set	_ZNSt6vectorIS_IiSaIiEESaIS1_EED1Ev,_ZNSt6vectorIS_IiSaIiEESaIS1_EED2Ev
	.section	.text._ZNSt6vectorIiSaIiEEaSERKS1_,"axG",@progbits,_ZNSt6vectorIiSaIiEEaSERKS1_,comdat
	.align 2
	.p2align 4
	.weak	_ZNSt6vectorIiSaIiEEaSERKS1_
	.type	_ZNSt6vectorIiSaIiEEaSERKS1_, @function
_ZNSt6vectorIiSaIiEEaSERKS1_:
.LFB4308:
	.cfi_startproc
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	movq	%rdi, %r12
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	subq	$8, %rsp
	.cfi_def_cfa_offset 64
	cmpq	%rdi, %rsi
	je	.L58
	movq	8(%rsi), %r15
	movq	(%rsi), %r13
	movq	%rsi, %rbx
	movq	(%rdi), %r14
	movq	16(%rdi), %rax
	movq	%r15, %rbp
	subq	%r13, %rbp
	subq	%r14, %rax
	movq	%rbp, %rcx
	sarq	$2, %rax
	sarq	$2, %rcx
	cmpq	%rax, %rcx
	ja	.L78
	movq	8(%rdi), %rdi
	movq	%rdi, %rsi
	subq	%r14, %rsi
	movq	%rsi, %rax
	sarq	$2, %rax
	cmpq	%rax, %rcx
	ja	.L66
	cmpq	%r15, %r13
	je	.L77
	movq	%rbp, %rdx
	movq	%r13, %rsi
	movq	%r14, %rdi
	call	memmove@PLT
	addq	(%r12), %rbp
	movq	%rbp, 8(%r12)
.L58:
	addq	$8, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	movq	%r12, %rax
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L78:
	.cfi_restore_state
	xorl	%ebx, %ebx
	testq	%rcx, %rcx
	je	.L61
	movabsq	$2305843009213693951, %rax
	cmpq	%rax, %rcx
	ja	.L79
	movq	%rbp, %rdi
	call	_Znwm@PLT
	movq	(%r12), %r14
	movq	%rax, %rbx
.L61:
	cmpq	%r15, %r13
	je	.L63
	movq	%rbp, %rdx
	movq	%r13, %rsi
	movq	%rbx, %rdi
	call	memcpy@PLT
.L63:
	testq	%r14, %r14
	je	.L64
	movq	%r14, %rdi
	call	_ZdlPv@PLT
.L64:
	addq	%rbx, %rbp
	movq	%rbx, (%r12)
	movq	%rbp, 16(%r12)
	jmp	.L65
	.p2align 4,,10
	.p2align 3
.L66:
	movq	%rsi, %rdx
	testq	%rsi, %rsi
	je	.L68
	movq	%r14, %rdi
	movq	%r13, %rsi
	call	memmove@PLT
	movq	8(%r12), %rdi
	movq	(%r12), %r14
	movq	8(%rbx), %r15
	movq	(%rbx), %r13
	movq	%rdi, %rdx
	subq	%r14, %rdx
.L68:
	leaq	0(%r13,%rdx), %rsi
	cmpq	%r15, %rsi
	jne	.L69
.L77:
	addq	%r14, %rbp
.L65:
	movq	%rbp, 8(%r12)
	jmp	.L58
	.p2align 4,,10
	.p2align 3
.L69:
	movq	%r15, %rdx
	subq	%rsi, %rdx
	call	memmove@PLT
	addq	(%r12), %rbp
	jmp	.L65
.L79:
	call	_ZSt17__throw_bad_allocv@PLT
	.cfi_endproc
.LFE4308:
	.size	_ZNSt6vectorIiSaIiEEaSERKS1_, .-_ZNSt6vectorIiSaIiEEaSERKS1_
	.section	.rodata._ZNSt6vectorIiSaIiEE17_M_default_appendEm.str1.1,"aMS",@progbits,1
.LC2:
	.string	"vector::_M_default_append"
	.section	.text._ZNSt6vectorIiSaIiEE17_M_default_appendEm,"axG",@progbits,_ZNSt6vectorIiSaIiEE17_M_default_appendEm,comdat
	.align 2
	.p2align 4
	.weak	_ZNSt6vectorIiSaIiEE17_M_default_appendEm
	.type	_ZNSt6vectorIiSaIiEE17_M_default_appendEm, @function
_ZNSt6vectorIiSaIiEE17_M_default_appendEm:
.LFB4396:
	.cfi_startproc
	testq	%rsi, %rsi
	je	.L99
	movabsq	$2305843009213693951, %rdx
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	movq	%rdi, %rbp
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	movq	%rsi, %rbx
	movq	%rdx, %rsi
	subq	$8, %rsp
	.cfi_def_cfa_offset 64
	movq	8(%rdi), %rcx
	movq	16(%rdi), %rax
	movq	%rcx, %r15
	subq	(%rdi), %r15
	subq	%rcx, %rax
	movq	%r15, %r12
	sarq	$2, %rax
	sarq	$2, %r12
	subq	%r12, %rsi
	cmpq	%rax, %rbx
	ja	.L82
	salq	$2, %rbx
	movq	%rcx, %rdi
	xorl	%esi, %esi
	movq	%rbx, %rdx
	call	memset@PLT
	movq	%rax, %rcx
	addq	%rbx, %rcx
	movq	%rcx, 8(%rbp)
	addq	$8, %rsp
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L99:
	.cfi_restore 3
	.cfi_restore 6
	.cfi_restore 12
	.cfi_restore 13
	.cfi_restore 14
	.cfi_restore 15
	ret
	.p2align 4,,10
	.p2align 3
.L82:
	.cfi_def_cfa_offset 64
	.cfi_offset 3, -56
	.cfi_offset 6, -48
	.cfi_offset 12, -40
	.cfi_offset 13, -32
	.cfi_offset 14, -24
	.cfi_offset 15, -16
	cmpq	%rbx, %rsi
	jb	.L102
	cmpq	%r12, %rbx
	movq	%r12, %r13
	cmovnb	%rbx, %r13
	addq	%r12, %r13
	cmpq	%rdx, %r13
	cmova	%rdx, %r13
	salq	$2, %r13
	movq	%r13, %rdi
	call	_Znwm@PLT
	leaq	0(,%rbx,4), %rdx
	xorl	%esi, %esi
	leaq	(%rax,%r15), %rdi
	movq	%rax, %r14
	call	memset@PLT
	movq	0(%rbp), %r15
	movq	8(%rbp), %rdx
	subq	%r15, %rdx
	testq	%rdx, %rdx
	jg	.L103
	testq	%r15, %r15
	jne	.L86
.L87:
	addq	%r12, %rbx
	addq	%r14, %r13
	movq	%r14, 0(%rbp)
	leaq	(%r14,%rbx,4), %rax
	movq	%r13, 16(%rbp)
	movq	%rax, 8(%rbp)
	addq	$8, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L103:
	.cfi_restore_state
	movq	%r15, %rsi
	movq	%r14, %rdi
	call	memmove@PLT
.L86:
	movq	%r15, %rdi
	call	_ZdlPv@PLT
	jmp	.L87
.L102:
	leaq	.LC2(%rip), %rdi
	call	_ZSt20__throw_length_errorPKc@PLT
	.cfi_endproc
.LFE4396:
	.size	_ZNSt6vectorIiSaIiEE17_M_default_appendEm, .-_ZNSt6vectorIiSaIiEE17_M_default_appendEm
	.section	.text._ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm,"axG",@progbits,_ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm,comdat
	.align 2
	.p2align 4
	.weak	_ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm
	.type	_ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm, @function
_ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm:
.LFB4401:
	.cfi_startproc
	testq	%rsi, %rsi
	je	.L154
	movabsq	$-6148914691236517205, %rdx
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	movabsq	$384307168202282325, %rcx
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	movq	%rdi, %rbp
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	movq	%rsi, %rbx
	subq	$8, %rsp
	.cfi_def_cfa_offset 64
	movq	8(%rdi), %rsi
	movq	16(%rbp), %rax
	movq	%rsi, %r13
	subq	(%rdi), %r13
	subq	%rsi, %rax
	movq	%rcx, %rdi
	movq	%r13, %r12
	sarq	$3, %rax
	sarq	$3, %r12
	imulq	%rdx, %rax
	imulq	%rdx, %r12
	subq	%r12, %rdi
	cmpq	%rax, %rbx
	ja	.L106
	leaq	-1(%rbx), %rax
	cmpq	$2, %rax
	jbe	.L126
	leaq	-2(%rbx), %rcx
	movq	%rsi, %rax
	pxor	%xmm0, %xmm0
	xorl	%edx, %edx
	shrq	%rcx
	addq	$1, %rcx
	.p2align 4,,10
	.p2align 3
.L108:
	addq	$1, %rdx
	movups	%xmm0, (%rax)
	addq	$48, %rax
	movups	%xmm0, -32(%rax)
	movups	%xmm0, -16(%rax)
	cmpq	%rdx, %rcx
	ja	.L108
	leaq	(%rcx,%rcx), %rdx
	movq	%rbx, %rdi
	leaq	(%rdx,%rcx,4), %rax
	subq	%rdx, %rdi
	leaq	(%rsi,%rax,8), %rax
	cmpq	%rdx, %rbx
	je	.L109
.L107:
	pxor	%xmm0, %xmm0
	movq	$0, 16(%rax)
	movups	%xmm0, (%rax)
	cmpq	$1, %rdi
	je	.L109
	movq	$0, 40(%rax)
	movups	%xmm0, 24(%rax)
	cmpq	$2, %rdi
	je	.L109
	movq	$0, 64(%rax)
	movups	%xmm0, 48(%rax)
.L109:
	leaq	(%rbx,%rbx,2), %rax
	leaq	(%rsi,%rax,8), %rax
	movq	%rax, 8(%rbp)
	addq	$8, %rsp
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L154:
	.cfi_restore 3
	.cfi_restore 6
	.cfi_restore 12
	.cfi_restore 13
	.cfi_restore 14
	.cfi_restore 15
	ret
	.p2align 4,,10
	.p2align 3
.L106:
	.cfi_def_cfa_offset 64
	.cfi_offset 3, -56
	.cfi_offset 6, -48
	.cfi_offset 12, -40
	.cfi_offset 13, -32
	.cfi_offset 14, -24
	.cfi_offset 15, -16
	cmpq	%rbx, %rdi
	jb	.L157
	cmpq	%r12, %rbx
	movq	%r12, %rax
	cmovnb	%rbx, %rax
	addq	%r12, %rax
	cmpq	%rcx, %rax
	cmovbe	%rax, %rcx
	leaq	(%rcx,%rcx,2), %r14
	salq	$3, %r14
	movq	%r14, %rdi
	call	_Znwm@PLT
	movq	%rax, %r15
	leaq	(%rax,%r13), %rsi
	leaq	-1(%rbx), %rax
	cmpq	$2, %rax
	jbe	.L158
	leaq	-2(%rbx), %rax
	movq	%rsi, %rdx
	pxor	%xmm0, %xmm0
	xorl	%ecx, %ecx
	shrq	%rax
	addq	$1, %rax
	.p2align 4,,10
	.p2align 3
.L115:
	addq	$1, %rcx
	movups	%xmm0, (%rdx)
	addq	$48, %rdx
	movups	%xmm0, -32(%rdx)
	movups	%xmm0, -16(%rdx)
	cmpq	%rcx, %rax
	ja	.L115
	leaq	(%rax,%rax), %rdx
	movq	%rbx, %rcx
	leaq	(%rdx,%rax,4), %rax
	subq	%rdx, %rcx
	leaq	(%rsi,%rax,8), %rsi
	cmpq	%rdx, %rbx
	je	.L113
.L125:
	pxor	%xmm0, %xmm0
	movq	$0, 16(%rsi)
	movups	%xmm0, (%rsi)
	cmpq	$1, %rcx
	je	.L113
	movq	$0, 40(%rsi)
	movups	%xmm0, 24(%rsi)
	cmpq	$2, %rcx
	je	.L113
	movq	$0, 64(%rsi)
	movups	%xmm0, 48(%rsi)
.L113:
	movq	8(%rbp), %rcx
	movq	0(%rbp), %rdi
	cmpq	%rdi, %rcx
	je	.L122
	leaq	-24(%rcx), %rax
	movq	%rdi, %rdx
	movabsq	$768614336404564651, %rsi
	subq	%rdi, %rax
	shrq	$3, %rax
	imulq	%rsi, %rax
	leaq	47(%rdi), %rsi
	subq	%r15, %rsi
	cmpq	$94, %rsi
	jbe	.L128
	movabsq	$2305843009213693950, %rsi
	testq	%rsi, %rax
	je	.L128
	movabsq	$2305843009213693951, %rcx
	andq	%rcx, %rax
	movq	%r15, %rcx
	addq	$1, %rax
	movq	%rax, %rsi
	shrq	%rsi
	leaq	(%rsi,%rsi,2), %rsi
	salq	$4, %rsi
	addq	%rdi, %rsi
	.p2align 4,,10
	.p2align 3
.L121:
	movdqu	16(%rdx), %xmm1
	movdqu	(%rdx), %xmm3
	addq	$48, %rdx
	addq	$48, %rcx
	movdqu	-16(%rdx), %xmm0
	movups	%xmm3, -48(%rcx)
	movups	%xmm1, -32(%rcx)
	movups	%xmm0, -16(%rcx)
	cmpq	%rsi, %rdx
	jne	.L121
	movq	%rax, %rsi
	andq	$-2, %rsi
	leaq	(%rsi,%rsi,2), %rdx
	salq	$3, %rdx
	leaq	(%rdi,%rdx), %rcx
	addq	%r15, %rdx
	cmpq	%rsi, %rax
	je	.L122
	movq	16(%rcx), %rax
	movdqu	(%rcx), %xmm2
	movq	%rax, 16(%rdx)
	movups	%xmm2, (%rdx)
.L122:
	testq	%rdi, %rdi
	je	.L118
	call	_ZdlPv@PLT
.L118:
	addq	%r12, %rbx
	addq	%r15, %r14
	movq	%r15, 0(%rbp)
	leaq	(%rbx,%rbx,2), %rax
	movq	%r14, 16(%rbp)
	leaq	(%r15,%rax,8), %rax
	movq	%rax, 8(%rbp)
	addq	$8, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L126:
	.cfi_restore_state
	movq	%rsi, %rax
	movq	%rbx, %rdi
	jmp	.L107
.L128:
	movq	%r15, %rdx
	movq	%rdi, %rax
	.p2align 4,,10
	.p2align 3
.L119:
	movdqu	(%rax), %xmm4
	addq	$24, %rax
	addq	$24, %rdx
	movups	%xmm4, -24(%rdx)
	movq	-8(%rax), %rsi
	movq	%rsi, -8(%rdx)
	cmpq	%rax, %rcx
	jne	.L119
	jmp	.L122
.L158:
	movq	%rbx, %rcx
	jmp	.L125
.L157:
	leaq	.LC2(%rip), %rdi
	call	_ZSt20__throw_length_errorPKc@PLT
	.cfi_endproc
.LFE4401:
	.size	_ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm, .-_ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm
	.section	.text._ZNSt6vectorIlSaIlEE17_M_default_appendEm,"axG",@progbits,_ZNSt6vectorIlSaIlEE17_M_default_appendEm,comdat
	.align 2
	.p2align 4
	.weak	_ZNSt6vectorIlSaIlEE17_M_default_appendEm
	.type	_ZNSt6vectorIlSaIlEE17_M_default_appendEm, @function
_ZNSt6vectorIlSaIlEE17_M_default_appendEm:
.LFB4410:
	.cfi_startproc
	testq	%rsi, %rsi
	je	.L178
	movabsq	$1152921504606846975, %rdx
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	movq	%rdi, %rbp
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	movq	%rsi, %rbx
	movq	%rdx, %rsi
	subq	$8, %rsp
	.cfi_def_cfa_offset 64
	movq	8(%rdi), %rcx
	movq	16(%rdi), %rax
	movq	%rcx, %r15
	subq	(%rdi), %r15
	subq	%rcx, %rax
	movq	%r15, %r12
	sarq	$3, %rax
	sarq	$3, %r12
	subq	%r12, %rsi
	cmpq	%rax, %rbx
	ja	.L161
	salq	$3, %rbx
	movq	%rcx, %rdi
	xorl	%esi, %esi
	movq	%rbx, %rdx
	call	memset@PLT
	movq	%rax, %rcx
	addq	%rbx, %rcx
	movq	%rcx, 8(%rbp)
	addq	$8, %rsp
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L178:
	.cfi_restore 3
	.cfi_restore 6
	.cfi_restore 12
	.cfi_restore 13
	.cfi_restore 14
	.cfi_restore 15
	ret
	.p2align 4,,10
	.p2align 3
.L161:
	.cfi_def_cfa_offset 64
	.cfi_offset 3, -56
	.cfi_offset 6, -48
	.cfi_offset 12, -40
	.cfi_offset 13, -32
	.cfi_offset 14, -24
	.cfi_offset 15, -16
	cmpq	%rbx, %rsi
	jb	.L181
	cmpq	%r12, %rbx
	movq	%r12, %r13
	cmovnb	%rbx, %r13
	addq	%r12, %r13
	cmpq	%rdx, %r13
	cmova	%rdx, %r13
	salq	$3, %r13
	movq	%r13, %rdi
	call	_Znwm@PLT
	leaq	0(,%rbx,8), %rdx
	xorl	%esi, %esi
	leaq	(%rax,%r15), %rdi
	movq	%rax, %r14
	call	memset@PLT
	movq	0(%rbp), %r15
	movq	8(%rbp), %rdx
	subq	%r15, %rdx
	testq	%rdx, %rdx
	jg	.L182
	testq	%r15, %r15
	jne	.L165
.L166:
	addq	%r12, %rbx
	addq	%r14, %r13
	movq	%r14, 0(%rbp)
	leaq	(%r14,%rbx,8), %rax
	movq	%r13, 16(%rbp)
	movq	%rax, 8(%rbp)
	addq	$8, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L182:
	.cfi_restore_state
	movq	%r15, %rsi
	movq	%r14, %rdi
	call	memmove@PLT
.L165:
	movq	%r15, %rdi
	call	_ZdlPv@PLT
	jmp	.L166
.L181:
	leaq	.LC2(%rip), %rdi
	call	_ZSt20__throw_length_errorPKc@PLT
	.cfi_endproc
.LFE4410:
	.size	_ZNSt6vectorIlSaIlEE17_M_default_appendEm, .-_ZNSt6vectorIlSaIlEE17_M_default_appendEm
	.section	.text._ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv,"axG",@progbits,_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv,comdat
	.align 2
	.p2align 4
	.weak	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv
	.type	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv, @function
_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv:
.LFB4557:
	.cfi_startproc
	movq	4992(%rdi), %rax
	leaq	1(%rax), %rdx
	cmpq	$623, %rax
	ja	.L202
.L185:
	movq	(%rdi,%rax,8), %rax
	movq	%rdx, 4992(%rdi)
	movq	%rax, %rcx
	shrq	$11, %rcx
	movl	%ecx, %edx
	xorq	%rax, %rdx
	movq	%rdx, %rax
	salq	$7, %rax
	andl	$2636928640, %eax
	xorq	%rax, %rdx
	movq	%rdx, %rax
	salq	$15, %rax
	andl	$4022730752, %eax
	xorq	%rdx, %rax
	movq	%rax, %rdx
	shrq	$18, %rdx
	xorq	%rdx, %rax
	ret
	.p2align 4,,10
	.p2align 3
.L202:
	movq	(%rdi), %r8
	movq	%rdi, %rax
	leaq	1816(%rdi), %r10
	movq	%rdi, %rdx
	movl	$2567483615, %r9d
	.p2align 4,,10
	.p2align 3
.L187:
	movq	%r8, %rcx
	movq	8(%rdx), %r8
	andq	$-2147483648, %rcx
	movq	%r8, %rsi
	andl	$2147483647, %esi
	orq	%rcx, %rsi
	movq	%rsi, %rcx
	shrq	%rcx
	xorq	3176(%rdx), %rcx
	andl	$1, %esi
	je	.L186
	xorq	%r9, %rcx
.L186:
	movq	%rcx, (%rdx)
	addq	$8, %rdx
	cmpq	%r10, %rdx
	jne	.L187
	movq	1816(%rdi), %rsi
	leaq	3168(%rdi), %r9
	movl	$2567483615, %r8d
	.p2align 4,,10
	.p2align 3
.L189:
	andq	$-2147483648, %rsi
	movq	%rsi, %rdx
	movq	1824(%rax), %rsi
	movq	%rsi, %rcx
	andl	$2147483647, %ecx
	orq	%rdx, %rcx
	movq	%rcx, %rdx
	shrq	%rdx
	xorq	(%rax), %rdx
	andl	$1, %ecx
	je	.L188
	xorq	%r8, %rdx
.L188:
	movq	%rdx, 1816(%rax)
	addq	$8, %rax
	cmpq	%r9, %rax
	jne	.L189
	movq	4984(%rdi), %rax
	movq	(%rdi), %rdx
	andq	$-2147483648, %rax
	andl	$2147483647, %edx
	orq	%rdx, %rax
	movq	%rax, %rdx
	shrq	%rdx
	xorq	3168(%rdi), %rdx
	testb	$1, %al
	je	.L190
	movl	$2567483615, %eax
	xorq	%rax, %rdx
.L190:
	movq	%rdx, 4984(%rdi)
	xorl	%eax, %eax
	movl	$1, %edx
	jmp	.L185
	.cfi_endproc
.LFE4557:
	.size	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv, .-_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv
	.section	.text._ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE,"axG",@progbits,_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE,comdat
	.align 2
	.p2align 4
	.weak	_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE
	.type	_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE, @function
_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE:
.LFB4449:
	.cfi_startproc
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	movq	%rsi, %r15
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	movq	%rdx, %rbp
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	subq	$56, %rsp
	.cfi_def_cfa_offset 112
	movq	8(%rdx), %r14
	subq	(%rdx), %r14
	movq	%fs:40, %rax
	movq	%rax, 40(%rsp)
	xorl	%eax, %eax
	movl	$4294967294, %eax
	cmpq	%rax, %r14
	ja	.L204
	addq	$1, %r14
	addq	$1, %rax
	xorl	%edx, %edx
	divq	%r14
	imulq	%rax, %r14
	movq	%rax, %rbx
	.p2align 4,,10
	.p2align 3
.L205:
	movq	%r15, %rdi
	call	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv
	cmpq	%rax, %r14
	jbe	.L205
	xorl	%edx, %edx
	divq	%rbx
.L206:
	addq	0(%rbp), %rax
	movq	40(%rsp), %rcx
	xorq	%fs:40, %rcx
	jne	.L219
	addq	$56, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L204:
	.cfi_restore_state
	movl	$4294967295, %eax
	cmpq	%rax, %r14
	je	.L207
	movq	%r14, %rax
	movq	%rdi, %r13
	leaq	16(%rsp), %r12
	shrq	$32, %rax
	movq	%rax, 8(%rsp)
.L211:
	movq	8(%rsp), %rax
	movq	%r12, %rdx
	movq	%r15, %rsi
	movq	%r13, %rdi
	movq	$0, 16(%rsp)
	movq	%rax, 24(%rsp)
	call	_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE
	movq	%r15, %rdi
	movq	%rax, %rbx
	call	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv
	xorl	%edx, %edx
	movq	%rax, %r8
	movq	%rbx, %rax
	salq	$32, %rax
	addq	%r8, %rax
	setc	%dl
	cmpq	%rax, %r14
	jb	.L211
	testq	%rdx, %rdx
	jne	.L211
	jmp	.L206
	.p2align 4,,10
	.p2align 3
.L207:
	movq	%rsi, %rdi
	call	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv
	jmp	.L206
.L219:
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE4449:
	.size	_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE, .-_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE
	.section	.text._ZSt7shuffleIN9__gnu_cxx17__normal_iteratorIPiSt6vectorIiSaIiEEEERSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEvT_SA_OT0_,"axG",@progbits,_ZSt7shuffleIN9__gnu_cxx17__normal_iteratorIPiSt6vectorIiSaIiEEEERSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEvT_SA_OT0_,comdat
	.p2align 4
	.weak	_ZSt7shuffleIN9__gnu_cxx17__normal_iteratorIPiSt6vectorIiSaIiEEEERSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEvT_SA_OT0_
	.type	_ZSt7shuffleIN9__gnu_cxx17__normal_iteratorIPiSt6vectorIiSaIiEEEERSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEvT_SA_OT0_, @function
_ZSt7shuffleIN9__gnu_cxx17__normal_iteratorIPiSt6vectorIiSaIiEEEERSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEvT_SA_OT0_:
.LFB4311:
	.cfi_startproc
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	subq	$56, %rsp
	.cfi_def_cfa_offset 112
	movq	%fs:40, %rax
	movq	%rax, 40(%rsp)
	xorl	%eax, %eax
	cmpq	%rdi, %rsi
	je	.L220
	movq	%rsi, %rcx
	movq	%rdx, %r12
	movl	$4294967295, %eax
	xorl	%edx, %edx
	subq	%rdi, %rcx
	movq	%rdi, %r13
	leaq	4(%rdi), %rbx
	movq	%rsi, %rbp
	sarq	$2, %rcx
	divq	%rcx
	cmpq	%rcx, %rax
	jnb	.L230
	movdqa	.LC4(%rip), %xmm0
	movaps	%xmm0, (%rsp)
	cmpq	%rsi, %rbx
	je	.L220
	leaq	16(%rsp), %r14
	movq	%rsp, %r15
	.p2align 4,,10
	.p2align 3
.L225:
	movq	%rbx, %rax
	movq	%r14, %rdx
	movq	%r12, %rsi
	movq	%r15, %rdi
	movq	$0, 16(%rsp)
	subq	%r13, %rax
	addq	$4, %rbx
	sarq	$2, %rax
	movq	%rax, 24(%rsp)
	call	_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE
	movl	-4(%rbx), %edx
	leaq	0(%r13,%rax,4), %rax
	movl	(%rax), %ecx
	movl	%ecx, -4(%rbx)
	movl	%edx, (%rax)
	cmpq	%rbx, %rbp
	jne	.L225
.L220:
	movq	40(%rsp), %rax
	xorq	%fs:40, %rax
	jne	.L231
	addq	$56, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L230:
	.cfi_restore_state
	andl	$1, %ecx
	je	.L232
.L223:
	cmpq	%rbx, %rbp
	je	.L220
	leaq	16(%rsp), %r14
	.p2align 4,,10
	.p2align 3
.L224:
	movq	%rbx, %rax
	movq	%r14, %rdx
	movq	%r12, %rsi
	movq	%r14, %rdi
	movq	$0, 16(%rsp)
	subq	%r13, %rax
	addq	$8, %rbx
	sarq	$2, %rax
	leaq	2(%rax), %r15
	addq	$1, %rax
	imulq	%r15, %rax
	subq	$1, %rax
	movq	%rax, 24(%rsp)
	call	_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE
	xorl	%edx, %edx
	movl	-8(%rbx), %ecx
	divq	%r15
	leaq	0(%r13,%rax,4), %rax
	movl	(%rax), %esi
	movl	%esi, -8(%rbx)
	movl	%ecx, (%rax)
	leaq	0(%r13,%rdx,4), %rax
	movl	-4(%rbx), %edx
	movl	(%rax), %ecx
	movl	%ecx, -4(%rbx)
	movl	%edx, (%rax)
	cmpq	%rbx, %rbp
	jne	.L224
	jmp	.L220
	.p2align 4,,10
	.p2align 3
.L232:
	movdqa	.LC3(%rip), %xmm0
	leaq	16(%rsp), %r14
	movq	%r12, %rsi
	leaq	8(%r13), %rbx
	movq	%r14, %rdx
	movq	%r14, %rdi
	movaps	%xmm0, 16(%rsp)
	call	_ZNSt24uniform_int_distributionImEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEEmRT_RKNS0_10param_typeE
	movl	4(%r13), %edx
	leaq	0(%r13,%rax,4), %rax
	movl	(%rax), %ecx
	movl	%ecx, 4(%r13)
	movl	%edx, (%rax)
	jmp	.L223
.L231:
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE4311:
	.size	_ZSt7shuffleIN9__gnu_cxx17__normal_iteratorIPiSt6vectorIiSaIiEEEERSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEvT_SA_OT0_, .-_ZSt7shuffleIN9__gnu_cxx17__normal_iteratorIPiSt6vectorIiSaIiEEEERSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEvT_SA_OT0_
	.section	.text._ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEE10initializeIXadL_Z4initRS2_EEEEvv,"axG",@progbits,_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEE10initializeIXadL_Z4initRS2_EEEEvv,comdat
	.align 2
	.p2align 4
	.weak	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEE10initializeIXadL_Z4initRS2_EEEEvv
	.type	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEE10initializeIXadL_Z4initRS2_EEEEvv, @function
_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEE10initializeIXadL_Z4initRS2_EEEEvv:
.LFB4131:
	.cfi_startproc
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	movq	%rdi, %r14
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	subq	$24, %rsp
	.cfi_def_cfa_offset 80
	movq	88(%r14), %r9
	movq	80(%rdi), %rdi
	movq	%r9, %r8
	subq	%rdi, %r8
	sarq	$2, %r8
	je	.L234
	leaq	-1(%r8), %r10
	cmpq	$2, %r10
	jbe	.L265
	movq	%r8, %rdx
	movdqa	.LC0(%rip), %xmm0
	movdqa	.LC1(%rip), %xmm2
	movq	%rdi, %rax
	shrq	$2, %rdx
	salq	$4, %rdx
	addq	%rdi, %rdx
	.p2align 4,,10
	.p2align 3
.L236:
	movdqa	%xmm0, %xmm1
	addq	$16, %rax
	paddd	%xmm2, %xmm0
	movups	%xmm1, -16(%rax)
	cmpq	%rdx, %rax
	jne	.L236
	movq	%r8, %rdx
	andq	$-4, %rdx
	movl	%edx, %eax
	cmpq	%r8, %rdx
	je	.L237
.L235:
	leal	1(%rax), %esi
	movl	%eax, (%rdi,%rdx,4)
	movslq	%esi, %rdx
	cmpq	%rdx, %r8
	jbe	.L237
	addl	$2, %eax
	movl	%esi, (%rdi,%rdx,4)
	movslq	%eax, %rdx
	cmpq	%r8, %rdx
	jnb	.L238
	movl	%eax, (%rdi,%rdx,4)
.L238:
	movl	$-2147483648, 5152(%r14)
	cmpq	%rdi, %r9
	je	.L240
.L239:
	movq	%rdi, %rax
	movl	$-2147483648, %esi
	.p2align 4,,10
	.p2align 3
.L243:
	movl	(%rax), %edx
	cmpl	%esi, %edx
	jle	.L242
	movl	%edx, 5152(%r14)
	movl	%edx, %esi
.L242:
	addq	$4, %rax
	cmpq	%rax, %r9
	jne	.L243
.L244:
	leaq	-1(%r8), %r10
	cmpq	$1, %r8
	jbe	.L264
.L240:
	leaq	-2(%r8), %rax
	cmpq	$2, %rax
	jbe	.L266
	movq	%r10, %rdx
	pxor	%xmm1, %xmm1
	pxor	%xmm4, %xmm4
	movq	%rdi, %rax
	shrq	$2, %rdx
	salq	$4, %rdx
	addq	%rdi, %rdx
	.p2align 4,,10
	.p2align 3
.L246:
	movdqu	4(%rax), %xmm0
	movdqu	(%rax), %xmm5
	addq	$16, %rax
	psubd	%xmm5, %xmm0
	movdqa	%xmm0, %xmm2
	psrad	$31, %xmm2
	pxor	%xmm2, %xmm0
	psubd	%xmm2, %xmm0
	movdqa	%xmm4, %xmm2
	pcmpgtd	%xmm0, %xmm2
	movdqa	%xmm0, %xmm3
	punpckldq	%xmm2, %xmm3
	punpckhdq	%xmm2, %xmm0
	paddq	%xmm3, %xmm1
	paddq	%xmm0, %xmm1
	cmpq	%rax, %rdx
	jne	.L246
	movdqa	%xmm1, %xmm0
	movq	%r10, %rdx
	psrldq	$8, %xmm0
	andq	$-4, %rdx
	paddq	%xmm1, %xmm0
	leal	1(%rdx), %esi
	movq	%xmm0, %rax
	leaq	1(%rdx), %r11
	cmpq	%rdx, %r10
	je	.L241
.L245:
	leal	-1(%rsi), %r10d
	movl	(%rdi,%r11,4), %edx
	movslq	%r10d, %r10
	subl	(%rdi,%r10,4), %edx
	leaq	0(,%r10,4), %r9
	movl	%edx, %r10d
	sarl	$31, %r10d
	xorl	%r10d, %edx
	subl	%r10d, %edx
	movslq	%edx, %rdx
	addq	%rdx, %rax
	leal	1(%rsi), %edx
	movslq	%edx, %rdx
	cmpq	%rdx, %r8
	jbe	.L241
	movl	(%rdi,%rdx,4), %edx
	subl	4(%rdi,%r9), %edx
	addl	$2, %esi
	movl	%edx, %r10d
	movslq	%esi, %rsi
	sarl	$31, %r10d
	xorl	%r10d, %edx
	subl	%r10d, %edx
	movslq	%edx, %rdx
	addq	%rdx, %rax
	cmpq	%rsi, %r8
	jbe	.L241
	movl	(%rdi,%rsi,4), %edx
	subl	8(%rdi,%r9), %edx
	movl	%edx, %esi
	sarl	$31, %esi
	xorl	%esi, %edx
	subl	%esi, %edx
	movslq	%edx, %rdx
	addq	%rdx, %rax
.L241:
	movq	40(%r14), %r12
	movq	32(%r14), %rbx
	movl	%eax, 104(%r14)
	leaq	80(%r14), %r13
	cmpq	%rbx, %r12
	jne	.L262
	jmp	.L233
	.p2align 4,,10
	.p2align 3
.L249:
	movq	88(%r14), %rdx
	movq	80(%r14), %rsi
	movq	16(%rbx), %rax
	movq	%rdx, %r15
	subq	%rsi, %r15
	subq	%rbp, %rax
	movq	%r15, %rdi
	sarq	$2, %rax
	sarq	$2, %rdi
	cmpq	%rax, %rdi
	ja	.L281
	movq	8(%rbx), %r8
	movq	%r8, %rax
	subq	%rbp, %rax
	movq	%rax, %r9
	sarq	$2, %r9
	cmpq	%r9, %rdi
	ja	.L258
	cmpq	%rdx, %rsi
	je	.L280
	movq	%rbp, %rdi
	movq	%r15, %rdx
	call	memmove@PLT
	movq	(%rbx), %rbp
	leaq	0(%rbp,%r15), %rsi
	.p2align 4,,10
	.p2align 3
.L257:
	movq	%rsi, 8(%rbx)
.L250:
	leaq	136(%r14), %rdx
	movq	%rbp, %rdi
	addq	$24, %rbx
	call	_ZSt7shuffleIN9__gnu_cxx17__normal_iteratorIPiSt6vectorIiSaIiEEEERSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEvT_SA_OT0_
	cmpq	%rbx, %r12
	je	.L233
.L262:
	movq	(%rbx), %rbp
	cmpq	%r13, %rbx
	jne	.L249
	movq	8(%rbx), %rsi
	jmp	.L250
	.p2align 4,,10
	.p2align 3
.L258:
	testq	%rax, %rax
	je	.L260
	movq	%rax, %rdx
	movq	%rbp, %rdi
	call	memmove@PLT
	movq	8(%rbx), %r8
	movq	(%rbx), %rbp
	movq	88(%r14), %rdx
	movq	80(%r14), %rsi
	movq	%r8, %rax
	subq	%rbp, %rax
.L260:
	addq	%rax, %rsi
	cmpq	%rdx, %rsi
	je	.L280
	subq	%rsi, %rdx
	movq	%r8, %rdi
	call	memmove@PLT
	movq	(%rbx), %rbp
.L280:
	leaq	0(%rbp,%r15), %rsi
	jmp	.L257
	.p2align 4,,10
	.p2align 3
.L281:
	xorl	%ebp, %ebp
	testq	%rdi, %rdi
	je	.L253
	movabsq	$2305843009213693951, %rax
	cmpq	%rax, %rdi
	ja	.L282
	movq	%r15, %rdi
	movq	%rdx, 8(%rsp)
	movq	%rsi, (%rsp)
	call	_Znwm@PLT
	movq	8(%rsp), %rdx
	movq	(%rsp), %rsi
	movq	%rax, %rbp
.L253:
	cmpq	%rdx, %rsi
	je	.L255
	movq	%r15, %rdx
	movq	%rbp, %rdi
	call	memcpy@PLT
.L255:
	movq	(%rbx), %rdi
	testq	%rdi, %rdi
	je	.L256
	call	_ZdlPv@PLT
.L256:
	leaq	0(%rbp,%r15), %rsi
	movq	%rbp, (%rbx)
	movq	%rsi, 16(%rbx)
	jmp	.L257
	.p2align 4,,10
	.p2align 3
.L233:
	addq	$24, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L237:
	.cfi_restore_state
	movl	$-2147483648, 5152(%r14)
	cmpq	%rdi, %r9
	jne	.L239
	jmp	.L244
	.p2align 4,,10
	.p2align 3
.L234:
	movl	$-2147483648, 5152(%r14)
	cmpq	%rdi, %r9
	jne	.L239
	.p2align 4,,10
	.p2align 3
.L264:
	xorl	%eax, %eax
	jmp	.L241
.L266:
	xorl	%eax, %eax
	movl	$1, %r11d
	movl	$1, %esi
	jmp	.L245
.L265:
	xorl	%edx, %edx
	xorl	%eax, %eax
	jmp	.L235
.L282:
	call	_ZSt17__throw_bad_allocv@PLT
	.cfi_endproc
.LFE4131:
	.size	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEE10initializeIXadL_Z4initRS2_EEEEvv, .-_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEE10initializeIXadL_Z4initRS2_EEEEvv
	.section	.text._ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE,"axG",@progbits,_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE,comdat
	.align 2
	.p2align 4
	.weak	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	.type	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE, @function
_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE:
.LFB4666:
	.cfi_startproc
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	movq	%rsi, %r15
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	movq	%rdx, %rbp
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	subq	$56, %rsp
	.cfi_def_cfa_offset 112
	movq	8(%rdx), %r14
	subq	(%rdx), %r14
	movq	%fs:40, %rax
	movq	%rax, 40(%rsp)
	xorl	%eax, %eax
	movl	$4294967294, %eax
	cmpq	%rax, %r14
	ja	.L284
	addq	$1, %r14
	addq	$1, %rax
	xorl	%edx, %edx
	divq	%r14
	imulq	%rax, %r14
	movq	%rax, %rbx
	.p2align 4,,10
	.p2align 3
.L285:
	movq	%r15, %rdi
	call	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv
	cmpq	%rax, %r14
	jbe	.L285
	xorl	%edx, %edx
	divq	%rbx
.L286:
	addq	0(%rbp), %rax
	movq	40(%rsp), %rcx
	xorq	%fs:40, %rcx
	jne	.L299
	addq	$56, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L284:
	.cfi_restore_state
	movl	$4294967295, %eax
	cmpq	%rax, %r14
	je	.L287
	movq	%r14, %rax
	movq	%rdi, %r13
	leaq	16(%rsp), %r12
	shrq	$32, %rax
	movq	%rax, 8(%rsp)
.L291:
	movq	8(%rsp), %rax
	movq	%r12, %rdx
	movq	%r15, %rsi
	movq	%r13, %rdi
	movq	$0, 16(%rsp)
	movq	%rax, 24(%rsp)
	call	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	movq	%r15, %rdi
	movq	%rax, %rbx
	call	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv
	xorl	%edx, %edx
	movq	%rax, %r8
	movq	%rbx, %rax
	salq	$32, %rax
	addq	%r8, %rax
	setc	%dl
	cmpq	%rax, %r14
	jb	.L291
	testq	%rdx, %rdx
	jne	.L291
	jmp	.L286
	.p2align 4,,10
	.p2align 3
.L287:
	movq	%rsi, %rdi
	call	_ZNSt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEclEv
	jmp	.L286
.L299:
	call	__stack_chk_fail@PLT
	.cfi_endproc
.LFE4666:
	.size	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE, .-_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	.section	.text._ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_,"axG",@progbits,_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_,comdat
	.p2align 4
	.weak	_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_
	.type	_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_, @function
_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_:
.LFB4745:
	.cfi_startproc
	leaq	-1(%rdx), %rax
	pushq	%r15
	.cfi_def_cfa_offset 16
	.cfi_offset 15, -16
	pushq	%r14
	.cfi_def_cfa_offset 24
	.cfi_offset 14, -24
	pushq	%r13
	.cfi_def_cfa_offset 32
	.cfi_offset 13, -32
	movq	%rax, %r13
	pushq	%r12
	.cfi_def_cfa_offset 40
	.cfi_offset 12, -40
	shrq	$63, %r13
	movq	%rdi, %r12
	pushq	%rbp
	.cfi_def_cfa_offset 48
	.cfi_offset 6, -48
	addq	%rax, %r13
	pushq	%rbx
	.cfi_def_cfa_offset 56
	.cfi_offset 3, -56
	sarq	%r13
	subq	$40, %rsp
	.cfi_def_cfa_offset 96
	movq	%rsi, 16(%rsp)
	movq	%rdx, 8(%rsp)
	movq	%rcx, 24(%rsp)
	cmpq	%r13, %rsi
	jge	.L301
	movq	%rsi, %rdi
	pxor	%xmm1, %xmm1
	.p2align 4,,10
	.p2align 3
.L302:
	leaq	1(%rdi), %rax
	leaq	(%rax,%rax), %r10
	leaq	-1(%r10), %rbp
	leaq	(%r10,%rax,4), %rax
	leaq	0(%rbp,%rbp,2), %rdx
	leaq	(%r12,%rax,8), %r14
	leaq	(%r12,%rdx,8), %rbx
	movq	8(%r14), %r11
	movq	(%r14), %rdx
	movq	8(%rbx), %r9
	movq	(%rbx), %rax
	movq	%r11, %r8
	movq	%r9, %rcx
	subq	%rdx, %r8
	subq	%rax, %rcx
	cmpq	%rcx, %r8
	leaq	(%rdx,%rcx), %rsi
	movq	%rax, %r8
	cmovle	%r11, %rsi
	cmpq	%rsi, %rdx
	je	.L305
	movq	%rdx, %rcx
	jmp	.L310
	.p2align 4,,10
	.p2align 3
.L339:
	jg	.L309
	addq	$4, %rcx
	addq	$4, %r8
	cmpq	%rcx, %rsi
	je	.L305
.L310:
	movl	(%r8), %r15d
	cmpl	%r15d, (%rcx)
	jge	.L339
.L308:
	leaq	(%rdi,%rdi,2), %rdx
	movq	%rax, %xmm0
	movq	%r9, %xmm3
	leaq	(%r12,%rdx,8), %rdx
	punpcklqdq	%xmm3, %xmm0
	movq	(%rdx), %rdi
	movups	%xmm0, (%rdx)
	movq	16(%rbx), %rax
	movq	%rax, 16(%rdx)
	movq	$0, 16(%rbx)
	movups	%xmm1, (%rbx)
	testq	%rdi, %rdi
	je	.L311
	call	_ZdlPv@PLT
	pxor	%xmm1, %xmm1
.L311:
	cmpq	%r13, %rbp
	jge	.L303
	movq	%rbp, %rdi
	jmp	.L302
	.p2align 4,,10
	.p2align 3
.L305:
	cmpq	%r8, %r9
	jne	.L308
.L309:
	movq	%r14, %rbx
	movq	%r11, %r9
	movq	%rdx, %rax
	movq	%r10, %rbp
	jmp	.L308
	.p2align 4,,10
	.p2align 3
.L301:
	leaq	(%rsi,%rsi,2), %rax
	movq	%rsi, %rbp
	leaq	(%rdi,%rax,8), %rbx
	.p2align 4,,10
	.p2align 3
.L303:
	movq	8(%rsp), %rax
	testb	$1, %al
	jne	.L312
	movq	%rax, %rdx
	subq	$2, %rdx
	movq	%rdx, %rax
	shrq	$63, %rax
	addq	%rax, %rdx
	sarq	%rdx
	cmpq	%rbp, %rdx
	je	.L344
.L312:
	movq	24(%rsp), %rax
	pxor	%xmm0, %xmm0
	movq	8(%rax), %rsi
	movq	16(%rax), %rdi
	movq	$0, 16(%rax)
	movq	(%rax), %r13
	movups	%xmm0, (%rax)
	leaq	-1(%rbp), %rax
	movq	%rax, %rdx
	movq	%rsi, 8(%rsp)
	shrq	$63, %rdx
	movq	%rdi, 24(%rsp)
	addq	%rax, %rdx
	movq	16(%rsp), %rax
	sarq	%rdx
	cmpq	%rax, %rbp
	jle	.L313
	subq	%r13, %rsi
	movq	(%rbx), %rdi
	movq	%rbp, %r8
	movdqa	%xmm0, %xmm1
	movq	%rsi, %rbp
	movq	%rdx, %r15
	movq	%rax, %r14
	.p2align 4,,10
	.p2align 3
.L326:
	leaq	(%r15,%r15,2), %rax
	movq	%r13, %rsi
	leaq	(%r12,%rax,8), %rbx
	movq	8(%rbx), %r9
	movq	(%rbx), %rax
	movq	%r9, %rdx
	leaq	(%rax,%rbp), %rcx
	subq	%rax, %rdx
	cmpq	%rbp, %rdx
	cmovle	%r9, %rcx
	cmpq	%rcx, %rax
	je	.L315
	movq	%rax, %rdx
	jmp	.L321
	.p2align 4,,10
	.p2align 3
.L340:
	jg	.L320
	addq	$4, %rdx
	addq	$4, %rsi
	cmpq	%rdx, %rcx
	je	.L315
.L321:
	movl	(%rsi), %r10d
	cmpl	%r10d, (%rdx)
	jge	.L340
.L318:
	movq	%rax, %xmm0
	leaq	(%r8,%r8,2), %rdx
	movq	%r9, %xmm2
	leaq	(%r12,%rdx,8), %rdx
	punpcklqdq	%xmm2, %xmm0
	movups	%xmm0, (%rdx)
	movq	16(%rbx), %rax
	movq	%rax, 16(%rdx)
	movq	$0, 16(%rbx)
	movups	%xmm1, (%rbx)
	testq	%rdi, %rdi
	je	.L323
	call	_ZdlPv@PLT
	movq	(%rbx), %rdi
	pxor	%xmm1, %xmm1
.L323:
	leaq	-1(%r15), %rdx
	movq	%r15, %r8
	movq	%rdx, %rax
	shrq	$63, %rax
	addq	%rdx, %rax
	sarq	%rax
	cmpq	%r15, %r14
	jge	.L319
	movq	%rax, %r15
	jmp	.L326
	.p2align 4,,10
	.p2align 3
.L315:
	cmpq	%rsi, 8(%rsp)
	jne	.L318
	imulq	$24, %r8, %rbx
	addq	%r12, %rbx
	.p2align 4,,10
	.p2align 3
.L319:
	movq	24(%rsp), %rax
	movq	%r13, %xmm0
	movhps	8(%rsp), %xmm0
	movq	%rax, 16(%rbx)
	movups	%xmm0, (%rbx)
	testq	%rdi, %rdi
	je	.L345
	addq	$40, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	jmp	_ZdlPv@PLT
	.p2align 4,,10
	.p2align 3
.L320:
	.cfi_restore_state
	leaq	(%r8,%r8,2), %rax
	leaq	(%r12,%rax,8), %rbx
	jmp	.L319
	.p2align 4,,10
	.p2align 3
.L345:
	addq	$40, %rsp
	.cfi_remember_state
	.cfi_def_cfa_offset 56
	popq	%rbx
	.cfi_def_cfa_offset 48
	popq	%rbp
	.cfi_def_cfa_offset 40
	popq	%r12
	.cfi_def_cfa_offset 32
	popq	%r13
	.cfi_def_cfa_offset 24
	popq	%r14
	.cfi_def_cfa_offset 16
	popq	%r15
	.cfi_def_cfa_offset 8
	ret
	.p2align 4,,10
	.p2align 3
.L344:
	.cfi_restore_state
	leaq	1(%rbp,%rbp), %rbp
	movq	(%rbx), %rdi
	pxor	%xmm0, %xmm0
	leaq	0(%rbp,%rbp,2), %rax
	leaq	(%r12,%rax,8), %rax
	movdqu	(%rax), %xmm4
	movups	%xmm4, (%rbx)
	movq	16(%rax), %rdx
	movq	%rdx, 16(%rbx)
	movq	%rax, %rbx
	movq	$0, 16(%rax)
	movups	%xmm0, (%rax)
	testq	%rdi, %rdi
	je	.L312
	call	_ZdlPv@PLT
	jmp	.L312
.L313:
	movq	(%rbx), %rdi
	jmp	.L319
	.cfi_endproc
.LFE4745:
	.size	_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_, .-_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_
	.section	.text.unlikely,"ax",@progbits
.LCOLDB8:
	.section	.text.startup,"ax",@progbits
.LHOTB8:
	.p2align 4
	.globl	main
	.type	main, @function
main:
.LFB3834:
	.cfi_startproc
	.cfi_personality 0x9b,DW.ref.__gxx_personality_v0
	.cfi_lsda 0x1b,.LLSDA3834
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset 6, -16
	movl	$1, %ecx
	movq	%rsp, %rbp
	.cfi_def_cfa_register 6
	pushq	%r15
	pushq	%r14
	leaq	-5216(%rbp), %rsi
	pushq	%r13
	pushq	%r12
	pushq	%rbx
	subq	$5336, %rsp
	.cfi_offset 15, -24
	.cfi_offset 14, -32
	.cfi_offset 13, -40
	.cfi_offset 12, -48
	.cfi_offset 3, -56
	movapd	.LC5(%rip), %xmm0
	movq	%fs:40, %rax
	movq	%rax, -56(%rbp)
	xorl	%eax, %eax
	movq	%rsi, -5352(%rbp)
	movabsq	$21474836680, %rax
	movl	$10, -5208(%rbp)
	movq	$0, -5120(%rbp)
	movq	$0, -5088(%rbp)
	movq	$5489, -5080(%rbp)
	movq	%rax, -5216(%rbp)
	movl	$5489, %eax
	movaps	%xmm0, -5200(%rbp)
	pxor	%xmm0, %xmm0
	movq	%rax, %rdx
	movaps	%xmm0, -5184(%rbp)
	movaps	%xmm0, -5168(%rbp)
	movaps	%xmm0, -5152(%rbp)
	movaps	%xmm0, -5136(%rbp)
	movaps	%xmm0, -5104(%rbp)
	.p2align 4,,10
	.p2align 3
.L347:
	movq	%rdx, %rax
	shrq	$30, %rax
	xorq	%rdx, %rax
	imulq	$1812433253, %rax, %rax
	leal	(%rax,%rcx), %edx
	movq	%rdx, 136(%rsi,%rcx,8)
	addq	$1, %rcx
	cmpq	$624, %rcx
	jne	.L347
	leaq	-5136(%rbp), %rax
	movdqa	.LC6(%rip), %xmm0
	movl	$265, %esi
	movq	$624, -88(%rbp)
	movq	%rax, %rdi
	movq	%rax, -5360(%rbp)
	leaq	-5160(%rbp), %r13
	leaq	-5184(%rbp), %r12
	movaps	%xmm0, -80(%rbp)
.LEHB0:
	call	_ZNSt6vectorIiSaIiEE17_M_default_appendEm
	movq	-5152(%rbp), %r13
	movq	-5160(%rbp), %r12
	movabsq	$-6148914691236517205, %rdx
	movq	%r13, %rax
	subq	%r12, %rax
	sarq	$3, %rax
	imulq	%rdx, %rax
	cmpq	$199, %rax
	jbe	.L573
	cmpq	$200, %rax
	jne	.L574
.L349:
	movq	-5176(%rbp), %r13
	movq	-5184(%rbp), %r12
	movabsq	$-6148914691236517205, %rdx
	movq	%r13, %rax
	subq	%r12, %rax
	sarq	$3, %rax
	imulq	%rdx, %rax
	cmpq	$199, %rax
	jbe	.L575
	cmpq	$200, %rax
	jne	.L576
.L356:
	movq	-5176(%rbp), %r14
	movq	-5184(%rbp), %rbx
	movl	$265, %r15d
	cmpq	%r14, %rbx
	jne	.L368
	jmp	.L369
	.p2align 4,,10
	.p2align 3
.L365:
	cmpq	$265, %rsi
	je	.L366
	addq	$1060, %rax
	cmpq	%rax, %rcx
	je	.L366
	movq	%rax, 8(%rbx)
.L366:
	addq	$24, %rbx
	cmpq	%rbx, %r14
	je	.L369
.L368:
	movq	8(%rbx), %rcx
	movq	(%rbx), %rax
	movq	%rcx, %rdx
	subq	%rax, %rdx
	movq	%rdx, %rsi
	sarq	$2, %rsi
	cmpq	$1059, %rdx
	ja	.L365
	movq	%r15, %rax
	movq	%rbx, %rdi
	leaq	-5160(%rbp), %r13
	subq	%rsi, %rax
	leaq	-5184(%rbp), %r12
	movq	%rax, %rsi
	call	_ZNSt6vectorIiSaIiEE17_M_default_appendEm
	addq	$24, %rbx
	cmpq	%rbx, %r14
	jne	.L368
.L369:
	movq	-5152(%rbp), %r14
	movq	-5160(%rbp), %rbx
	movl	$265, %r15d
	cmpq	%r14, %rbx
	jne	.L375
	jmp	.L364
	.p2align 4,,10
	.p2align 3
.L372:
	cmpq	$265, %rsi
	je	.L373
	addq	$1060, %rax
	cmpq	%rax, %rcx
	je	.L373
	movq	%rax, 8(%rbx)
.L373:
	addq	$24, %rbx
	cmpq	%rbx, %r14
	je	.L364
.L375:
	movq	8(%rbx), %rcx
	movq	(%rbx), %rax
	movq	%rcx, %rdx
	subq	%rax, %rdx
	movq	%rdx, %rsi
	sarq	$2, %rsi
	cmpq	$1059, %rdx
	ja	.L372
	movq	%r15, %rax
	movq	%rbx, %rdi
	leaq	-5160(%rbp), %r13
	subq	%rsi, %rax
	leaq	-5184(%rbp), %r12
	movq	%rax, %rsi
	call	_ZNSt6vectorIiSaIiEE17_M_default_appendEm
.LEHE0:
	addq	$24, %rbx
	cmpq	%rbx, %r14
	jne	.L375
.L364:
	movq	-5096(%rbp), %rdx
	movq	-5104(%rbp), %rax
	movq	%rdx, %rsi
	subq	%rax, %rsi
	movq	%rsi, %rcx
	sarq	$3, %rcx
	cmpq	$1599, %rsi
	jbe	.L577
	cmpq	$200, %rcx
	jne	.L578
.L376:
	movq	-5352(%rbp), %rdi
.LEHB1:
	call	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEE10initializeIXadL_Z4initRS2_EEEEvv
	movl	$100, -5368(%rbp)
	movq	$0, -5376(%rbp)
	.p2align 4,,10
	.p2align 3
.L378:
	movl	$50, -5364(%rbp)
	.p2align 4,,10
	.p2align 3
.L462:
	movq	-5176(%rbp), %rax
	movq	-5184(%rbp), %rbx
	movq	%rax, -5272(%rbp)
	cmpq	%rbx, %rax
	je	.L382
	movl	-5112(%rbp), %eax
	movq	-5104(%rbp), %r14
	xorl	%r12d, %r12d
	movl	%eax, -5280(%rbp)
	.p2align 4,,10
	.p2align 3
.L388:
	leaq	(%r12,%r12,2), %rax
	leaq	0(,%r12,8), %r13
	leaq	(%rbx,%rax,8), %r9
	leaq	(%r14,%r13), %r15
	movq	(%r9), %rdx
	movq	8(%r9), %rax
	subq	%rdx, %rax
	movq	%rax, %rdi
	sarq	$2, %rdi
	cmpq	$7, %rax
	jbe	.L488
	leaq	-2(%rdi), %rax
	leaq	-1(%rdi), %r8
	cmpq	$2, %rax
	jbe	.L489
	movq	%r8, %rax
	pxor	%xmm1, %xmm1
	pxor	%xmm4, %xmm4
	movq	%rdx, %rcx
	shrq	$2, %rax
	salq	$4, %rax
	addq	%rdx, %rax
	.p2align 4,,10
	.p2align 3
.L385:
	movdqu	4(%rcx), %xmm0
	movdqu	(%rcx), %xmm5
	movdqa	%xmm4, %xmm3
	addq	$16, %rcx
	psubd	%xmm5, %xmm0
	movdqa	%xmm0, %xmm2
	psrad	$31, %xmm2
	pxor	%xmm2, %xmm0
	psubd	%xmm2, %xmm0
	pcmpgtd	%xmm0, %xmm3
	movdqa	%xmm0, %xmm2
	punpckldq	%xmm3, %xmm2
	punpckhdq	%xmm3, %xmm0
	paddq	%xmm2, %xmm1
	paddq	%xmm0, %xmm1
	cmpq	%rcx, %rax
	jne	.L385
	movdqa	%xmm1, %xmm0
	movq	%r8, %r10
	psrldq	$8, %xmm0
	andq	$-4, %r10
	paddq	%xmm1, %xmm0
	leal	1(%r10), %esi
	movq	%xmm0, %rax
	leaq	1(%r10), %rcx
	cmpq	%r8, %r10
	je	.L383
.L384:
	leal	-1(%rsi), %r10d
	movl	(%rdx,%rcx,4), %ecx
	movslq	%r10d, %r10
	subl	(%rdx,%r10,4), %ecx
	leaq	0(,%r10,4), %r8
	movl	%ecx, %r10d
	sarl	$31, %r10d
	xorl	%r10d, %ecx
	subl	%r10d, %ecx
	movslq	%ecx, %rcx
	addq	%rcx, %rax
	leal	1(%rsi), %ecx
	movslq	%ecx, %rcx
	cmpq	%rcx, %rdi
	jbe	.L383
	movl	8(%rdx,%r8), %r10d
	addl	$2, %esi
	movslq	%esi, %rsi
	movl	%r10d, %ecx
	subl	4(%rdx,%r8), %ecx
	movl	%ecx, %r11d
	sarl	$31, %r11d
	xorl	%r11d, %ecx
	subl	%r11d, %ecx
	movslq	%ecx, %rcx
	addq	%rcx, %rax
	cmpq	%rsi, %rdi
	jbe	.L383
	movl	12(%rdx,%r8), %edx
	subl	%r10d, %edx
	movl	%edx, %ecx
	sarl	$31, %ecx
	xorl	%ecx, %edx
	subl	%ecx, %edx
	movslq	%edx, %rdx
	addq	%rdx, %rax
.L383:
	movslq	-5280(%rbp), %rdx
	movq	%rax, (%r15)
	cmpq	%rdx, %rax
	jg	.L579
.L387:
	movq	-5272(%rbp), %rax
	addq	$1, %r12
	movabsq	$-6148914691236517205, %rsi
	subq	%rbx, %rax
	sarq	$3, %rax
	imulq	%rsi, %rax
	cmpq	%r12, %rax
	ja	.L388
.L382:
	movslq	-5212(%rbp), %rdx
	movq	-5160(%rbp), %r13
	movl	%edx, -5280(%rbp)
	movq	%rdx, %rax
	leaq	(%rdx,%rdx,2), %rdx
	leaq	0(%r13,%rdx,8), %r14
	cmpq	%r14, %r13
	je	.L389
	cmpq	-5272(%rbp), %rbx
	je	.L571
	movq	%r13, %r12
	jmp	.L391
	.p2align 4,,10
	.p2align 3
.L580:
	cmpq	%r12, %r14
	je	.L498
.L391:
	movq	%rbx, %rsi
	movq	%r12, %rdi
	call	_ZNSt6vectorIiSaIiEEaSERKS1_
	addq	$24, %r12
	addq	$24, %rbx
	cmpq	-5272(%rbp), %rbx
	jne	.L580
.L498:
	movabsq	$-6148914691236517205, %rsi
	movq	%r12, %rax
	subq	%r13, %rax
	movq	%rax, %r15
	movq	%rax, -5288(%rbp)
	sarq	$3, %r15
	movq	%r15, %rdi
	imulq	%rsi, %rdi
	movq	%rdi, -5280(%rbp)
	cmpq	$24, %rax
	jle	.L393
	leaq	-2(%rdi), %rdx
	movq	%r12, -5296(%rbp)
	leaq	-5264(%rbp), %r14
	movq	%rdx, %rax
	movq	%rbx, -5304(%rbp)
	shrq	$63, %rax
	addq	%rdx, %rax
	movq	%rax, %rsi
	andq	$-2, %rax
	sarq	%rsi
	addq	%rsi, %rax
	movq	%rsi, %rbx
	leaq	0(%r13,%rax,8), %r15
	movq	%r15, %r12
	movq	%rdi, %r15
	jmp	.L397
	.p2align 4,,10
	.p2align 3
.L581:
	call	_ZdlPv@PLT
	subq	$24, %r12
	testq	%rbx, %rbx
	je	.L565
.L396:
	subq	$1, %rbx
.L397:
	movq	16(%r12), %rdx
	pxor	%xmm4, %xmm4
	movq	%r13, %rdi
	movq	%r14, %rcx
	movq	$0, 16(%r12)
	movdqu	(%r12), %xmm0
	movq	%rbx, %rsi
	movups	%xmm4, (%r12)
	movq	%rdx, -5248(%rbp)
	movq	%r15, %rdx
	movaps	%xmm0, -5264(%rbp)
	call	_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_
	movq	-5264(%rbp), %rdi
	testq	%rdi, %rdi
	jne	.L581
	subq	$24, %r12
	testq	%rbx, %rbx
	jne	.L396
.L565:
	movq	-5296(%rbp), %r12
	movq	-5304(%rbp), %rbx
	cmpq	-5272(%rbp), %rbx
	je	.L418
	.p2align 4,,10
	.p2align 3
.L413:
	movq	8(%rbx), %rdx
	movq	8(%r13), %rdi
	movq	(%rbx), %rax
	movq	0(%r13), %rcx
	movq	%rdx, %r14
	movq	%rdi, %rsi
	subq	%rcx, %rsi
	subq	%rax, %r14
	leaq	(%rax,%rsi), %r8
	cmpq	%rsi, %r14
	cmovg	%r8, %rdx
	cmpq	%rdx, %rax
	jne	.L406
	jmp	.L400
	.p2align 4,,10
	.p2align 3
.L561:
	jg	.L404
	addq	$4, %rax
	addq	$4, %rcx
	cmpq	%rax, %rdx
	je	.L400
.L406:
	movl	(%rcx), %esi
	cmpl	%esi, (%rax)
	jge	.L561
.L403:
	movq	%r14, %rax
	pxor	%xmm0, %xmm0
	movq	$0, -5248(%rbp)
	sarq	$2, %rax
	movaps	%xmm0, -5264(%rbp)
	je	.L582
	movabsq	$2305843009213693951, %rsi
	cmpq	%rsi, %rax
	ja	.L583
	movq	%r14, %rdi
	call	_Znwm@PLT
	movq	%rax, %rcx
.L408:
	movq	%rcx, %xmm0
	addq	%rcx, %r14
	punpcklqdq	%xmm0, %xmm0
	movq	%r14, -5248(%rbp)
	movaps	%xmm0, -5264(%rbp)
	movq	8(%rbx), %rax
	movq	(%rbx), %rsi
	movq	%rax, %r14
	subq	%rsi, %r14
	cmpq	%rsi, %rax
	je	.L411
	movq	%rcx, %rdi
	movq	%r14, %rdx
	call	memmove@PLT
	movq	%rax, %rcx
.L411:
	addq	%r14, %rcx
	movq	-5280(%rbp), %rdx
	movq	%r13, %rdi
	xorl	%esi, %esi
	leaq	-5264(%rbp), %r14
	movq	%rcx, -5256(%rbp)
	movq	%r14, %rcx
	call	_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_
	movq	-5264(%rbp), %rdi
	testq	%rdi, %rdi
	je	.L404
	call	_ZdlPv@PLT
	.p2align 4,,10
	.p2align 3
.L404:
	addq	$24, %rbx
	cmpq	%rbx, -5272(%rbp)
	jne	.L413
	cmpq	$24, -5288(%rbp)
	leaq	-5264(%rbp), %r14
	jle	.L417
	.p2align 4,,10
	.p2align 3
.L418:
	pxor	%xmm0, %xmm0
	movq	-8(%r12), %rax
	subq	$24, %r12
	movq	%r13, %rdi
	movdqu	(%r12), %xmm1
	movups	%xmm0, (%r12)
	movq	%r12, %rbx
	xorl	%esi, %esi
	movq	$0, 16(%r12)
	subq	%r13, %rbx
	movq	%r14, %rcx
	movdqu	0(%r13), %xmm6
	movups	%xmm6, (%r12)
	movq	16(%r13), %rdx
	movq	%rdx, 16(%r12)
	movq	%rbx, %rdx
	movq	$0, 16(%r13)
	sarq	$3, %rdx
	movups	%xmm0, 0(%r13)
	movq	%rax, -5248(%rbp)
	movabsq	$-6148914691236517205, %rax
	imulq	%rax, %rdx
	movaps	%xmm1, -5264(%rbp)
	call	_ZSt13__adjust_heapIN9__gnu_cxx17__normal_iteratorIPSt6vectorIiSaIiEES2_IS4_SaIS4_EEEElS4_NS0_5__ops15_Iter_less_iterEEvT_T0_SC_T1_T2_
	movq	-5264(%rbp), %rdi
	testq	%rdi, %rdi
	je	.L415
	call	_ZdlPv@PLT
	cmpq	$24, %rbx
	jg	.L418
.L417:
	movl	-5212(%rbp), %eax
.L571:
	movl	%eax, -5280(%rbp)
.L389:
	movl	-5280(%rbp), %eax
	cmpl	%eax, -5216(%rbp)
	jle	.L460
	movslq	-5280(%rbp), %rax
	leaq	-5080(%rbp), %r14
	leaq	-80(%rbp), %r13
	movq	%r14, %r12
	leaq	(%rax,%rax,2), %rax
	salq	$3, %rax
	movq	%rax, -5320(%rbp)
	jmp	.L461
	.p2align 4,,10
	.p2align 3
.L422:
	addl	$1, -5280(%rbp)
	movl	-5280(%rbp), %eax
	addq	$24, -5320(%rbp)
	cmpl	%eax, -5216(%rbp)
	jle	.L460
.L461:
	movq	%r13, %rdx
	movq	%r12, %rsi
	movq	%r13, %rdi
	call	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	movsd	.LC7(%rip), %xmm0
	mulsd	-5192(%rbp), %xmm0
	movq	%rax, %rcx
	movabsq	$2361183241434822607, %rax
	imulq	%rcx
	movq	%rcx, %rax
	sarq	$63, %rax
	sarq	$7, %rdx
	subq	%rax, %rdx
	cvttsd2sil	%xmm0, %eax
	imulq	$1000, %rdx, %rdx
	cltq
	subq	%rdx, %rcx
	cmpq	%rax, %rcx
	jge	.L422
	movq	-5096(%rbp), %r8
	movq	-5104(%rbp), %r15
	movq	-5184(%rbp), %rbx
	cmpq	%r15, %r8
	je	.L490
	leaq	-8(%r8), %rdx
	movq	%r15, %rax
	subq	%r15, %rdx
	movq	%rdx, %rcx
	shrq	$3, %rcx
	addq	$1, %rcx
	cmpq	$16, %rdx
	jbe	.L491
	movq	%rcx, %rdx
	pxor	%xmm0, %xmm0
	shrq	%rdx
	salq	$4, %rdx
	addq	%r15, %rdx
	.p2align 4,,10
	.p2align 3
.L425:
	movdqu	(%rax), %xmm7
	addq	$16, %rax
	paddq	%xmm7, %xmm0
	cmpq	%rdx, %rax
	jne	.L425
	movdqa	%xmm0, %xmm1
	movq	%rcx, %rdx
	psrldq	$8, %xmm1
	andq	$-2, %rdx
	paddq	%xmm1, %xmm0
	leaq	(%r15,%rdx,8), %rax
	movq	%xmm0, %r14
	cmpq	%rdx, %rcx
	je	.L423
.L424:
	leaq	8(%rax), %rdx
	addq	(%rax), %r14
	cmpq	%rdx, %r8
	je	.L423
	leaq	16(%rax), %rdx
	addq	8(%rax), %r14
	cmpq	%rdx, %r8
	je	.L423
	addq	16(%rax), %r14
.L423:
	leaq	-24(%rbx), %rax
	movq	%r8, -5288(%rbp)
	pxor	%xmm0, %xmm0
	cmpq	%r15, %r8
	movq	%rax, -5304(%rbp)
	leaq	-5232(%rbp), %rcx
	movq	%rbx, -5296(%rbp)
	movq	%r12, %rbx
	movq	%r13, %r12
	movq	%rcx, %r13
	movaps	%xmm0, -5232(%rbp)
	setne	-5272(%rbp)
.L431:
	movq	%r12, %rdx
	movq	%rbx, %rsi
	movq	%r12, %rdi
	call	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	cqto
	idivq	%r14
	testq	%rdx, %rdx
	js	.L427
	cmpb	$0, -5272(%rbp)
	je	.L427
	movq	-5296(%rbp), %rax
	movq	%r15, %rsi
	jmp	.L428
	.p2align 4,,10
	.p2align 3
.L584:
	cmpq	%rsi, -5288(%rbp)
	je	.L430
.L428:
	subq	(%rsi), %rdx
	movq	%rax, %rdi
	addq	$8, %rsi
	addq	$24, %rax
	testq	%rdx, %rdx
	jns	.L584
.L430:
	movq	%rdi, 0(%r13)
	addq	$8, %r13
	cmpq	%r13, -5352(%rbp)
	jne	.L431
	movq	-5224(%rbp), %rax
	movq	%r12, %r13
	movq	%rbx, %r12
	movq	-5232(%rbp), %rbx
	movq	%r13, %rdx
	movq	%r12, %rsi
	movq	%r13, %rdi
	movq	%rsp, -5328(%rbp)
	movq	%rax, -5296(%rbp)
	movq	-5320(%rbp), %rax
	addq	-5160(%rbp), %rax
	movq	%rax, -5312(%rbp)
	call	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	movq	8(%rbx), %rdx
	subq	(%rbx), %rdx
	movq	%r13, %rdi
	movq	%rdx, %rsi
	xorl	%edx, %edx
	sarq	$2, %rsi
	divq	%rsi
	movq	%r12, %rsi
	movl	%edx, -5272(%rbp)
	movq	%rdx, %r15
	movq	%r13, %rdx
	call	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	movq	8(%rbx), %rsi
	movq	(%rbx), %r14
	xorl	%edx, %edx
	movq	%rsi, %rdi
	subq	%r14, %rdi
	movq	%rdi, -5336(%rbp)
	sarq	$2, %rdi
	divq	%rdi
	movslq	-64(%rbp), %rax
	movq	%rdi, -5304(%rbp)
	addq	$15, %rax
	andq	$-16, %rax
	movl	%edx, %r10d
	cmpl	%edx, %r15d
	jg	.L432
	subq	%rax, %rsp
	movq	%rsp, %rbx
	testq	%rdi, %rdi
	je	.L433
	cmpq	%rsi, %r14
	movq	%rdx, -5344(%rbp)
	movl	%edx, -5288(%rbp)
	movl	$1, %edx
	cmovne	%rdi, %rdx
	xorl	%esi, %esi
	movq	%rsp, %rdi
	call	memset@PLT
	movq	-5344(%rbp), %rcx
	movl	-5288(%rbp), %r10d
	cmpl	%ecx, %r15d
	jge	.L585
.L481:
	movq	-5312(%rbp), %rax
	movslq	-5272(%rbp), %rcx
	movq	(%rax), %rax
	movq	%rax, -5288(%rbp)
	movq	%rcx, %rax
	.p2align 4,,10
	.p2align 3
.L436:
	movslq	(%r14,%rax,4), %rdx
	movq	-5288(%rbp), %rsi
	movl	%edx, (%rsi,%rax,4)
	addq	$1, %rax
	movb	$1, (%rbx,%rdx)
	cmpl	%eax, %r10d
	jg	.L436
	movq	-5296(%rbp), %rax
	movq	%r12, -5344(%rbp)
	movq	%r14, %r12
	movq	(%rax), %rdx
	jmp	.L456
	.p2align 4,,10
	.p2align 3
.L437:
	addq	$1, %rcx
	cmpl	%ecx, %r10d
	jle	.L586
.L456:
	movslq	(%rdx,%rcx,4), %rdi
	movslq	%ecx, %rax
	leaq	0(,%rcx,4), %rsi
	cmpb	$0, (%rbx,%rdi)
	movq	%rdi, %r14
	jne	.L437
	cmpl	%ecx, -5272(%rbp)
	jg	.L438
	cmpl	%eax, %r10d
	jle	.L438
	movq	-5296(%rbp), %rsi
	movq	8(%rsi), %r15
	movq	%r15, %rsi
	subq	%rdx, %rsi
	movq	%rsi, %r11
	sarq	$4, %rsi
	sarq	$2, %r11
	.p2align 4,,10
	.p2align 3
.L453:
	leaq	(%r12,%rax,4), %r8
	testq	%rsi, %rsi
	jle	.L492
	movl	(%r8), %edi
	movq	%rdx, %rax
	movq	%rsi, %r9
	jmp	.L445
	.p2align 4,,10
	.p2align 3
.L440:
	cmpl	4(%rax), %edi
	je	.L587
	cmpl	8(%rax), %edi
	je	.L588
	cmpl	12(%rax), %edi
	je	.L589
	addq	$16, %rax
	subq	$1, %r9
	je	.L590
.L445:
	cmpl	%edi, (%rax)
	jne	.L440
.L572:
	subq	%rdx, %rax
	movq	%rax, %rdi
	sarq	$2, %rdi
.L441:
	movslq	%edi, %rax
	cmpl	%edi, -5272(%rbp)
	jg	.L499
	cmpl	%edi, %r10d
	jg	.L453
.L499:
	leaq	0(,%rax,4), %rsi
.L438:
	movq	-5288(%rbp), %rax
	movl	%r14d, (%rax,%rsi)
	movslq	(%rdx,%rcx,4), %rax
	addq	$1, %rcx
	movb	$1, (%rbx,%rax)
	cmpl	%ecx, %r10d
	jg	.L456
.L586:
	cmpq	$0, -5304(%rbp)
	movq	-5344(%rbp), %r12
	je	.L459
.L434:
	movq	-5312(%rbp), %r8
	movq	-5336(%rbp), %r9
	xorl	%eax, %eax
	.p2align 4,,10
	.p2align 3
.L458:
	movslq	(%rdx,%rax), %rcx
	cmpb	$0, (%rbx,%rcx)
	jne	.L457
	movq	(%r8), %rdi
	movb	$1, (%rbx,%rcx)
	movl	%ecx, (%rdi,%rax)
.L457:
	addq	$4, %rax
	cmpq	%rax, %r9
	jne	.L458
.L459:
	movq	-5328(%rbp), %rsp
	jmp	.L422
	.p2align 4,,10
	.p2align 3
.L590:
	movq	%r15, %rdi
	subq	%rax, %rdi
	sarq	$2, %rdi
.L439:
	cmpq	$2, %rdi
	je	.L446
	cmpq	$3, %rdi
	je	.L447
	cmpq	$1, %rdi
	je	.L448
	movq	%r11, %rdi
	jmp	.L441
	.p2align 4,,10
	.p2align 3
.L589:
	leaq	12(%rax), %rdi
	subq	%rdx, %rdi
	sarq	$2, %rdi
	jmp	.L441
	.p2align 4,,10
	.p2align 3
.L588:
	leaq	8(%rax), %rdi
	subq	%rdx, %rdi
	sarq	$2, %rdi
	jmp	.L441
	.p2align 4,,10
	.p2align 3
.L587:
	leaq	4(%rax), %rdi
	subq	%rdx, %rdi
	sarq	$2, %rdi
	jmp	.L441
	.p2align 4,,10
	.p2align 3
.L579:
	movq	-5360(%rbp), %rdi
	movq	%r9, %rsi
	call	_ZNSt6vectorIiSaIiEEaSERKS1_
	movq	-5104(%rbp), %r14
	movq	-5184(%rbp), %rbx
	movq	(%r14,%r13), %rax
	movl	%eax, -5280(%rbp)
	movl	%eax, -5112(%rbp)
	movq	-5176(%rbp), %rax
	movq	%rax, -5272(%rbp)
	jmp	.L387
	.p2align 4,,10
	.p2align 3
.L415:
	cmpq	$24, %rbx
	jg	.L418
	jmp	.L417
	.p2align 4,,10
	.p2align 3
.L447:
	movl	(%r8), %r8d
	cmpl	%r8d, (%rax)
	je	.L572
	addq	$4, %rax
.L449:
	cmpl	%r8d, (%rax)
	je	.L572
	addq	$4, %rax
.L450:
	movq	%r11, %rdi
	cmpl	%r8d, (%rax)
	jne	.L441
	jmp	.L572
	.p2align 4,,10
	.p2align 3
.L446:
	movl	(%r8), %r8d
	jmp	.L449
	.p2align 4,,10
	.p2align 3
.L448:
	movl	(%r8), %r8d
	jmp	.L450
	.p2align 4,,10
	.p2align 3
.L400:
	cmpq	%rcx, %rdi
	je	.L404
	jmp	.L403
	.p2align 4,,10
	.p2align 3
.L432:
	subq	%rax, %rsp
	cmpq	$0, -5304(%rbp)
	movq	%rsp, %rbx
	je	.L591
	cmpq	%rsi, %r14
	movq	%rdx, -5272(%rbp)
	movl	$1, %edx
	movq	%rsp, %rdi
	cmovne	-5304(%rbp), %rdx
	xorl	%esi, %esi
	call	memset@PLT
	movq	-5272(%rbp), %rcx
	movl	%r15d, %r10d
	movl	%ecx, -5272(%rbp)
	jmp	.L481
	.p2align 4,,10
	.p2align 3
.L492:
	movq	%r11, %rdi
	movq	%rdx, %rax
	jmp	.L439
	.p2align 4,,10
	.p2align 3
.L460:
	movdqa	-5168(%rbp), %xmm2
	movdqa	-5184(%rbp), %xmm0
	movq	-5152(%rbp), %rax
	movq	-5160(%rbp), %r12
	movdqa	%xmm2, %xmm1
	shufpd	$1, -5152(%rbp), %xmm1
	movaps	%xmm1, -5184(%rbp)
	movdqa	-5152(%rbp), %xmm1
	movq	%rax, -5288(%rbp)
	shufpd	$1, %xmm0, %xmm1
	shufpd	$1, %xmm2, %xmm0
	movaps	%xmm1, -5168(%rbp)
	movaps	%xmm0, -5152(%rbp)
	cmpq	%rax, %r12
	je	.L421
	.p2align 4,,10
	.p2align 3
.L474:
	movq	8(%r12), %rax
	movq	(%r12), %rsi
	movq	%rax, %r13
	subq	%rsi, %r13
	movq	%r13, %rdx
	sarq	$2, %rdx
	je	.L494
	movabsq	$2305843009213693951, %rax
	cmpq	%rax, %rdx
	ja	.L592
	movq	%r13, %rdi
	call	_Znwm@PLT
	movq	%rax, %r15
	movq	8(%r12), %rax
	movq	(%r12), %rsi
	movq	%rax, %r13
	subq	%rsi, %r13
.L464:
	movl	-5208(%rbp), %ebx
	cmpq	%rsi, %rax
	je	.L466
	movq	%r13, %rdx
	movq	%r15, %rdi
	call	memmove@PLT
	testl	%ebx, %ebx
	jle	.L467
.L470:
	sarq	$2, %r13
	xorl	%ebx, %ebx
	leaq	-5080(%rbp), %r14
	movq	%r13, -5280(%rbp)
	leaq	-80(%rbp), %r13
	.p2align 4,,10
	.p2align 3
.L468:
	movq	%r13, %rdx
	movq	%r14, %rsi
	movq	%r13, %rdi
	call	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	movsd	-5200(%rbp), %xmm0
	mulsd	.LC7(%rip), %xmm0
	movq	%rax, %rcx
	movabsq	$2361183241434822607, %rax
	imulq	%rcx
	movq	%rcx, %rax
	sarq	$63, %rax
	sarq	$7, %rdx
	subq	%rax, %rdx
	cvttsd2sil	%xmm0, %eax
	imulq	$1000, %rdx, %rdx
	cltq
	subq	%rdx, %rcx
	cmpq	%rax, %rcx
	jl	.L593
	addl	$1, %ebx
	cmpl	%ebx, -5208(%rbp)
	jg	.L468
.L472:
	testq	%r15, %r15
	je	.L469
.L467:
	movq	%r15, %rdi
	call	_ZdlPv@PLT
.L469:
	addq	$24, %r12
	cmpq	%r12, -5288(%rbp)
	jne	.L474
.L421:
	subl	$1, -5364(%rbp)
	jne	.L462
	movslq	-5112(%rbp), %rax
	movq	%rax, %rsi
	cmpq	-5376(%rbp), %rax
	jg	.L594
.L475:
	subl	$1, -5368(%rbp)
	jne	.L378
	movq	-5352(%rbp), %rdi
	call	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED1Ev
	movq	-56(%rbp), %rax
	xorq	%fs:40, %rax
	jne	.L595
	leaq	-40(%rbp), %rsp
	xorl	%eax, %eax
	popq	%rbx
	popq	%r12
	popq	%r13
	popq	%r14
	popq	%r15
	popq	%rbp
	.cfi_remember_state
	.cfi_def_cfa 7, 8
	ret
	.p2align 4,,10
	.p2align 3
.L593:
	.cfi_restore_state
	movq	%r13, %rdx
	movq	%r14, %rsi
	movq	%r13, %rdi
	addl	$1, %ebx
	call	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	movq	%r13, %rdx
	movq	%r14, %rsi
	movq	%r13, %rdi
	movq	%rax, -5272(%rbp)
	call	_ZNSt24uniform_int_distributionIlEclISt23mersenne_twister_engineImLm32ELm624ELm397ELm31ELm2567483615ELm11ELm4294967295ELm7ELm2636928640ELm15ELm4022730752ELm18ELm1812433253EEEElRT_RKNS0_10param_typeE
	movq	-5280(%rbp), %rsi
	xorl	%edx, %edx
	movq	%rax, %r8
	movq	-5272(%rbp), %rax
	divq	%rsi
	movq	%r8, %rax
	movslq	%edx, %rdx
	leaq	(%r15,%rdx,4), %rcx
	xorl	%edx, %edx
	divq	%rsi
	movl	(%rcx), %edi
	movslq	%edx, %rdx
	leaq	(%r15,%rdx,4), %rax
	movl	(%rax), %edx
	movl	%edx, (%rcx)
	movl	%edi, (%rax)
	cmpl	-5208(%rbp), %ebx
	jl	.L468
	jmp	.L472
	.p2align 4,,10
	.p2align 3
.L466:
	testl	%ebx, %ebx
	jg	.L470
	jmp	.L472
	.p2align 4,,10
	.p2align 3
.L494:
	xorl	%r15d, %r15d
	jmp	.L464
	.p2align 4,,10
	.p2align 3
.L488:
	xorl	%eax, %eax
	jmp	.L383
	.p2align 4,,10
	.p2align 3
.L489:
	xorl	%eax, %eax
	movl	$1, %ecx
	movl	$1, %esi
	jmp	.L384
	.p2align 4,,10
	.p2align 3
.L427:
	movq	-5304(%rbp), %rdi
	jmp	.L430
	.p2align 4,,10
	.p2align 3
.L582:
	xorl	%ecx, %ecx
	jmp	.L408
	.p2align 4,,10
	.p2align 3
.L393:
	cmpq	-5272(%rbp), %rbx
	jne	.L413
	jmp	.L417
	.p2align 4,,10
	.p2align 3
.L490:
	xorl	%r14d, %r14d
	jmp	.L423
	.p2align 4,,10
	.p2align 3
.L585:
	movq	-5296(%rbp), %rax
	movq	(%rax), %rdx
	jmp	.L434
	.p2align 4,,10
	.p2align 3
.L491:
	xorl	%r14d, %r14d
	jmp	.L424
	.p2align 4,,10
	.p2align 3
.L433:
	cmpl	%edx, %r15d
	jl	.L481
	movq	-5328(%rbp), %rsp
	jmp	.L422
	.p2align 4,,10
	.p2align 3
.L591:
	movl	%edx, -5272(%rbp)
	movl	%r15d, %r10d
	jmp	.L481
	.p2align 4,,10
	.p2align 3
.L594:
	leaq	_ZSt4cout(%rip), %rdi
	call	_ZNSolsEi@PLT
	movq	%rax, %r12
	movq	(%rax), %rax
	movq	-24(%rax), %rax
	movq	240(%r12,%rax), %r13
	testq	%r13, %r13
	je	.L596
	cmpb	$0, 56(%r13)
	je	.L477
	movsbl	67(%r13), %esi
.L478:
	movq	%r12, %rdi
	call	_ZNSo3putEc@PLT
	movq	%rax, %rdi
	call	_ZNSo5flushEv@PLT
	movslq	-5112(%rbp), %rax
	movq	%rax, -5376(%rbp)
	jmp	.L475
.L477:
	movq	%r13, %rdi
	call	_ZNKSt5ctypeIcE13_M_widen_initEv@PLT
	movq	0(%r13), %rax
	leaq	_ZNKSt5ctypeIcE8do_widenEc(%rip), %rdx
	movl	$10, %esi
	movq	48(%rax), %rax
	cmpq	%rdx, %rax
	je	.L478
	movq	%r13, %rdi
	call	*%rax
	movsbl	%al, %esi
	jmp	.L478
.L592:
	call	_ZSt17__throw_bad_allocv@PLT
.LEHE1:
.L578:
	addq	$1600, %rax
	cmpq	%rax, %rdx
	je	.L376
	movq	%rax, -5096(%rbp)
	jmp	.L376
.L576:
	addq	$4800, %r12
	cmpq	%r12, %r13
	je	.L356
	movq	%r12, %rbx
.L361:
	movq	(%rbx), %rdi
	testq	%rdi, %rdi
	je	.L358
	call	_ZdlPv@PLT
	addq	$24, %rbx
	cmpq	%rbx, %r13
	jne	.L361
.L359:
	movq	%r12, -5176(%rbp)
	jmp	.L356
.L574:
	addq	$4800, %r12
	cmpq	%r12, %r13
	je	.L349
	movq	%r12, %rbx
.L354:
	movq	(%rbx), %rdi
	testq	%rdi, %rdi
	je	.L351
	call	_ZdlPv@PLT
	addq	$24, %rbx
	cmpq	%r13, %rbx
	jne	.L354
.L352:
	movq	%r12, -5152(%rbp)
	jmp	.L349
.L575:
	movl	$200, %esi
	leaq	-5184(%rbp), %r12
	leaq	-5160(%rbp), %r13
	subq	%rax, %rsi
	movq	%r12, %rdi
.LEHB2:
	call	_ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm
	jmp	.L356
.L573:
	movl	$200, %esi
	leaq	-5160(%rbp), %r13
	leaq	-5184(%rbp), %r12
	subq	%rax, %rsi
	movq	%r13, %rdi
	call	_ZNSt6vectorIS_IiSaIiEESaIS1_EE17_M_default_appendEm
	jmp	.L349
.L577:
	movl	$200, %esi
	leaq	-5104(%rbp), %rdi
	leaq	-5160(%rbp), %r13
	subq	%rcx, %rsi
	leaq	-5184(%rbp), %r12
	call	_ZNSt6vectorIlSaIlEE17_M_default_appendEm
.LEHE2:
	jmp	.L376
.L351:
	addq	$24, %rbx
	cmpq	%rbx, %r13
	jne	.L354
	jmp	.L352
.L358:
	addq	$24, %rbx
	cmpq	%rbx, %r13
	jne	.L361
	jmp	.L359
.L583:
.LEHB3:
	call	_ZSt17__throw_bad_allocv@PLT
.L595:
	call	__stack_chk_fail@PLT
.L596:
	call	_ZSt16__throw_bad_castv@PLT
.LEHE3:
.L496:
	movq	%rax, %r12
	jmp	.L479
.L497:
	movq	%rax, %r14
	jmp	.L379
	.globl	__gxx_personality_v0
	.section	.gcc_except_table,"a",@progbits
.LLSDA3834:
	.byte	0xff
	.byte	0xff
	.byte	0x1
	.uleb128 .LLSDACSE3834-.LLSDACSB3834
.LLSDACSB3834:
	.uleb128 .LEHB0-.LFB3834
	.uleb128 .LEHE0-.LEHB0
	.uleb128 .L497-.LFB3834
	.uleb128 0
	.uleb128 .LEHB1-.LFB3834
	.uleb128 .LEHE1-.LEHB1
	.uleb128 .L496-.LFB3834
	.uleb128 0
	.uleb128 .LEHB2-.LFB3834
	.uleb128 .LEHE2-.LEHB2
	.uleb128 .L497-.LFB3834
	.uleb128 0
	.uleb128 .LEHB3-.LFB3834
	.uleb128 .LEHE3-.LEHB3
	.uleb128 .L496-.LFB3834
	.uleb128 0
.LLSDACSE3834:
	.section	.text.startup
	.cfi_endproc
	.section	.text.unlikely
	.cfi_startproc
	.cfi_personality 0x9b,DW.ref.__gxx_personality_v0
	.cfi_lsda 0x1b,.LLSDAC3834
	.type	main.cold, @function
main.cold:
.LFSB3834:
.L479:
	.cfi_def_cfa 6, 16
	.cfi_offset 3, -56
	.cfi_offset 6, -16
	.cfi_offset 12, -48
	.cfi_offset 13, -40
	.cfi_offset 14, -32
	.cfi_offset 15, -24
	movq	-5352(%rbp), %rdi
	call	_ZN29permutation_genatic_algorithmIXadL_Z8fittnessRKSt6vectorIiSaIiEEEEED1Ev
	movq	%r12, %rdi
.LEHB4:
	call	_Unwind_Resume@PLT
.L379:
	movq	-5104(%rbp), %rdi
	testq	%rdi, %rdi
	je	.L380
	call	_ZdlPv@PLT
.L380:
	movq	-5136(%rbp), %rdi
	testq	%rdi, %rdi
	je	.L381
	call	_ZdlPv@PLT
.L381:
	movq	%r13, %rdi
	call	_ZNSt6vectorIS_IiSaIiEESaIS1_EED1Ev
	movq	%r12, %rdi
	call	_ZNSt6vectorIS_IiSaIiEESaIS1_EED1Ev
	movq	%r14, %rdi
	call	_Unwind_Resume@PLT
.LEHE4:
	.cfi_endproc
.LFE3834:
	.section	.gcc_except_table
.LLSDAC3834:
	.byte	0xff
	.byte	0xff
	.byte	0x1
	.uleb128 .LLSDACSEC3834-.LLSDACSBC3834
.LLSDACSBC3834:
	.uleb128 .LEHB4-.LCOLDB8
	.uleb128 .LEHE4-.LEHB4
	.uleb128 0
	.uleb128 0
.LLSDACSEC3834:
	.section	.text.unlikely
	.section	.text.startup
	.size	main, .-main
	.section	.text.unlikely
	.size	main.cold, .-main.cold
.LCOLDE8:
	.section	.text.startup
.LHOTE8:
	.p2align 4
	.type	_GLOBAL__sub_I__Z8fittnessRKSt6vectorIiSaIiEE, @function
_GLOBAL__sub_I__Z8fittnessRKSt6vectorIiSaIiEE:
.LFB4858:
	.cfi_startproc
	subq	$8, %rsp
	.cfi_def_cfa_offset 16
	leaq	_ZStL8__ioinit(%rip), %rdi
	call	_ZNSt8ios_base4InitC1Ev@PLT
	movq	_ZNSt8ios_base4InitD1Ev@GOTPCREL(%rip), %rdi
	addq	$8, %rsp
	.cfi_def_cfa_offset 8
	leaq	__dso_handle(%rip), %rdx
	leaq	_ZStL8__ioinit(%rip), %rsi
	jmp	__cxa_atexit@PLT
	.cfi_endproc
.LFE4858:
	.size	_GLOBAL__sub_I__Z8fittnessRKSt6vectorIiSaIiEE, .-_GLOBAL__sub_I__Z8fittnessRKSt6vectorIiSaIiEE
	.section	.init_array,"aw"
	.align 8
	.quad	_GLOBAL__sub_I__Z8fittnessRKSt6vectorIiSaIiEE
	.local	_ZStL8__ioinit
	.comm	_ZStL8__ioinit,1,1
	.section	.rodata.cst16,"aM",@progbits,16
	.align 16
.LC0:
	.long	0
	.long	1
	.long	2
	.long	3
	.align 16
.LC1:
	.long	4
	.long	4
	.long	4
	.long	4
	.align 16
.LC3:
	.quad	0
	.quad	1
	.align 16
.LC4:
	.quad	0
	.quad	-1
	.align 16
.LC5:
	.long	2576980378
	.long	1070176665
	.long	1717986918
	.long	1072588390
	.align 16
.LC6:
	.quad	0
	.quad	9223372036854775807
	.section	.rodata.cst8,"aM",@progbits,8
	.align 8
.LC7:
	.long	0
	.long	1083129856
	.hidden	DW.ref.__gxx_personality_v0
	.weak	DW.ref.__gxx_personality_v0
	.section	.data.rel.local.DW.ref.__gxx_personality_v0,"awG",@progbits,DW.ref.__gxx_personality_v0,comdat
	.align 8
	.type	DW.ref.__gxx_personality_v0, @object
	.size	DW.ref.__gxx_personality_v0, 8
DW.ref.__gxx_personality_v0:
	.quad	__gxx_personality_v0
	.hidden	__dso_handle
	.ident	"GCC: (GNU) 9.2.0"
	.section	.note.GNU-stack,"",@progbits
