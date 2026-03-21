(self.webpackChunkai_config = self.webpackChunkai_config || []).push([[634], {
    13550: function (e, t, r) {
        !function (e, t) {
            "use strict";

            function i(e, t) {
                if (!e) throw new Error(t || "Assertion failed")
            }

            function n(e, t) {
                e.super_ = t;
                var r = function () {
                };
                r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e
            }

            function a(e, t, r) {
                if (a.isBN(e)) return e;
                this.negative = 0, this.words = null, this.length = 0, this.red = null, null !== e && ("le" !== t && "be" !== t || (r = t, t = 10), this._init(e || 0, t || 10, r || "be"))
            }

            var s;
            "object" == typeof e ? e.exports = a : t.BN = a, a.BN = a, a.wordSize = 26;
            try {
                s = "undefined" != typeof window && void 0 !== window.Buffer ? window.Buffer : r(46601).Buffer
            } catch (A) {
            }

            function o(e, t) {
                var r = e.charCodeAt(t);
                return r >= 65 && r <= 70 ? r - 55 : r >= 97 && r <= 102 ? r - 87 : r - 48 & 15
            }

            function c(e, t, r) {
                var i = o(e, r);
                return r - 1 >= t && (i |= o(e, r - 1) << 4), i
            }

            function f(e, t, r, i) {
                for (var n = 0, a = Math.min(e.length, r), s = t; s < a; s++) {
                    var o = e.charCodeAt(s) - 48;
                    n *= i, n += o >= 49 ? o - 49 + 10 : o >= 17 ? o - 17 + 10 : o
                }
                return n
            }

            a.isBN = function (e) {
                return e instanceof a || null !== e && "object" == typeof e && e.constructor.wordSize === a.wordSize && Array.isArray(e.words)
            }, a.max = function (e, t) {
                return e.cmp(t) > 0 ? e : t
            }, a.min = function (e, t) {
                return e.cmp(t) < 0 ? e : t
            }, a.prototype._init = function (e, t, r) {
                if ("number" == typeof e) return this._initNumber(e, t, r);
                if ("object" == typeof e) return this._initArray(e, t, r);
                "hex" === t && (t = 16), i(t === (0 | t) && t >= 2 && t <= 36);
                var n = 0;
                "-" === (e = e.toString().replace(/\s+/g, ""))[0] && (n++, this.negative = 1), n < e.length && (16 === t ? this._parseHex(e, n, r) : (this._parseBase(e, t, n), "le" === r && this._initArray(this.toArray(), t, r)))
            }, a.prototype._initNumber = function (e, t, r) {
                e < 0 && (this.negative = 1, e = -e), e < 67108864 ? (this.words = [67108863 & e], this.length = 1) : e < 4503599627370496 ? (this.words = [67108863 & e, e / 67108864 & 67108863], this.length = 2) : (i(e < 9007199254740992), this.words = [67108863 & e, e / 67108864 & 67108863, 1], this.length = 3), "le" === r && this._initArray(this.toArray(), t, r)
            }, a.prototype._initArray = function (e, t, r) {
                if (i("number" == typeof e.length), e.length <= 0) return this.words = [0], this.length = 1, this;
                this.length = Math.ceil(e.length / 3), this.words = new Array(this.length);
                for (var n = 0; n < this.length; n++) this.words[n] = 0;
                var a, s, o = 0;
                if ("be" === r) for (n = e.length - 1, a = 0; n >= 0; n -= 3) s = e[n] | e[n - 1] << 8 | e[n - 2] << 16, this.words[a] |= s << o & 67108863, this.words[a + 1] = s >>> 26 - o & 67108863, (o += 24) >= 26 && (o -= 26, a++); else if ("le" === r) for (n = 0, a = 0; n < e.length; n += 3) s = e[n] | e[n + 1] << 8 | e[n + 2] << 16, this.words[a] |= s << o & 67108863, this.words[a + 1] = s >>> 26 - o & 67108863, (o += 24) >= 26 && (o -= 26, a++);
                return this.strip()
            }, a.prototype._parseHex = function (e, t, r) {
                this.length = Math.ceil((e.length - t) / 6), this.words = new Array(this.length);
                for (var i = 0; i < this.length; i++) this.words[i] = 0;
                var n, a = 0, s = 0;
                if ("be" === r) for (i = e.length - 1; i >= t; i -= 2) n = c(e, t, i) << a, this.words[s] |= 67108863 & n, a >= 18 ? (a -= 18, s += 1, this.words[s] |= n >>> 26) : a += 8; else for (i = (e.length - t) % 2 == 0 ? t + 1 : t; i < e.length; i += 2) n = c(e, t, i) << a, this.words[s] |= 67108863 & n, a >= 18 ? (a -= 18, s += 1, this.words[s] |= n >>> 26) : a += 8;
                this.strip()
            }, a.prototype._parseBase = function (e, t, r) {
                this.words = [0], this.length = 1;
                for (var i = 0, n = 1; n <= 67108863; n *= t) i++;
                i--, n = n / t | 0;
                for (var a = e.length - r, s = a % i, o = Math.min(a, a - s) + r, c = 0, d = r; d < o; d += i) c = f(e, d, d + i, t), this.imuln(n), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c);
                if (0 !== s) {
                    var u = 1;
                    for (c = f(e, d, e.length, t), d = 0; d < s; d++) u *= t;
                    this.imuln(u), this.words[0] + c < 67108864 ? this.words[0] += c : this._iaddn(c)
                }
                this.strip()
            }, a.prototype.copy = function (e) {
                e.words = new Array(this.length);
                for (var t = 0; t < this.length; t++) e.words[t] = this.words[t];
                e.length = this.length, e.negative = this.negative, e.red = this.red
            }, a.prototype.clone = function () {
                var e = new a(null);
                return this.copy(e), e
            }, a.prototype._expand = function (e) {
                for (; this.length < e;) this.words[this.length++] = 0;
                return this
            }, a.prototype.strip = function () {
                for (; this.length > 1 && 0 === this.words[this.length - 1];) this.length--;
                return this._normSign()
            }, a.prototype._normSign = function () {
                return 1 === this.length && 0 === this.words[0] && (this.negative = 0), this
            }, a.prototype.inspect = function () {
                return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">"
            };
            var d = ["", "0", "00", "000", "0000", "00000", "000000", "0000000", "00000000", "000000000", "0000000000", "00000000000", "000000000000", "0000000000000", "00000000000000", "000000000000000", "0000000000000000", "00000000000000000", "000000000000000000", "0000000000000000000", "00000000000000000000", "000000000000000000000", "0000000000000000000000", "00000000000000000000000", "000000000000000000000000", "0000000000000000000000000"],
                u = [0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
                l = [0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536, 11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101, 5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176];

            function h(e, t, r) {
                r.negative = t.negative ^ e.negative;
                var i = e.length + t.length | 0;
                r.length = i, i = i - 1 | 0;
                var n = 0 | e.words[0], a = 0 | t.words[0], s = n * a, o = 67108863 & s, c = s / 67108864 | 0;
                r.words[0] = o;
                for (var f = 1; f < i; f++) {
                    for (var d = c >>> 26, u = 67108863 & c, l = Math.min(f, t.length - 1), h = Math.max(0, f - e.length + 1); h <= l; h++) {
                        var p = f - h | 0;
                        d += (s = (n = 0 | e.words[p]) * (a = 0 | t.words[h]) + u) / 67108864 | 0, u = 67108863 & s
                    }
                    r.words[f] = 0 | u, c = 0 | d
                }
                return 0 !== c ? r.words[f] = 0 | c : r.length--, r.strip()
            }

            a.prototype.toString = function (e, t) {
                var r;
                if (t = 0 | t || 1, 16 === (e = e || 10) || "hex" === e) {
                    r = "";
                    for (var n = 0, a = 0, s = 0; s < this.length; s++) {
                        var o = this.words[s], c = (16777215 & (o << n | a)).toString(16);
                        r = 0 !== (a = o >>> 24 - n & 16777215) || s !== this.length - 1 ? d[6 - c.length] + c + r : c + r, (n += 2) >= 26 && (n -= 26, s--)
                    }
                    for (0 !== a && (r = a.toString(16) + r); r.length % t != 0;) r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r), r
                }
                if (e === (0 | e) && e >= 2 && e <= 36) {
                    var f = u[e], h = l[e];
                    r = "";
                    var p = this.clone();
                    for (p.negative = 0; !p.isZero();) {
                        var g = p.modn(h).toString(e);
                        r = (p = p.idivn(h)).isZero() ? g + r : d[f - g.length] + g + r
                    }
                    for (this.isZero() && (r = "0" + r); r.length % t != 0;) r = "0" + r;
                    return 0 !== this.negative && (r = "-" + r), r
                }
                i(!1, "Base should be between 2 and 36")
            }, a.prototype.toNumber = function () {
                var e = this.words[0];
                return 2 === this.length ? e += 67108864 * this.words[1] : 3 === this.length && 1 === this.words[2] ? e += 4503599627370496 + 67108864 * this.words[1] : this.length > 2 && i(!1, "Number can only safely store up to 53 bits"), 0 !== this.negative ? -e : e
            }, a.prototype.toJSON = function () {
                return this.toString(16)
            }, a.prototype.toBuffer = function (e, t) {
                return i(void 0 !== s), this.toArrayLike(s, e, t)
            }, a.prototype.toArray = function (e, t) {
                return this.toArrayLike(Array, e, t)
            }, a.prototype.toArrayLike = function (e, t, r) {
                var n = this.byteLength(), a = r || Math.max(1, n);
                i(n <= a, "byte array longer than desired length"), i(a > 0, "Requested array length <= 0"), this.strip();
                var s, o, c = "le" === t, f = new e(a), d = this.clone();
                if (c) {
                    for (o = 0; !d.isZero(); o++) s = d.andln(255), d.iushrn(8), f[o] = s;
                    for (; o < a; o++) f[o] = 0
                } else {
                    for (o = 0; o < a - n; o++) f[o] = 0;
                    for (o = 0; !d.isZero(); o++) s = d.andln(255), d.iushrn(8), f[a - o - 1] = s
                }
                return f
            }, Math.clz32 ? a.prototype._countBits = function (e) {
                return 32 - Math.clz32(e)
            } : a.prototype._countBits = function (e) {
                var t = e, r = 0;
                return t >= 4096 && (r += 13, t >>>= 13), t >= 64 && (r += 7, t >>>= 7), t >= 8 && (r += 4, t >>>= 4), t >= 2 && (r += 2, t >>>= 2), r + t
            }, a.prototype._zeroBits = function (e) {
                if (0 === e) return 26;
                var t = e, r = 0;
                return 0 == (8191 & t) && (r += 13, t >>>= 13), 0 == (127 & t) && (r += 7, t >>>= 7), 0 == (15 & t) && (r += 4, t >>>= 4), 0 == (3 & t) && (r += 2, t >>>= 2), 0 == (1 & t) && r++, r
            }, a.prototype.bitLength = function () {
                var e = this.words[this.length - 1], t = this._countBits(e);
                return 26 * (this.length - 1) + t
            }, a.prototype.zeroBits = function () {
                if (this.isZero()) return 0;
                for (var e = 0, t = 0; t < this.length; t++) {
                    var r = this._zeroBits(this.words[t]);
                    if (e += r, 26 !== r) break
                }
                return e
            }, a.prototype.byteLength = function () {
                return Math.ceil(this.bitLength() / 8)
            }, a.prototype.toTwos = function (e) {
                return 0 !== this.negative ? this.abs().inotn(e).iaddn(1) : this.clone()
            }, a.prototype.fromTwos = function (e) {
                return this.testn(e - 1) ? this.notn(e).iaddn(1).ineg() : this.clone()
            }, a.prototype.isNeg = function () {
                return 0 !== this.negative
            }, a.prototype.neg = function () {
                return this.clone().ineg()
            }, a.prototype.ineg = function () {
                return this.isZero() || (this.negative ^= 1), this
            }, a.prototype.iuor = function (e) {
                for (; this.length < e.length;) this.words[this.length++] = 0;
                for (var t = 0; t < e.length; t++) this.words[t] = this.words[t] | e.words[t];
                return this.strip()
            }, a.prototype.ior = function (e) {
                return i(0 == (this.negative | e.negative)), this.iuor(e)
            }, a.prototype.or = function (e) {
                return this.length > e.length ? this.clone().ior(e) : e.clone().ior(this)
            }, a.prototype.uor = function (e) {
                return this.length > e.length ? this.clone().iuor(e) : e.clone().iuor(this)
            }, a.prototype.iuand = function (e) {
                var t;
                t = this.length > e.length ? e : this;
                for (var r = 0; r < t.length; r++) this.words[r] = this.words[r] & e.words[r];
                return this.length = t.length, this.strip()
            }, a.prototype.iand = function (e) {
                return i(0 == (this.negative | e.negative)), this.iuand(e)
            }, a.prototype.and = function (e) {
                return this.length > e.length ? this.clone().iand(e) : e.clone().iand(this)
            }, a.prototype.uand = function (e) {
                return this.length > e.length ? this.clone().iuand(e) : e.clone().iuand(this)
            }, a.prototype.iuxor = function (e) {
                var t, r;
                this.length > e.length ? (t = this, r = e) : (t = e, r = this);
                for (var i = 0; i < r.length; i++) this.words[i] = t.words[i] ^ r.words[i];
                if (this !== t) for (; i < t.length; i++) this.words[i] = t.words[i];
                return this.length = t.length, this.strip()
            }, a.prototype.ixor = function (e) {
                return i(0 == (this.negative | e.negative)), this.iuxor(e)
            }, a.prototype.xor = function (e) {
                return this.length > e.length ? this.clone().ixor(e) : e.clone().ixor(this)
            }, a.prototype.uxor = function (e) {
                return this.length > e.length ? this.clone().iuxor(e) : e.clone().iuxor(this)
            }, a.prototype.inotn = function (e) {
                i("number" == typeof e && e >= 0);
                var t = 0 | Math.ceil(e / 26), r = e % 26;
                this._expand(t), r > 0 && t--;
                for (var n = 0; n < t; n++) this.words[n] = 67108863 & ~this.words[n];
                return r > 0 && (this.words[n] = ~this.words[n] & 67108863 >> 26 - r), this.strip()
            }, a.prototype.notn = function (e) {
                return this.clone().inotn(e)
            }, a.prototype.setn = function (e, t) {
                i("number" == typeof e && e >= 0);
                var r = e / 26 | 0, n = e % 26;
                return this._expand(r + 1), this.words[r] = t ? this.words[r] | 1 << n : this.words[r] & ~(1 << n), this.strip()
            }, a.prototype.iadd = function (e) {
                var t, r, i;
                if (0 !== this.negative && 0 === e.negative) return this.negative = 0, t = this.isub(e), this.negative ^= 1, this._normSign();
                if (0 === this.negative && 0 !== e.negative) return e.negative = 0, t = this.isub(e), e.negative = 1, t._normSign();
                this.length > e.length ? (r = this, i = e) : (r = e, i = this);
                for (var n = 0, a = 0; a < i.length; a++) t = (0 | r.words[a]) + (0 | i.words[a]) + n, this.words[a] = 67108863 & t, n = t >>> 26;
                for (; 0 !== n && a < r.length; a++) t = (0 | r.words[a]) + n, this.words[a] = 67108863 & t, n = t >>> 26;
                if (this.length = r.length, 0 !== n) this.words[this.length] = n, this.length++; else if (r !== this) for (; a < r.length; a++) this.words[a] = r.words[a];
                return this
            }, a.prototype.add = function (e) {
                var t;
                return 0 !== e.negative && 0 === this.negative ? (e.negative = 0, t = this.sub(e), e.negative ^= 1, t) : 0 === e.negative && 0 !== this.negative ? (this.negative = 0, t = e.sub(this), this.negative = 1, t) : this.length > e.length ? this.clone().iadd(e) : e.clone().iadd(this)
            }, a.prototype.isub = function (e) {
                if (0 !== e.negative) {
                    e.negative = 0;
                    var t = this.iadd(e);
                    return e.negative = 1, t._normSign()
                }
                if (0 !== this.negative) return this.negative = 0, this.iadd(e), this.negative = 1, this._normSign();
                var r, i, n = this.cmp(e);
                if (0 === n) return this.negative = 0, this.length = 1, this.words[0] = 0, this;
                n > 0 ? (r = this, i = e) : (r = e, i = this);
                for (var a = 0, s = 0; s < i.length; s++) a = (t = (0 | r.words[s]) - (0 | i.words[s]) + a) >> 26, this.words[s] = 67108863 & t;
                for (; 0 !== a && s < r.length; s++) a = (t = (0 | r.words[s]) + a) >> 26, this.words[s] = 67108863 & t;
                if (0 === a && s < r.length && r !== this) for (; s < r.length; s++) this.words[s] = r.words[s];
                return this.length = Math.max(this.length, s), r !== this && (this.negative = 1), this.strip()
            }, a.prototype.sub = function (e) {
                return this.clone().isub(e)
            };
            var p = function (e, t, r) {
                var i, n, a, s = e.words, o = t.words, c = r.words, f = 0, d = 0 | s[0], u = 8191 & d, l = d >>> 13,
                    h = 0 | s[1], p = 8191 & h, g = h >>> 13, y = 0 | s[2], m = 8191 & y, v = y >>> 13, b = 0 | s[3],
                    w = 8191 & b, E = b >>> 13, C = 0 | s[4], S = 8191 & C, I = C >>> 13, A = 0 | s[5], _ = 8191 & A,
                    T = A >>> 13, B = 0 | s[6], N = 8191 & B, k = B >>> 13, R = 0 | s[7], L = 8191 & R, M = R >>> 13,
                    U = 0 | s[8], P = 8191 & U, D = U >>> 13, x = 0 | s[9], O = 8191 & x, V = x >>> 13, K = 0 | o[0],
                    z = 8191 & K, q = K >>> 13, F = 0 | o[1], j = 8191 & F, H = F >>> 13, G = 0 | o[2], W = 8191 & G,
                    Q = G >>> 13, Z = 0 | o[3], X = 8191 & Z, Y = Z >>> 13, $ = 0 | o[4], J = 8191 & $, ee = $ >>> 13,
                    te = 0 | o[5], re = 8191 & te, ie = te >>> 13, ne = 0 | o[6], ae = 8191 & ne, se = ne >>> 13,
                    oe = 0 | o[7], ce = 8191 & oe, fe = oe >>> 13, de = 0 | o[8], ue = 8191 & de, le = de >>> 13,
                    he = 0 | o[9], pe = 8191 & he, ge = he >>> 13;
                r.negative = e.negative ^ t.negative, r.length = 19;
                var ye = (f + (i = Math.imul(u, z)) | 0) + ((8191 & (n = (n = Math.imul(u, q)) + Math.imul(l, z) | 0)) << 13) | 0;
                f = ((a = Math.imul(l, q)) + (n >>> 13) | 0) + (ye >>> 26) | 0, ye &= 67108863, i = Math.imul(p, z), n = (n = Math.imul(p, q)) + Math.imul(g, z) | 0, a = Math.imul(g, q);
                var me = (f + (i = i + Math.imul(u, j) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, H) | 0) + Math.imul(l, j) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, H) | 0) + (n >>> 13) | 0) + (me >>> 26) | 0, me &= 67108863, i = Math.imul(m, z), n = (n = Math.imul(m, q)) + Math.imul(v, z) | 0, a = Math.imul(v, q), i = i + Math.imul(p, j) | 0, n = (n = n + Math.imul(p, H) | 0) + Math.imul(g, j) | 0, a = a + Math.imul(g, H) | 0;
                var ve = (f + (i = i + Math.imul(u, W) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, Q) | 0) + Math.imul(l, W) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, Q) | 0) + (n >>> 13) | 0) + (ve >>> 26) | 0, ve &= 67108863, i = Math.imul(w, z), n = (n = Math.imul(w, q)) + Math.imul(E, z) | 0, a = Math.imul(E, q), i = i + Math.imul(m, j) | 0, n = (n = n + Math.imul(m, H) | 0) + Math.imul(v, j) | 0, a = a + Math.imul(v, H) | 0, i = i + Math.imul(p, W) | 0, n = (n = n + Math.imul(p, Q) | 0) + Math.imul(g, W) | 0, a = a + Math.imul(g, Q) | 0;
                var be = (f + (i = i + Math.imul(u, X) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, Y) | 0) + Math.imul(l, X) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, Y) | 0) + (n >>> 13) | 0) + (be >>> 26) | 0, be &= 67108863, i = Math.imul(S, z), n = (n = Math.imul(S, q)) + Math.imul(I, z) | 0, a = Math.imul(I, q), i = i + Math.imul(w, j) | 0, n = (n = n + Math.imul(w, H) | 0) + Math.imul(E, j) | 0, a = a + Math.imul(E, H) | 0, i = i + Math.imul(m, W) | 0, n = (n = n + Math.imul(m, Q) | 0) + Math.imul(v, W) | 0, a = a + Math.imul(v, Q) | 0, i = i + Math.imul(p, X) | 0, n = (n = n + Math.imul(p, Y) | 0) + Math.imul(g, X) | 0, a = a + Math.imul(g, Y) | 0;
                var we = (f + (i = i + Math.imul(u, J) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, ee) | 0) + Math.imul(l, J) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, ee) | 0) + (n >>> 13) | 0) + (we >>> 26) | 0, we &= 67108863, i = Math.imul(_, z), n = (n = Math.imul(_, q)) + Math.imul(T, z) | 0, a = Math.imul(T, q), i = i + Math.imul(S, j) | 0, n = (n = n + Math.imul(S, H) | 0) + Math.imul(I, j) | 0, a = a + Math.imul(I, H) | 0, i = i + Math.imul(w, W) | 0, n = (n = n + Math.imul(w, Q) | 0) + Math.imul(E, W) | 0, a = a + Math.imul(E, Q) | 0, i = i + Math.imul(m, X) | 0, n = (n = n + Math.imul(m, Y) | 0) + Math.imul(v, X) | 0, a = a + Math.imul(v, Y) | 0, i = i + Math.imul(p, J) | 0, n = (n = n + Math.imul(p, ee) | 0) + Math.imul(g, J) | 0, a = a + Math.imul(g, ee) | 0;
                var Ee = (f + (i = i + Math.imul(u, re) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, ie) | 0) + Math.imul(l, re) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, ie) | 0) + (n >>> 13) | 0) + (Ee >>> 26) | 0, Ee &= 67108863, i = Math.imul(N, z), n = (n = Math.imul(N, q)) + Math.imul(k, z) | 0, a = Math.imul(k, q), i = i + Math.imul(_, j) | 0, n = (n = n + Math.imul(_, H) | 0) + Math.imul(T, j) | 0, a = a + Math.imul(T, H) | 0, i = i + Math.imul(S, W) | 0, n = (n = n + Math.imul(S, Q) | 0) + Math.imul(I, W) | 0, a = a + Math.imul(I, Q) | 0, i = i + Math.imul(w, X) | 0, n = (n = n + Math.imul(w, Y) | 0) + Math.imul(E, X) | 0, a = a + Math.imul(E, Y) | 0, i = i + Math.imul(m, J) | 0, n = (n = n + Math.imul(m, ee) | 0) + Math.imul(v, J) | 0, a = a + Math.imul(v, ee) | 0, i = i + Math.imul(p, re) | 0, n = (n = n + Math.imul(p, ie) | 0) + Math.imul(g, re) | 0, a = a + Math.imul(g, ie) | 0;
                var Ce = (f + (i = i + Math.imul(u, ae) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, se) | 0) + Math.imul(l, ae) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, se) | 0) + (n >>> 13) | 0) + (Ce >>> 26) | 0, Ce &= 67108863, i = Math.imul(L, z), n = (n = Math.imul(L, q)) + Math.imul(M, z) | 0, a = Math.imul(M, q), i = i + Math.imul(N, j) | 0, n = (n = n + Math.imul(N, H) | 0) + Math.imul(k, j) | 0, a = a + Math.imul(k, H) | 0, i = i + Math.imul(_, W) | 0, n = (n = n + Math.imul(_, Q) | 0) + Math.imul(T, W) | 0, a = a + Math.imul(T, Q) | 0, i = i + Math.imul(S, X) | 0, n = (n = n + Math.imul(S, Y) | 0) + Math.imul(I, X) | 0, a = a + Math.imul(I, Y) | 0, i = i + Math.imul(w, J) | 0, n = (n = n + Math.imul(w, ee) | 0) + Math.imul(E, J) | 0, a = a + Math.imul(E, ee) | 0, i = i + Math.imul(m, re) | 0, n = (n = n + Math.imul(m, ie) | 0) + Math.imul(v, re) | 0, a = a + Math.imul(v, ie) | 0, i = i + Math.imul(p, ae) | 0, n = (n = n + Math.imul(p, se) | 0) + Math.imul(g, ae) | 0, a = a + Math.imul(g, se) | 0;
                var Se = (f + (i = i + Math.imul(u, ce) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, fe) | 0) + Math.imul(l, ce) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, fe) | 0) + (n >>> 13) | 0) + (Se >>> 26) | 0, Se &= 67108863, i = Math.imul(P, z), n = (n = Math.imul(P, q)) + Math.imul(D, z) | 0, a = Math.imul(D, q), i = i + Math.imul(L, j) | 0, n = (n = n + Math.imul(L, H) | 0) + Math.imul(M, j) | 0, a = a + Math.imul(M, H) | 0, i = i + Math.imul(N, W) | 0, n = (n = n + Math.imul(N, Q) | 0) + Math.imul(k, W) | 0, a = a + Math.imul(k, Q) | 0, i = i + Math.imul(_, X) | 0, n = (n = n + Math.imul(_, Y) | 0) + Math.imul(T, X) | 0, a = a + Math.imul(T, Y) | 0, i = i + Math.imul(S, J) | 0, n = (n = n + Math.imul(S, ee) | 0) + Math.imul(I, J) | 0, a = a + Math.imul(I, ee) | 0, i = i + Math.imul(w, re) | 0, n = (n = n + Math.imul(w, ie) | 0) + Math.imul(E, re) | 0, a = a + Math.imul(E, ie) | 0, i = i + Math.imul(m, ae) | 0, n = (n = n + Math.imul(m, se) | 0) + Math.imul(v, ae) | 0, a = a + Math.imul(v, se) | 0, i = i + Math.imul(p, ce) | 0, n = (n = n + Math.imul(p, fe) | 0) + Math.imul(g, ce) | 0, a = a + Math.imul(g, fe) | 0;
                var Ie = (f + (i = i + Math.imul(u, ue) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, le) | 0) + Math.imul(l, ue) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, le) | 0) + (n >>> 13) | 0) + (Ie >>> 26) | 0, Ie &= 67108863, i = Math.imul(O, z), n = (n = Math.imul(O, q)) + Math.imul(V, z) | 0, a = Math.imul(V, q), i = i + Math.imul(P, j) | 0, n = (n = n + Math.imul(P, H) | 0) + Math.imul(D, j) | 0, a = a + Math.imul(D, H) | 0, i = i + Math.imul(L, W) | 0, n = (n = n + Math.imul(L, Q) | 0) + Math.imul(M, W) | 0, a = a + Math.imul(M, Q) | 0, i = i + Math.imul(N, X) | 0, n = (n = n + Math.imul(N, Y) | 0) + Math.imul(k, X) | 0, a = a + Math.imul(k, Y) | 0, i = i + Math.imul(_, J) | 0, n = (n = n + Math.imul(_, ee) | 0) + Math.imul(T, J) | 0, a = a + Math.imul(T, ee) | 0, i = i + Math.imul(S, re) | 0, n = (n = n + Math.imul(S, ie) | 0) + Math.imul(I, re) | 0, a = a + Math.imul(I, ie) | 0, i = i + Math.imul(w, ae) | 0, n = (n = n + Math.imul(w, se) | 0) + Math.imul(E, ae) | 0, a = a + Math.imul(E, se) | 0, i = i + Math.imul(m, ce) | 0, n = (n = n + Math.imul(m, fe) | 0) + Math.imul(v, ce) | 0, a = a + Math.imul(v, fe) | 0, i = i + Math.imul(p, ue) | 0, n = (n = n + Math.imul(p, le) | 0) + Math.imul(g, ue) | 0, a = a + Math.imul(g, le) | 0;
                var Ae = (f + (i = i + Math.imul(u, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(u, ge) | 0) + Math.imul(l, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(l, ge) | 0) + (n >>> 13) | 0) + (Ae >>> 26) | 0, Ae &= 67108863, i = Math.imul(O, j), n = (n = Math.imul(O, H)) + Math.imul(V, j) | 0, a = Math.imul(V, H), i = i + Math.imul(P, W) | 0, n = (n = n + Math.imul(P, Q) | 0) + Math.imul(D, W) | 0, a = a + Math.imul(D, Q) | 0, i = i + Math.imul(L, X) | 0, n = (n = n + Math.imul(L, Y) | 0) + Math.imul(M, X) | 0, a = a + Math.imul(M, Y) | 0, i = i + Math.imul(N, J) | 0, n = (n = n + Math.imul(N, ee) | 0) + Math.imul(k, J) | 0, a = a + Math.imul(k, ee) | 0, i = i + Math.imul(_, re) | 0, n = (n = n + Math.imul(_, ie) | 0) + Math.imul(T, re) | 0, a = a + Math.imul(T, ie) | 0, i = i + Math.imul(S, ae) | 0, n = (n = n + Math.imul(S, se) | 0) + Math.imul(I, ae) | 0, a = a + Math.imul(I, se) | 0, i = i + Math.imul(w, ce) | 0, n = (n = n + Math.imul(w, fe) | 0) + Math.imul(E, ce) | 0, a = a + Math.imul(E, fe) | 0, i = i + Math.imul(m, ue) | 0, n = (n = n + Math.imul(m, le) | 0) + Math.imul(v, ue) | 0, a = a + Math.imul(v, le) | 0;
                var _e = (f + (i = i + Math.imul(p, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(p, ge) | 0) + Math.imul(g, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(g, ge) | 0) + (n >>> 13) | 0) + (_e >>> 26) | 0, _e &= 67108863, i = Math.imul(O, W), n = (n = Math.imul(O, Q)) + Math.imul(V, W) | 0, a = Math.imul(V, Q), i = i + Math.imul(P, X) | 0, n = (n = n + Math.imul(P, Y) | 0) + Math.imul(D, X) | 0, a = a + Math.imul(D, Y) | 0, i = i + Math.imul(L, J) | 0, n = (n = n + Math.imul(L, ee) | 0) + Math.imul(M, J) | 0, a = a + Math.imul(M, ee) | 0, i = i + Math.imul(N, re) | 0, n = (n = n + Math.imul(N, ie) | 0) + Math.imul(k, re) | 0, a = a + Math.imul(k, ie) | 0, i = i + Math.imul(_, ae) | 0, n = (n = n + Math.imul(_, se) | 0) + Math.imul(T, ae) | 0, a = a + Math.imul(T, se) | 0, i = i + Math.imul(S, ce) | 0, n = (n = n + Math.imul(S, fe) | 0) + Math.imul(I, ce) | 0, a = a + Math.imul(I, fe) | 0, i = i + Math.imul(w, ue) | 0, n = (n = n + Math.imul(w, le) | 0) + Math.imul(E, ue) | 0, a = a + Math.imul(E, le) | 0;
                var Te = (f + (i = i + Math.imul(m, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(m, ge) | 0) + Math.imul(v, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(v, ge) | 0) + (n >>> 13) | 0) + (Te >>> 26) | 0, Te &= 67108863, i = Math.imul(O, X), n = (n = Math.imul(O, Y)) + Math.imul(V, X) | 0, a = Math.imul(V, Y), i = i + Math.imul(P, J) | 0, n = (n = n + Math.imul(P, ee) | 0) + Math.imul(D, J) | 0, a = a + Math.imul(D, ee) | 0, i = i + Math.imul(L, re) | 0, n = (n = n + Math.imul(L, ie) | 0) + Math.imul(M, re) | 0, a = a + Math.imul(M, ie) | 0, i = i + Math.imul(N, ae) | 0, n = (n = n + Math.imul(N, se) | 0) + Math.imul(k, ae) | 0, a = a + Math.imul(k, se) | 0, i = i + Math.imul(_, ce) | 0, n = (n = n + Math.imul(_, fe) | 0) + Math.imul(T, ce) | 0, a = a + Math.imul(T, fe) | 0, i = i + Math.imul(S, ue) | 0, n = (n = n + Math.imul(S, le) | 0) + Math.imul(I, ue) | 0, a = a + Math.imul(I, le) | 0;
                var Be = (f + (i = i + Math.imul(w, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(w, ge) | 0) + Math.imul(E, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(E, ge) | 0) + (n >>> 13) | 0) + (Be >>> 26) | 0, Be &= 67108863, i = Math.imul(O, J), n = (n = Math.imul(O, ee)) + Math.imul(V, J) | 0, a = Math.imul(V, ee), i = i + Math.imul(P, re) | 0, n = (n = n + Math.imul(P, ie) | 0) + Math.imul(D, re) | 0, a = a + Math.imul(D, ie) | 0, i = i + Math.imul(L, ae) | 0, n = (n = n + Math.imul(L, se) | 0) + Math.imul(M, ae) | 0, a = a + Math.imul(M, se) | 0, i = i + Math.imul(N, ce) | 0, n = (n = n + Math.imul(N, fe) | 0) + Math.imul(k, ce) | 0, a = a + Math.imul(k, fe) | 0, i = i + Math.imul(_, ue) | 0, n = (n = n + Math.imul(_, le) | 0) + Math.imul(T, ue) | 0, a = a + Math.imul(T, le) | 0;
                var Ne = (f + (i = i + Math.imul(S, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(S, ge) | 0) + Math.imul(I, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(I, ge) | 0) + (n >>> 13) | 0) + (Ne >>> 26) | 0, Ne &= 67108863, i = Math.imul(O, re), n = (n = Math.imul(O, ie)) + Math.imul(V, re) | 0, a = Math.imul(V, ie), i = i + Math.imul(P, ae) | 0, n = (n = n + Math.imul(P, se) | 0) + Math.imul(D, ae) | 0, a = a + Math.imul(D, se) | 0, i = i + Math.imul(L, ce) | 0, n = (n = n + Math.imul(L, fe) | 0) + Math.imul(M, ce) | 0, a = a + Math.imul(M, fe) | 0, i = i + Math.imul(N, ue) | 0, n = (n = n + Math.imul(N, le) | 0) + Math.imul(k, ue) | 0, a = a + Math.imul(k, le) | 0;
                var ke = (f + (i = i + Math.imul(_, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(_, ge) | 0) + Math.imul(T, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(T, ge) | 0) + (n >>> 13) | 0) + (ke >>> 26) | 0, ke &= 67108863, i = Math.imul(O, ae), n = (n = Math.imul(O, se)) + Math.imul(V, ae) | 0, a = Math.imul(V, se), i = i + Math.imul(P, ce) | 0, n = (n = n + Math.imul(P, fe) | 0) + Math.imul(D, ce) | 0, a = a + Math.imul(D, fe) | 0, i = i + Math.imul(L, ue) | 0, n = (n = n + Math.imul(L, le) | 0) + Math.imul(M, ue) | 0, a = a + Math.imul(M, le) | 0;
                var Re = (f + (i = i + Math.imul(N, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(N, ge) | 0) + Math.imul(k, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(k, ge) | 0) + (n >>> 13) | 0) + (Re >>> 26) | 0, Re &= 67108863, i = Math.imul(O, ce), n = (n = Math.imul(O, fe)) + Math.imul(V, ce) | 0, a = Math.imul(V, fe), i = i + Math.imul(P, ue) | 0, n = (n = n + Math.imul(P, le) | 0) + Math.imul(D, ue) | 0, a = a + Math.imul(D, le) | 0;
                var Le = (f + (i = i + Math.imul(L, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(L, ge) | 0) + Math.imul(M, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(M, ge) | 0) + (n >>> 13) | 0) + (Le >>> 26) | 0, Le &= 67108863, i = Math.imul(O, ue), n = (n = Math.imul(O, le)) + Math.imul(V, ue) | 0, a = Math.imul(V, le);
                var Me = (f + (i = i + Math.imul(P, pe) | 0) | 0) + ((8191 & (n = (n = n + Math.imul(P, ge) | 0) + Math.imul(D, pe) | 0)) << 13) | 0;
                f = ((a = a + Math.imul(D, ge) | 0) + (n >>> 13) | 0) + (Me >>> 26) | 0, Me &= 67108863;
                var Ue = (f + (i = Math.imul(O, pe)) | 0) + ((8191 & (n = (n = Math.imul(O, ge)) + Math.imul(V, pe) | 0)) << 13) | 0;
                return f = ((a = Math.imul(V, ge)) + (n >>> 13) | 0) + (Ue >>> 26) | 0, Ue &= 67108863, c[0] = ye, c[1] = me, c[2] = ve, c[3] = be, c[4] = we, c[5] = Ee, c[6] = Ce, c[7] = Se, c[8] = Ie, c[9] = Ae, c[10] = _e, c[11] = Te, c[12] = Be, c[13] = Ne, c[14] = ke, c[15] = Re, c[16] = Le, c[17] = Me, c[18] = Ue, 0 !== f && (c[19] = f, r.length++), r
            };

            function g(e, t, r) {
                return (new y).mulp(e, t, r)
            }

            function y(e, t) {
                this.x = e, this.y = t
            }

            Math.imul || (p = h), a.prototype.mulTo = function (e, t) {
                var r, i = this.length + e.length;
                return r = 10 === this.length && 10 === e.length ? p(this, e, t) : i < 63 ? h(this, e, t) : i < 1024 ? function (e, t, r) {
                    r.negative = t.negative ^ e.negative, r.length = e.length + t.length;
                    for (var i = 0, n = 0, a = 0; a < r.length - 1; a++) {
                        var s = n;
                        n = 0;
                        for (var o = 67108863 & i, c = Math.min(a, t.length - 1), f = Math.max(0, a - e.length + 1); f <= c; f++) {
                            var d = a - f, u = (0 | e.words[d]) * (0 | t.words[f]), l = 67108863 & u;
                            o = 67108863 & (l = l + o | 0), n += (s = (s = s + (u / 67108864 | 0) | 0) + (l >>> 26) | 0) >>> 26, s &= 67108863
                        }
                        r.words[a] = o, i = s, s = n
                    }
                    return 0 !== i ? r.words[a] = i : r.length--, r.strip()
                }(this, e, t) : g(this, e, t), r
            }, y.prototype.makeRBT = function (e) {
                for (var t = new Array(e), r = a.prototype._countBits(e) - 1, i = 0; i < e; i++) t[i] = this.revBin(i, r, e);
                return t
            }, y.prototype.revBin = function (e, t, r) {
                if (0 === e || e === r - 1) return e;
                for (var i = 0, n = 0; n < t; n++) i |= (1 & e) << t - n - 1, e >>= 1;
                return i
            }, y.prototype.permute = function (e, t, r, i, n, a) {
                for (var s = 0; s < a; s++) i[s] = t[e[s]], n[s] = r[e[s]]
            }, y.prototype.transform = function (e, t, r, i, n, a) {
                this.permute(a, e, t, r, i, n);
                for (var s = 1; s < n; s <<= 1) for (var o = s << 1, c = Math.cos(2 * Math.PI / o), f = Math.sin(2 * Math.PI / o), d = 0; d < n; d += o) for (var u = c, l = f, h = 0; h < s; h++) {
                    var p = r[d + h], g = i[d + h], y = r[d + h + s], m = i[d + h + s], v = u * y - l * m;
                    m = u * m + l * y, y = v, r[d + h] = p + y, i[d + h] = g + m, r[d + h + s] = p - y, i[d + h + s] = g - m, h !== o && (v = c * u - f * l, l = c * l + f * u, u = v)
                }
            }, y.prototype.guessLen13b = function (e, t) {
                var r = 1 | Math.max(t, e), i = 1 & r, n = 0;
                for (r = r / 2 | 0; r; r >>>= 1) n++;
                return 1 << n + 1 + i
            }, y.prototype.conjugate = function (e, t, r) {
                if (!(r <= 1)) for (var i = 0; i < r / 2; i++) {
                    var n = e[i];
                    e[i] = e[r - i - 1], e[r - i - 1] = n, n = t[i], t[i] = -t[r - i - 1], t[r - i - 1] = -n
                }
            }, y.prototype.normalize13b = function (e, t) {
                for (var r = 0, i = 0; i < t / 2; i++) {
                    var n = 8192 * Math.round(e[2 * i + 1] / t) + Math.round(e[2 * i] / t) + r;
                    e[i] = 67108863 & n, r = n < 67108864 ? 0 : n / 67108864 | 0
                }
                return e
            }, y.prototype.convert13b = function (e, t, r, n) {
                for (var a = 0, s = 0; s < t; s++) a += 0 | e[s], r[2 * s] = 8191 & a, a >>>= 13, r[2 * s + 1] = 8191 & a, a >>>= 13;
                for (s = 2 * t; s < n; ++s) r[s] = 0;
                i(0 === a), i(0 == (-8192 & a))
            }, y.prototype.stub = function (e) {
                for (var t = new Array(e), r = 0; r < e; r++) t[r] = 0;
                return t
            }, y.prototype.mulp = function (e, t, r) {
                var i = 2 * this.guessLen13b(e.length, t.length), n = this.makeRBT(i), a = this.stub(i),
                    s = new Array(i), o = new Array(i), c = new Array(i), f = new Array(i), d = new Array(i),
                    u = new Array(i), l = r.words;
                l.length = i, this.convert13b(e.words, e.length, s, i), this.convert13b(t.words, t.length, f, i), this.transform(s, a, o, c, i, n), this.transform(f, a, d, u, i, n);
                for (var h = 0; h < i; h++) {
                    var p = o[h] * d[h] - c[h] * u[h];
                    c[h] = o[h] * u[h] + c[h] * d[h], o[h] = p
                }
                return this.conjugate(o, c, i), this.transform(o, c, l, a, i, n), this.conjugate(l, a, i), this.normalize13b(l, i), r.negative = e.negative ^ t.negative, r.length = e.length + t.length, r.strip()
            }, a.prototype.mul = function (e) {
                var t = new a(null);
                return t.words = new Array(this.length + e.length), this.mulTo(e, t)
            }, a.prototype.mulf = function (e) {
                var t = new a(null);
                return t.words = new Array(this.length + e.length), g(this, e, t)
            }, a.prototype.imul = function (e) {
                return this.clone().mulTo(e, this)
            }, a.prototype.imuln = function (e) {
                i("number" == typeof e), i(e < 67108864);
                for (var t = 0, r = 0; r < this.length; r++) {
                    var n = (0 | this.words[r]) * e, a = (67108863 & n) + (67108863 & t);
                    t >>= 26, t += n / 67108864 | 0, t += a >>> 26, this.words[r] = 67108863 & a
                }
                return 0 !== t && (this.words[r] = t, this.length++), this
            }, a.prototype.muln = function (e) {
                return this.clone().imuln(e)
            }, a.prototype.sqr = function () {
                return this.mul(this)
            }, a.prototype.isqr = function () {
                return this.imul(this.clone())
            }, a.prototype.pow = function (e) {
                var t = function (e) {
                    for (var t = new Array(e.bitLength()), r = 0; r < t.length; r++) {
                        var i = r / 26 | 0, n = r % 26;
                        t[r] = (e.words[i] & 1 << n) >>> n
                    }
                    return t
                }(e);
                if (0 === t.length) return new a(1);
                for (var r = this, i = 0; i < t.length && 0 === t[i]; i++, r = r.sqr()) ;
                if (++i < t.length) for (var n = r.sqr(); i < t.length; i++, n = n.sqr()) 0 !== t[i] && (r = r.mul(n));
                return r
            }, a.prototype.iushln = function (e) {
                i("number" == typeof e && e >= 0);
                var t, r = e % 26, n = (e - r) / 26, a = 67108863 >>> 26 - r << 26 - r;
                if (0 !== r) {
                    var s = 0;
                    for (t = 0; t < this.length; t++) {
                        var o = this.words[t] & a, c = (0 | this.words[t]) - o << r;
                        this.words[t] = c | s, s = o >>> 26 - r
                    }
                    s && (this.words[t] = s, this.length++)
                }
                if (0 !== n) {
                    for (t = this.length - 1; t >= 0; t--) this.words[t + n] = this.words[t];
                    for (t = 0; t < n; t++) this.words[t] = 0;
                    this.length += n
                }
                return this.strip()
            }, a.prototype.ishln = function (e) {
                return i(0 === this.negative), this.iushln(e)
            }, a.prototype.iushrn = function (e, t, r) {
                var n;
                i("number" == typeof e && e >= 0), n = t ? (t - t % 26) / 26 : 0;
                var a = e % 26, s = Math.min((e - a) / 26, this.length), o = 67108863 ^ 67108863 >>> a << a, c = r;
                if (n -= s, n = Math.max(0, n), c) {
                    for (var f = 0; f < s; f++) c.words[f] = this.words[f];
                    c.length = s
                }
                if (0 === s) ; else if (this.length > s) for (this.length -= s, f = 0; f < this.length; f++) this.words[f] = this.words[f + s]; else this.words[0] = 0, this.length = 1;
                var d = 0;
                for (f = this.length - 1; f >= 0 && (0 !== d || f >= n); f--) {
                    var u = 0 | this.words[f];
                    this.words[f] = d << 26 - a | u >>> a, d = u & o
                }
                return c && 0 !== d && (c.words[c.length++] = d), 0 === this.length && (this.words[0] = 0, this.length = 1), this.strip()
            }, a.prototype.ishrn = function (e, t, r) {
                return i(0 === this.negative), this.iushrn(e, t, r)
            }, a.prototype.shln = function (e) {
                return this.clone().ishln(e)
            }, a.prototype.ushln = function (e) {
                return this.clone().iushln(e)
            }, a.prototype.shrn = function (e) {
                return this.clone().ishrn(e)
            }, a.prototype.ushrn = function (e) {
                return this.clone().iushrn(e)
            }, a.prototype.testn = function (e) {
                i("number" == typeof e && e >= 0);
                var t = e % 26, r = (e - t) / 26, n = 1 << t;
                return !(this.length <= r) && !!(this.words[r] & n)
            }, a.prototype.imaskn = function (e) {
                i("number" == typeof e && e >= 0);
                var t = e % 26, r = (e - t) / 26;
                if (i(0 === this.negative, "imaskn works only with positive numbers"), this.length <= r) return this;
                if (0 !== t && r++, this.length = Math.min(r, this.length), 0 !== t) {
                    var n = 67108863 ^ 67108863 >>> t << t;
                    this.words[this.length - 1] &= n
                }
                return this.strip()
            }, a.prototype.maskn = function (e) {
                return this.clone().imaskn(e)
            }, a.prototype.iaddn = function (e) {
                return i("number" == typeof e), i(e < 67108864), e < 0 ? this.isubn(-e) : 0 !== this.negative ? 1 === this.length && (0 | this.words[0]) < e ? (this.words[0] = e - (0 | this.words[0]), this.negative = 0, this) : (this.negative = 0, this.isubn(e), this.negative = 1, this) : this._iaddn(e)
            }, a.prototype._iaddn = function (e) {
                this.words[0] += e;
                for (var t = 0; t < this.length && this.words[t] >= 67108864; t++) this.words[t] -= 67108864, t === this.length - 1 ? this.words[t + 1] = 1 : this.words[t + 1]++;
                return this.length = Math.max(this.length, t + 1), this
            }, a.prototype.isubn = function (e) {
                if (i("number" == typeof e), i(e < 67108864), e < 0) return this.iaddn(-e);
                if (0 !== this.negative) return this.negative = 0, this.iaddn(e), this.negative = 1, this;
                if (this.words[0] -= e, 1 === this.length && this.words[0] < 0) this.words[0] = -this.words[0], this.negative = 1; else for (var t = 0; t < this.length && this.words[t] < 0; t++) this.words[t] += 67108864, this.words[t + 1] -= 1;
                return this.strip()
            }, a.prototype.addn = function (e) {
                return this.clone().iaddn(e)
            }, a.prototype.subn = function (e) {
                return this.clone().isubn(e)
            }, a.prototype.iabs = function () {
                return this.negative = 0, this
            }, a.prototype.abs = function () {
                return this.clone().iabs()
            }, a.prototype._ishlnsubmul = function (e, t, r) {
                var n, a, s = e.length + r;
                this._expand(s);
                var o = 0;
                for (n = 0; n < e.length; n++) {
                    a = (0 | this.words[n + r]) + o;
                    var c = (0 | e.words[n]) * t;
                    o = ((a -= 67108863 & c) >> 26) - (c / 67108864 | 0), this.words[n + r] = 67108863 & a
                }
                for (; n < this.length - r; n++) o = (a = (0 | this.words[n + r]) + o) >> 26, this.words[n + r] = 67108863 & a;
                if (0 === o) return this.strip();
                for (i(-1 === o), o = 0, n = 0; n < this.length; n++) o = (a = -(0 | this.words[n]) + o) >> 26, this.words[n] = 67108863 & a;
                return this.negative = 1, this.strip()
            }, a.prototype._wordDiv = function (e, t) {
                var r = (this.length, e.length), i = this.clone(), n = e, s = 0 | n.words[n.length - 1];
                0 !== (r = 26 - this._countBits(s)) && (n = n.ushln(r), i.iushln(r), s = 0 | n.words[n.length - 1]);
                var o, c = i.length - n.length;
                if ("mod" !== t) {
                    (o = new a(null)).length = c + 1, o.words = new Array(o.length);
                    for (var f = 0; f < o.length; f++) o.words[f] = 0
                }
                var d = i.clone()._ishlnsubmul(n, 1, c);
                0 === d.negative && (i = d, o && (o.words[c] = 1));
                for (var u = c - 1; u >= 0; u--) {
                    var l = 67108864 * (0 | i.words[n.length + u]) + (0 | i.words[n.length + u - 1]);
                    for (l = Math.min(l / s | 0, 67108863), i._ishlnsubmul(n, l, u); 0 !== i.negative;) l--, i.negative = 0, i._ishlnsubmul(n, 1, u), i.isZero() || (i.negative ^= 1);
                    o && (o.words[u] = l)
                }
                return o && o.strip(), i.strip(), "div" !== t && 0 !== r && i.iushrn(r), {div: o || null, mod: i}
            }, a.prototype.divmod = function (e, t, r) {
                return i(!e.isZero()), this.isZero() ? {
                    div: new a(0),
                    mod: new a(0)
                } : 0 !== this.negative && 0 === e.negative ? (o = this.neg().divmod(e, t), "mod" !== t && (n = o.div.neg()), "div" !== t && (s = o.mod.neg(), r && 0 !== s.negative && s.iadd(e)), {
                    div: n,
                    mod: s
                }) : 0 === this.negative && 0 !== e.negative ? (o = this.divmod(e.neg(), t), "mod" !== t && (n = o.div.neg()), {
                    div: n,
                    mod: o.mod
                }) : 0 != (this.negative & e.negative) ? (o = this.neg().divmod(e.neg(), t), "div" !== t && (s = o.mod.neg(), r && 0 !== s.negative && s.isub(e)), {
                    div: o.div,
                    mod: s
                }) : e.length > this.length || this.cmp(e) < 0 ? {
                    div: new a(0),
                    mod: this
                } : 1 === e.length ? "div" === t ? {div: this.divn(e.words[0]), mod: null} : "mod" === t ? {
                    div: null,
                    mod: new a(this.modn(e.words[0]))
                } : {div: this.divn(e.words[0]), mod: new a(this.modn(e.words[0]))} : this._wordDiv(e, t);
                var n, s, o
            }, a.prototype.div = function (e) {
                return this.divmod(e, "div", !1).div
            }, a.prototype.mod = function (e) {
                return this.divmod(e, "mod", !1).mod
            }, a.prototype.umod = function (e) {
                return this.divmod(e, "mod", !0).mod
            }, a.prototype.divRound = function (e) {
                var t = this.divmod(e);
                if (t.mod.isZero()) return t.div;
                var r = 0 !== t.div.negative ? t.mod.isub(e) : t.mod, i = e.ushrn(1), n = e.andln(1), a = r.cmp(i);
                return a < 0 || 1 === n && 0 === a ? t.div : 0 !== t.div.negative ? t.div.isubn(1) : t.div.iaddn(1)
            }, a.prototype.modn = function (e) {
                i(e <= 67108863);
                for (var t = (1 << 26) % e, r = 0, n = this.length - 1; n >= 0; n--) r = (t * r + (0 | this.words[n])) % e;
                return r
            }, a.prototype.idivn = function (e) {
                i(e <= 67108863);
                for (var t = 0, r = this.length - 1; r >= 0; r--) {
                    var n = (0 | this.words[r]) + 67108864 * t;
                    this.words[r] = n / e | 0, t = n % e
                }
                return this.strip()
            }, a.prototype.divn = function (e) {
                return this.clone().idivn(e)
            }, a.prototype.egcd = function (e) {
                i(0 === e.negative), i(!e.isZero());
                var t = this, r = e.clone();
                t = 0 !== t.negative ? t.umod(e) : t.clone();
                for (var n = new a(1), s = new a(0), o = new a(0), c = new a(1), f = 0; t.isEven() && r.isEven();) t.iushrn(1), r.iushrn(1), ++f;
                for (var d = r.clone(), u = t.clone(); !t.isZero();) {
                    for (var l = 0, h = 1; 0 == (t.words[0] & h) && l < 26; ++l, h <<= 1) ;
                    if (l > 0) for (t.iushrn(l); l-- > 0;) (n.isOdd() || s.isOdd()) && (n.iadd(d), s.isub(u)), n.iushrn(1), s.iushrn(1);
                    for (var p = 0, g = 1; 0 == (r.words[0] & g) && p < 26; ++p, g <<= 1) ;
                    if (p > 0) for (r.iushrn(p); p-- > 0;) (o.isOdd() || c.isOdd()) && (o.iadd(d), c.isub(u)), o.iushrn(1), c.iushrn(1);
                    t.cmp(r) >= 0 ? (t.isub(r), n.isub(o), s.isub(c)) : (r.isub(t), o.isub(n), c.isub(s))
                }
                return {a: o, b: c, gcd: r.iushln(f)}
            }, a.prototype._invmp = function (e) {
                i(0 === e.negative), i(!e.isZero());
                var t = this, r = e.clone();
                t = 0 !== t.negative ? t.umod(e) : t.clone();
                for (var n, s = new a(1), o = new a(0), c = r.clone(); t.cmpn(1) > 0 && r.cmpn(1) > 0;) {
                    for (var f = 0, d = 1; 0 == (t.words[0] & d) && f < 26; ++f, d <<= 1) ;
                    if (f > 0) for (t.iushrn(f); f-- > 0;) s.isOdd() && s.iadd(c), s.iushrn(1);
                    for (var u = 0, l = 1; 0 == (r.words[0] & l) && u < 26; ++u, l <<= 1) ;
                    if (u > 0) for (r.iushrn(u); u-- > 0;) o.isOdd() && o.iadd(c), o.iushrn(1);
                    t.cmp(r) >= 0 ? (t.isub(r), s.isub(o)) : (r.isub(t), o.isub(s))
                }
                return (n = 0 === t.cmpn(1) ? s : o).cmpn(0) < 0 && n.iadd(e), n
            }, a.prototype.gcd = function (e) {
                if (this.isZero()) return e.abs();
                if (e.isZero()) return this.abs();
                var t = this.clone(), r = e.clone();
                t.negative = 0, r.negative = 0;
                for (var i = 0; t.isEven() && r.isEven(); i++) t.iushrn(1), r.iushrn(1);
                for (; ;) {
                    for (; t.isEven();) t.iushrn(1);
                    for (; r.isEven();) r.iushrn(1);
                    var n = t.cmp(r);
                    if (n < 0) {
                        var a = t;
                        t = r, r = a
                    } else if (0 === n || 0 === r.cmpn(1)) break;
                    t.isub(r)
                }
                return r.iushln(i)
            }, a.prototype.invm = function (e) {
                return this.egcd(e).a.umod(e)
            }, a.prototype.isEven = function () {
                return 0 == (1 & this.words[0])
            }, a.prototype.isOdd = function () {
                return 1 == (1 & this.words[0])
            }, a.prototype.andln = function (e) {
                return this.words[0] & e
            }, a.prototype.bincn = function (e) {
                i("number" == typeof e);
                var t = e % 26, r = (e - t) / 26, n = 1 << t;
                if (this.length <= r) return this._expand(r + 1), this.words[r] |= n, this;
                for (var a = n, s = r; 0 !== a && s < this.length; s++) {
                    var o = 0 | this.words[s];
                    a = (o += a) >>> 26, o &= 67108863, this.words[s] = o
                }
                return 0 !== a && (this.words[s] = a, this.length++), this
            }, a.prototype.isZero = function () {
                return 1 === this.length && 0 === this.words[0]
            }, a.prototype.cmpn = function (e) {
                var t, r = e < 0;
                if (0 !== this.negative && !r) return -1;
                if (0 === this.negative && r) return 1;
                if (this.strip(), this.length > 1) t = 1; else {
                    r && (e = -e), i(e <= 67108863, "Number is too big");
                    var n = 0 | this.words[0];
                    t = n === e ? 0 : n < e ? -1 : 1
                }
                return 0 !== this.negative ? 0 | -t : t
            }, a.prototype.cmp = function (e) {
                if (0 !== this.negative && 0 === e.negative) return -1;
                if (0 === this.negative && 0 !== e.negative) return 1;
                var t = this.ucmp(e);
                return 0 !== this.negative ? 0 | -t : t
            }, a.prototype.ucmp = function (e) {
                if (this.length > e.length) return 1;
                if (this.length < e.length) return -1;
                for (var t = 0, r = this.length - 1; r >= 0; r--) {
                    var i = 0 | this.words[r], n = 0 | e.words[r];
                    if (i !== n) {
                        i < n ? t = -1 : i > n && (t = 1);
                        break
                    }
                }
                return t
            }, a.prototype.gtn = function (e) {
                return 1 === this.cmpn(e)
            }, a.prototype.gt = function (e) {
                return 1 === this.cmp(e)
            }, a.prototype.gten = function (e) {
                return this.cmpn(e) >= 0
            }, a.prototype.gte = function (e) {
                return this.cmp(e) >= 0
            }, a.prototype.ltn = function (e) {
                return -1 === this.cmpn(e)
            }, a.prototype.lt = function (e) {
                return -1 === this.cmp(e)
            }, a.prototype.lten = function (e) {
                return this.cmpn(e) <= 0
            }, a.prototype.lte = function (e) {
                return this.cmp(e) <= 0
            }, a.prototype.eqn = function (e) {
                return 0 === this.cmpn(e)
            }, a.prototype.eq = function (e) {
                return 0 === this.cmp(e)
            }, a.red = function (e) {
                return new S(e)
            }, a.prototype.toRed = function (e) {
                return i(!this.red, "Already a number in reduction context"), i(0 === this.negative, "red works only with positives"), e.convertTo(this)._forceRed(e)
            }, a.prototype.fromRed = function () {
                return i(this.red, "fromRed works only with numbers in reduction context"), this.red.convertFrom(this)
            }, a.prototype._forceRed = function (e) {
                return this.red = e, this
            }, a.prototype.forceRed = function (e) {
                return i(!this.red, "Already a number in reduction context"), this._forceRed(e)
            }, a.prototype.redAdd = function (e) {
                return i(this.red, "redAdd works only with red numbers"), this.red.add(this, e)
            }, a.prototype.redIAdd = function (e) {
                return i(this.red, "redIAdd works only with red numbers"), this.red.iadd(this, e)
            }, a.prototype.redSub = function (e) {
                return i(this.red, "redSub works only with red numbers"), this.red.sub(this, e)
            }, a.prototype.redISub = function (e) {
                return i(this.red, "redISub works only with red numbers"), this.red.isub(this, e)
            }, a.prototype.redShl = function (e) {
                return i(this.red, "redShl works only with red numbers"), this.red.shl(this, e)
            }, a.prototype.redMul = function (e) {
                return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.mul(this, e)
            }, a.prototype.redIMul = function (e) {
                return i(this.red, "redMul works only with red numbers"), this.red._verify2(this, e), this.red.imul(this, e)
            }, a.prototype.redSqr = function () {
                return i(this.red, "redSqr works only with red numbers"), this.red._verify1(this), this.red.sqr(this)
            }, a.prototype.redISqr = function () {
                return i(this.red, "redISqr works only with red numbers"), this.red._verify1(this), this.red.isqr(this)
            }, a.prototype.redSqrt = function () {
                return i(this.red, "redSqrt works only with red numbers"), this.red._verify1(this), this.red.sqrt(this)
            }, a.prototype.redInvm = function () {
                return i(this.red, "redInvm works only with red numbers"), this.red._verify1(this), this.red.invm(this)
            }, a.prototype.redNeg = function () {
                return i(this.red, "redNeg works only with red numbers"), this.red._verify1(this), this.red.neg(this)
            }, a.prototype.redPow = function (e) {
                return i(this.red && !e.red, "redPow(normalNum)"), this.red._verify1(this), this.red.pow(this, e)
            };
            var m = {k256: null, p224: null, p192: null, p25519: null};

            function v(e, t) {
                this.name = e, this.p = new a(t, 16), this.n = this.p.bitLength(), this.k = new a(1).iushln(this.n).isub(this.p), this.tmp = this._tmp()
            }

            function b() {
                v.call(this, "k256", "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f")
            }

            function w() {
                v.call(this, "p224", "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001")
            }

            function E() {
                v.call(this, "p192", "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff")
            }

            function C() {
                v.call(this, "25519", "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed")
            }

            function S(e) {
                if ("string" == typeof e) {
                    var t = a._prime(e);
                    this.m = t.p, this.prime = t
                } else i(e.gtn(1), "modulus must be greater than 1"), this.m = e, this.prime = null
            }

            function I(e) {
                S.call(this, e), this.shift = this.m.bitLength(), this.shift % 26 != 0 && (this.shift += 26 - this.shift % 26), this.r = new a(1).iushln(this.shift), this.r2 = this.imod(this.r.sqr()), this.rinv = this.r._invmp(this.m), this.minv = this.rinv.mul(this.r).isubn(1).div(this.m), this.minv = this.minv.umod(this.r), this.minv = this.r.sub(this.minv)
            }

            v.prototype._tmp = function () {
                var e = new a(null);
                return e.words = new Array(Math.ceil(this.n / 13)), e
            }, v.prototype.ireduce = function (e) {
                var t, r = e;
                do {
                    this.split(r, this.tmp), t = (r = (r = this.imulK(r)).iadd(this.tmp)).bitLength()
                } while (t > this.n);
                var i = t < this.n ? -1 : r.ucmp(this.p);
                return 0 === i ? (r.words[0] = 0, r.length = 1) : i > 0 ? r.isub(this.p) : void 0 !== r.strip ? r.strip() : r._strip(), r
            }, v.prototype.split = function (e, t) {
                e.iushrn(this.n, 0, t)
            }, v.prototype.imulK = function (e) {
                return e.imul(this.k)
            }, n(b, v), b.prototype.split = function (e, t) {
                for (var r = 4194303, i = Math.min(e.length, 9), n = 0; n < i; n++) t.words[n] = e.words[n];
                if (t.length = i, e.length <= 9) return e.words[0] = 0, void (e.length = 1);
                var a = e.words[9];
                for (t.words[t.length++] = a & r, n = 10; n < e.length; n++) {
                    var s = 0 | e.words[n];
                    e.words[n - 10] = (s & r) << 4 | a >>> 22, a = s
                }
                a >>>= 22, e.words[n - 10] = a, 0 === a && e.length > 10 ? e.length -= 10 : e.length -= 9
            }, b.prototype.imulK = function (e) {
                e.words[e.length] = 0, e.words[e.length + 1] = 0, e.length += 2;
                for (var t = 0, r = 0; r < e.length; r++) {
                    var i = 0 | e.words[r];
                    t += 977 * i, e.words[r] = 67108863 & t, t = 64 * i + (t / 67108864 | 0)
                }
                return 0 === e.words[e.length - 1] && (e.length--, 0 === e.words[e.length - 1] && e.length--), e
            }, n(w, v), n(E, v), n(C, v), C.prototype.imulK = function (e) {
                for (var t = 0, r = 0; r < e.length; r++) {
                    var i = 19 * (0 | e.words[r]) + t, n = 67108863 & i;
                    i >>>= 26, e.words[r] = n, t = i
                }
                return 0 !== t && (e.words[e.length++] = t), e
            }, a._prime = function (e) {
                if (m[e]) return m[e];
                var t;
                if ("k256" === e) t = new b; else if ("p224" === e) t = new w; else if ("p192" === e) t = new E; else {
                    if ("p25519" !== e) throw new Error("Unknown prime " + e);
                    t = new C
                }
                return m[e] = t, t
            }, S.prototype._verify1 = function (e) {
                i(0 === e.negative, "red works only with positives"), i(e.red, "red works only with red numbers")
            }, S.prototype._verify2 = function (e, t) {
                i(0 == (e.negative | t.negative), "red works only with positives"), i(e.red && e.red === t.red, "red works only with red numbers")
            }, S.prototype.imod = function (e) {
                return this.prime ? this.prime.ireduce(e)._forceRed(this) : e.umod(this.m)._forceRed(this)
            }, S.prototype.neg = function (e) {
                return e.isZero() ? e.clone() : this.m.sub(e)._forceRed(this)
            }, S.prototype.add = function (e, t) {
                this._verify2(e, t);
                var r = e.add(t);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r._forceRed(this)
            }, S.prototype.iadd = function (e, t) {
                this._verify2(e, t);
                var r = e.iadd(t);
                return r.cmp(this.m) >= 0 && r.isub(this.m), r
            }, S.prototype.sub = function (e, t) {
                this._verify2(e, t);
                var r = e.sub(t);
                return r.cmpn(0) < 0 && r.iadd(this.m), r._forceRed(this)
            }, S.prototype.isub = function (e, t) {
                this._verify2(e, t);
                var r = e.isub(t);
                return r.cmpn(0) < 0 && r.iadd(this.m), r
            }, S.prototype.shl = function (e, t) {
                return this._verify1(e), this.imod(e.ushln(t))
            }, S.prototype.imul = function (e, t) {
                return this._verify2(e, t), this.imod(e.imul(t))
            }, S.prototype.mul = function (e, t) {
                return this._verify2(e, t), this.imod(e.mul(t))
            }, S.prototype.isqr = function (e) {
                return this.imul(e, e.clone())
            }, S.prototype.sqr = function (e) {
                return this.mul(e, e)
            }, S.prototype.sqrt = function (e) {
                if (e.isZero()) return e.clone();
                var t = this.m.andln(3);
                if (i(t % 2 == 1), 3 === t) {
                    var r = this.m.add(new a(1)).iushrn(2);
                    return this.pow(e, r)
                }
                for (var n = this.m.subn(1), s = 0; !n.isZero() && 0 === n.andln(1);) s++, n.iushrn(1);
                i(!n.isZero());
                var o = new a(1).toRed(this), c = o.redNeg(), f = this.m.subn(1).iushrn(1), d = this.m.bitLength();
                for (d = new a(2 * d * d).toRed(this); 0 !== this.pow(d, f).cmp(c);) d.redIAdd(c);
                for (var u = this.pow(d, n), l = this.pow(e, n.addn(1).iushrn(1)), h = this.pow(e, n), p = s; 0 !== h.cmp(o);) {
                    for (var g = h, y = 0; 0 !== g.cmp(o); y++) g = g.redSqr();
                    i(y < p);
                    var m = this.pow(u, new a(1).iushln(p - y - 1));
                    l = l.redMul(m), u = m.redSqr(), h = h.redMul(u), p = y
                }
                return l
            }, S.prototype.invm = function (e) {
                var t = e._invmp(this.m);
                return 0 !== t.negative ? (t.negative = 0, this.imod(t).redNeg()) : this.imod(t)
            }, S.prototype.pow = function (e, t) {
                if (t.isZero()) return new a(1).toRed(this);
                if (0 === t.cmpn(1)) return e.clone();
                var r = new Array(16);
                r[0] = new a(1).toRed(this), r[1] = e;
                for (var i = 2; i < r.length; i++) r[i] = this.mul(r[i - 1], e);
                var n = r[0], s = 0, o = 0, c = t.bitLength() % 26;
                for (0 === c && (c = 26), i = t.length - 1; i >= 0; i--) {
                    for (var f = t.words[i], d = c - 1; d >= 0; d--) {
                        var u = f >> d & 1;
                        n !== r[0] && (n = this.sqr(n)), 0 !== u || 0 !== s ? (s <<= 1, s |= u, (4 === ++o || 0 === i && 0 === d) && (n = this.mul(n, r[s]), o = 0, s = 0)) : o = 0
                    }
                    c = 26
                }
                return n
            }, S.prototype.convertTo = function (e) {
                var t = e.umod(this.m);
                return t === e ? t.clone() : t
            }, S.prototype.convertFrom = function (e) {
                var t = e.clone();
                return t.red = null, t
            }, a.mont = function (e) {
                return new I(e)
            }, n(I, S), I.prototype.convertTo = function (e) {
                return this.imod(e.ushln(this.shift))
            }, I.prototype.convertFrom = function (e) {
                var t = this.imod(e.mul(this.rinv));
                return t.red = null, t
            }, I.prototype.imul = function (e, t) {
                if (e.isZero() || t.isZero()) return e.words[0] = 0, e.length = 1, e;
                var r = e.imul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    n = r.isub(i).iushrn(this.shift), a = n;
                return n.cmp(this.m) >= 0 ? a = n.isub(this.m) : n.cmpn(0) < 0 && (a = n.iadd(this.m)), a._forceRed(this)
            }, I.prototype.mul = function (e, t) {
                if (e.isZero() || t.isZero()) return new a(0)._forceRed(this);
                var r = e.mul(t), i = r.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m),
                    n = r.isub(i).iushrn(this.shift), s = n;
                return n.cmp(this.m) >= 0 ? s = n.isub(this.m) : n.cmpn(0) < 0 && (s = n.iadd(this.m)), s._forceRed(this)
            }, I.prototype.invm = function (e) {
                return this.imod(e._invmp(this.m).mul(this.r2))._forceRed(this)
            }
        }(e = r.nmd(e), this)
    }, 86266: (e, t, r) => {
        "use strict";
        var i = t;
        i.version = r(18597).i8, i.utils = r(80953), i.rand = r(29931), i.curve = r(88254), i.curves = r(45427), i.ec = r(57954), i.eddsa = r(65980)
    }, 4918: (e, t, r) => {
        "use strict";
        var i = r(13550), n = r(80953), a = n.getNAF, s = n.getJSF, o = n.assert;

        function c(e, t) {
            this.type = e, this.p = new i(t.p, 16), this.red = t.prime ? i.red(t.prime) : i.mont(this.p), this.zero = new i(0).toRed(this.red), this.one = new i(1).toRed(this.red), this.two = new i(2).toRed(this.red), this.n = t.n && new i(t.n, 16), this.g = t.g && this.pointFromJSON(t.g, t.gRed), this._wnafT1 = new Array(4), this._wnafT2 = new Array(4), this._wnafT3 = new Array(4), this._wnafT4 = new Array(4), this._bitLength = this.n ? this.n.bitLength() : 0;
            var r = this.n && this.p.div(this.n);
            !r || r.cmpn(100) > 0 ? this.redN = null : (this._maxwellTrick = !0, this.redN = this.n.toRed(this.red))
        }

        function f(e, t) {
            this.curve = e, this.type = t, this.precomputed = null
        }

        e.exports = c, c.prototype.point = function () {
            throw new Error("Not implemented")
        }, c.prototype.validate = function () {
            throw new Error("Not implemented")
        }, c.prototype._fixedNafMul = function (e, t) {
            o(e.precomputed);
            var r = e._getDoubles(), i = a(t, 1, this._bitLength), n = (1 << r.step + 1) - (r.step % 2 == 0 ? 2 : 1);
            n /= 3;
            var s, c, f = [];
            for (s = 0; s < i.length; s += r.step) {
                c = 0;
                for (var d = s + r.step - 1; d >= s; d--) c = (c << 1) + i[d];
                f.push(c)
            }
            for (var u = this.jpoint(null, null, null), l = this.jpoint(null, null, null), h = n; h > 0; h--) {
                for (s = 0; s < f.length; s++) (c = f[s]) === h ? l = l.mixedAdd(r.points[s]) : c === -h && (l = l.mixedAdd(r.points[s].neg()));
                u = u.add(l)
            }
            return u.toP()
        }, c.prototype._wnafMul = function (e, t) {
            var r = 4, i = e._getNAFPoints(r);
            r = i.wnd;
            for (var n = i.points, s = a(t, r, this._bitLength), c = this.jpoint(null, null, null), f = s.length - 1; f >= 0; f--) {
                for (var d = 0; f >= 0 && 0 === s[f]; f--) d++;
                if (f >= 0 && d++, c = c.dblp(d), f < 0) break;
                var u = s[f];
                o(0 !== u), c = "affine" === e.type ? u > 0 ? c.mixedAdd(n[u - 1 >> 1]) : c.mixedAdd(n[-u - 1 >> 1].neg()) : u > 0 ? c.add(n[u - 1 >> 1]) : c.add(n[-u - 1 >> 1].neg())
            }
            return "affine" === e.type ? c.toP() : c
        }, c.prototype._wnafMulAdd = function (e, t, r, i, n) {
            var o, c, f, d = this._wnafT1, u = this._wnafT2, l = this._wnafT3, h = 0;
            for (o = 0; o < i; o++) {
                var p = (f = t[o])._getNAFPoints(e);
                d[o] = p.wnd, u[o] = p.points
            }
            for (o = i - 1; o >= 1; o -= 2) {
                var g = o - 1, y = o;
                if (1 === d[g] && 1 === d[y]) {
                    var m = [t[g], null, null, t[y]];
                    0 === t[g].y.cmp(t[y].y) ? (m[1] = t[g].add(t[y]), m[2] = t[g].toJ().mixedAdd(t[y].neg())) : 0 === t[g].y.cmp(t[y].y.redNeg()) ? (m[1] = t[g].toJ().mixedAdd(t[y]), m[2] = t[g].add(t[y].neg())) : (m[1] = t[g].toJ().mixedAdd(t[y]), m[2] = t[g].toJ().mixedAdd(t[y].neg()));
                    var v = [-3, -1, -5, -7, 0, 7, 5, 1, 3], b = s(r[g], r[y]);
                    for (h = Math.max(b[0].length, h), l[g] = new Array(h), l[y] = new Array(h), c = 0; c < h; c++) {
                        var w = 0 | b[0][c], E = 0 | b[1][c];
                        l[g][c] = v[3 * (w + 1) + (E + 1)], l[y][c] = 0, u[g] = m
                    }
                } else l[g] = a(r[g], d[g], this._bitLength), l[y] = a(r[y], d[y], this._bitLength), h = Math.max(l[g].length, h), h = Math.max(l[y].length, h)
            }
            var C = this.jpoint(null, null, null), S = this._wnafT4;
            for (o = h; o >= 0; o--) {
                for (var I = 0; o >= 0;) {
                    var A = !0;
                    for (c = 0; c < i; c++) S[c] = 0 | l[c][o], 0 !== S[c] && (A = !1);
                    if (!A) break;
                    I++, o--
                }
                if (o >= 0 && I++, C = C.dblp(I), o < 0) break;
                for (c = 0; c < i; c++) {
                    var _ = S[c];
                    0 !== _ && (_ > 0 ? f = u[c][_ - 1 >> 1] : _ < 0 && (f = u[c][-_ - 1 >> 1].neg()), C = "affine" === f.type ? C.mixedAdd(f) : C.add(f))
                }
            }
            for (o = 0; o < i; o++) u[o] = null;
            return n ? C : C.toP()
        }, c.BasePoint = f, f.prototype.eq = function () {
            throw new Error("Not implemented")
        }, f.prototype.validate = function () {
            return this.curve.validate(this)
        }, c.prototype.decodePoint = function (e, t) {
            e = n.toArray(e, t);
            var r = this.p.byteLength();
            if ((4 === e[0] || 6 === e[0] || 7 === e[0]) && e.length - 1 == 2 * r) return 6 === e[0] ? o(e[e.length - 1] % 2 == 0) : 7 === e[0] && o(e[e.length - 1] % 2 == 1), this.point(e.slice(1, 1 + r), e.slice(1 + r, 1 + 2 * r));
            if ((2 === e[0] || 3 === e[0]) && e.length - 1 === r) return this.pointFromX(e.slice(1, 1 + r), 3 === e[0]);
            throw new Error("Unknown point format")
        }, f.prototype.encodeCompressed = function (e) {
            return this.encode(e, !0)
        }, f.prototype._encode = function (e) {
            var t = this.curve.p.byteLength(), r = this.getX().toArray("be", t);
            return e ? [this.getY().isEven() ? 2 : 3].concat(r) : [4].concat(r, this.getY().toArray("be", t))
        }, f.prototype.encode = function (e, t) {
            return n.encode(this._encode(t), e)
        }, f.prototype.precompute = function (e) {
            if (this.precomputed) return this;
            var t = {doubles: null, naf: null, beta: null};
            return t.naf = this._getNAFPoints(8), t.doubles = this._getDoubles(4, e), t.beta = this._getBeta(), this.precomputed = t, this
        }, f.prototype._hasDoubles = function (e) {
            if (!this.precomputed) return !1;
            var t = this.precomputed.doubles;
            return !!t && t.points.length >= Math.ceil((e.bitLength() + 1) / t.step)
        }, f.prototype._getDoubles = function (e, t) {
            if (this.precomputed && this.precomputed.doubles) return this.precomputed.doubles;
            for (var r = [this], i = this, n = 0; n < t; n += e) {
                for (var a = 0; a < e; a++) i = i.dbl();
                r.push(i)
            }
            return {step: e, points: r}
        }, f.prototype._getNAFPoints = function (e) {
            if (this.precomputed && this.precomputed.naf) return this.precomputed.naf;
            for (var t = [this], r = (1 << e) - 1, i = 1 === r ? null : this.dbl(), n = 1; n < r; n++) t[n] = t[n - 1].add(i);
            return {wnd: e, points: t}
        }, f.prototype._getBeta = function () {
            return null
        }, f.prototype.dblp = function (e) {
            for (var t = this, r = 0; r < e; r++) t = t.dbl();
            return t
        }
    }, 31138: (e, t, r) => {
        "use strict";
        var i = r(80953), n = r(13550), a = r(35717), s = r(4918), o = i.assert;

        function c(e) {
            this.twisted = 1 != (0 | e.a), this.mOneA = this.twisted && -1 == (0 | e.a), this.extended = this.mOneA, s.call(this, "edwards", e), this.a = new n(e.a, 16).umod(this.red.m), this.a = this.a.toRed(this.red), this.c = new n(e.c, 16).toRed(this.red), this.c2 = this.c.redSqr(), this.d = new n(e.d, 16).toRed(this.red), this.dd = this.d.redAdd(this.d), o(!this.twisted || 0 === this.c.fromRed().cmpn(1)), this.oneC = 1 == (0 | e.c)
        }

        function f(e, t, r, i, a) {
            s.BasePoint.call(this, e, "projective"), null === t && null === r && null === i ? (this.x = this.curve.zero, this.y = this.curve.one, this.z = this.curve.one, this.t = this.curve.zero, this.zOne = !0) : (this.x = new n(t, 16), this.y = new n(r, 16), this.z = i ? new n(i, 16) : this.curve.one, this.t = a && new n(a, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.t && !this.t.red && (this.t = this.t.toRed(this.curve.red)), this.zOne = this.z === this.curve.one, this.curve.extended && !this.t && (this.t = this.x.redMul(this.y), this.zOne || (this.t = this.t.redMul(this.z.redInvm()))))
        }

        a(c, s), e.exports = c, c.prototype._mulA = function (e) {
            return this.mOneA ? e.redNeg() : this.a.redMul(e)
        }, c.prototype._mulC = function (e) {
            return this.oneC ? e : this.c.redMul(e)
        }, c.prototype.jpoint = function (e, t, r, i) {
            return this.point(e, t, r, i)
        }, c.prototype.pointFromX = function (e, t) {
            (e = new n(e, 16)).red || (e = e.toRed(this.red));
            var r = e.redSqr(), i = this.c2.redSub(this.a.redMul(r)),
                a = this.one.redSub(this.c2.redMul(this.d).redMul(r)), s = i.redMul(a.redInvm()), o = s.redSqrt();
            if (0 !== o.redSqr().redSub(s).cmp(this.zero)) throw new Error("invalid point");
            var c = o.fromRed().isOdd();
            return (t && !c || !t && c) && (o = o.redNeg()), this.point(e, o)
        }, c.prototype.pointFromY = function (e, t) {
            (e = new n(e, 16)).red || (e = e.toRed(this.red));
            var r = e.redSqr(), i = r.redSub(this.c2), a = r.redMul(this.d).redMul(this.c2).redSub(this.a),
                s = i.redMul(a.redInvm());
            if (0 === s.cmp(this.zero)) {
                if (t) throw new Error("invalid point");
                return this.point(this.zero, e)
            }
            var o = s.redSqrt();
            if (0 !== o.redSqr().redSub(s).cmp(this.zero)) throw new Error("invalid point");
            return o.fromRed().isOdd() !== t && (o = o.redNeg()), this.point(o, e)
        }, c.prototype.validate = function (e) {
            if (e.isInfinity()) return !0;
            e.normalize();
            var t = e.x.redSqr(), r = e.y.redSqr(), i = t.redMul(this.a).redAdd(r),
                n = this.c2.redMul(this.one.redAdd(this.d.redMul(t).redMul(r)));
            return 0 === i.cmp(n)
        }, a(f, s.BasePoint), c.prototype.pointFromJSON = function (e) {
            return f.fromJSON(this, e)
        }, c.prototype.point = function (e, t, r, i) {
            return new f(this, e, t, r, i)
        }, f.fromJSON = function (e, t) {
            return new f(e, t[0], t[1], t[2])
        }, f.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
        }, f.prototype.isInfinity = function () {
            return 0 === this.x.cmpn(0) && (0 === this.y.cmp(this.z) || this.zOne && 0 === this.y.cmp(this.curve.c))
        }, f.prototype._extDbl = function () {
            var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr();
            r = r.redIAdd(r);
            var i = this.curve._mulA(e), n = this.x.redAdd(this.y).redSqr().redISub(e).redISub(t), a = i.redAdd(t),
                s = a.redSub(r), o = i.redSub(t), c = n.redMul(s), f = a.redMul(o), d = n.redMul(o), u = s.redMul(a);
            return this.curve.point(c, f, u, d)
        }, f.prototype._projDbl = function () {
            var e, t, r, i, n, a, s = this.x.redAdd(this.y).redSqr(), o = this.x.redSqr(), c = this.y.redSqr();
            if (this.curve.twisted) {
                var f = (i = this.curve._mulA(o)).redAdd(c);
                this.zOne ? (e = s.redSub(o).redSub(c).redMul(f.redSub(this.curve.two)), t = f.redMul(i.redSub(c)), r = f.redSqr().redSub(f).redSub(f)) : (n = this.z.redSqr(), a = f.redSub(n).redISub(n), e = s.redSub(o).redISub(c).redMul(a), t = f.redMul(i.redSub(c)), r = f.redMul(a))
            } else i = o.redAdd(c), n = this.curve._mulC(this.z).redSqr(), a = i.redSub(n).redSub(n), e = this.curve._mulC(s.redISub(i)).redMul(a), t = this.curve._mulC(i).redMul(o.redISub(c)), r = i.redMul(a);
            return this.curve.point(e, t, r)
        }, f.prototype.dbl = function () {
            return this.isInfinity() ? this : this.curve.extended ? this._extDbl() : this._projDbl()
        }, f.prototype._extAdd = function (e) {
            var t = this.y.redSub(this.x).redMul(e.y.redSub(e.x)), r = this.y.redAdd(this.x).redMul(e.y.redAdd(e.x)),
                i = this.t.redMul(this.curve.dd).redMul(e.t), n = this.z.redMul(e.z.redAdd(e.z)), a = r.redSub(t),
                s = n.redSub(i), o = n.redAdd(i), c = r.redAdd(t), f = a.redMul(s), d = o.redMul(c), u = a.redMul(c),
                l = s.redMul(o);
            return this.curve.point(f, d, l, u)
        }, f.prototype._projAdd = function (e) {
            var t, r, i = this.z.redMul(e.z), n = i.redSqr(), a = this.x.redMul(e.x), s = this.y.redMul(e.y),
                o = this.curve.d.redMul(a).redMul(s), c = n.redSub(o), f = n.redAdd(o),
                d = this.x.redAdd(this.y).redMul(e.x.redAdd(e.y)).redISub(a).redISub(s), u = i.redMul(c).redMul(d);
            return this.curve.twisted ? (t = i.redMul(f).redMul(s.redSub(this.curve._mulA(a))), r = c.redMul(f)) : (t = i.redMul(f).redMul(s.redSub(a)), r = this.curve._mulC(c).redMul(f)), this.curve.point(u, t, r)
        }, f.prototype.add = function (e) {
            return this.isInfinity() ? e : e.isInfinity() ? this : this.curve.extended ? this._extAdd(e) : this._projAdd(e)
        }, f.prototype.mul = function (e) {
            return this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve._wnafMul(this, e)
        }, f.prototype.mulAdd = function (e, t, r) {
            return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !1)
        }, f.prototype.jmulAdd = function (e, t, r) {
            return this.curve._wnafMulAdd(1, [this, t], [e, r], 2, !0)
        }, f.prototype.normalize = function () {
            if (this.zOne) return this;
            var e = this.z.redInvm();
            return this.x = this.x.redMul(e), this.y = this.y.redMul(e), this.t && (this.t = this.t.redMul(e)), this.z = this.curve.one, this.zOne = !0, this
        }, f.prototype.neg = function () {
            return this.curve.point(this.x.redNeg(), this.y, this.z, this.t && this.t.redNeg())
        }, f.prototype.getX = function () {
            return this.normalize(), this.x.fromRed()
        }, f.prototype.getY = function () {
            return this.normalize(), this.y.fromRed()
        }, f.prototype.eq = function (e) {
            return this === e || 0 === this.getX().cmp(e.getX()) && 0 === this.getY().cmp(e.getY())
        }, f.prototype.eqXToP = function (e) {
            var t = e.toRed(this.curve.red).redMul(this.z);
            if (0 === this.x.cmp(t)) return !0;
            for (var r = e.clone(), i = this.curve.redN.redMul(this.z); ;) {
                if (r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0) return !1;
                if (t.redIAdd(i), 0 === this.x.cmp(t)) return !0
            }
        }, f.prototype.toP = f.prototype.normalize, f.prototype.mixedAdd = f.prototype.add
    }, 88254: (e, t, r) => {
        "use strict";
        var i = t;
        i.base = r(4918), i.short = r(6673), i.mont = r(22881), i.edwards = r(31138)
    }, 22881: (e, t, r) => {
        "use strict";
        var i = r(13550), n = r(35717), a = r(4918), s = r(80953);

        function o(e) {
            a.call(this, "mont", e), this.a = new i(e.a, 16).toRed(this.red), this.b = new i(e.b, 16).toRed(this.red), this.i4 = new i(4).toRed(this.red).redInvm(), this.two = new i(2).toRed(this.red), this.a24 = this.i4.redMul(this.a.redAdd(this.two))
        }

        function c(e, t, r) {
            a.BasePoint.call(this, e, "projective"), null === t && null === r ? (this.x = this.curve.one, this.z = this.curve.zero) : (this.x = new i(t, 16), this.z = new i(r, 16), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)))
        }

        n(o, a), e.exports = o, o.prototype.validate = function (e) {
            var t = e.normalize().x, r = t.redSqr(), i = r.redMul(t).redAdd(r.redMul(this.a)).redAdd(t);
            return 0 === i.redSqrt().redSqr().cmp(i)
        }, n(c, a.BasePoint), o.prototype.decodePoint = function (e, t) {
            return this.point(s.toArray(e, t), 1)
        }, o.prototype.point = function (e, t) {
            return new c(this, e, t)
        }, o.prototype.pointFromJSON = function (e) {
            return c.fromJSON(this, e)
        }, c.prototype.precompute = function () {
        }, c.prototype._encode = function () {
            return this.getX().toArray("be", this.curve.p.byteLength())
        }, c.fromJSON = function (e, t) {
            return new c(e, t[0], t[1] || e.one)
        }, c.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " z: " + this.z.fromRed().toString(16, 2) + ">"
        }, c.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0)
        }, c.prototype.dbl = function () {
            var e = this.x.redAdd(this.z).redSqr(), t = this.x.redSub(this.z).redSqr(), r = e.redSub(t),
                i = e.redMul(t), n = r.redMul(t.redAdd(this.curve.a24.redMul(r)));
            return this.curve.point(i, n)
        }, c.prototype.add = function () {
            throw new Error("Not supported on Montgomery curve")
        }, c.prototype.diffAdd = function (e, t) {
            var r = this.x.redAdd(this.z), i = this.x.redSub(this.z), n = e.x.redAdd(e.z),
                a = e.x.redSub(e.z).redMul(r), s = n.redMul(i), o = t.z.redMul(a.redAdd(s).redSqr()),
                c = t.x.redMul(a.redISub(s).redSqr());
            return this.curve.point(o, c)
        }, c.prototype.mul = function (e) {
            for (var t = e.clone(), r = this, i = this.curve.point(null, null), n = []; 0 !== t.cmpn(0); t.iushrn(1)) n.push(t.andln(1));
            for (var a = n.length - 1; a >= 0; a--) 0 === n[a] ? (r = r.diffAdd(i, this), i = i.dbl()) : (i = r.diffAdd(i, this), r = r.dbl());
            return i
        }, c.prototype.mulAdd = function () {
            throw new Error("Not supported on Montgomery curve")
        }, c.prototype.jumlAdd = function () {
            throw new Error("Not supported on Montgomery curve")
        }, c.prototype.eq = function (e) {
            return 0 === this.getX().cmp(e.getX())
        }, c.prototype.normalize = function () {
            return this.x = this.x.redMul(this.z.redInvm()), this.z = this.curve.one, this
        }, c.prototype.getX = function () {
            return this.normalize(), this.x.fromRed()
        }
    }, 6673: (e, t, r) => {
        "use strict";
        var i = r(80953), n = r(13550), a = r(35717), s = r(4918), o = i.assert;

        function c(e) {
            s.call(this, "short", e), this.a = new n(e.a, 16).toRed(this.red), this.b = new n(e.b, 16).toRed(this.red), this.tinv = this.two.redInvm(), this.zeroA = 0 === this.a.fromRed().cmpn(0), this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3), this.endo = this._getEndomorphism(e), this._endoWnafT1 = new Array(4), this._endoWnafT2 = new Array(4)
        }

        function f(e, t, r, i) {
            s.BasePoint.call(this, e, "affine"), null === t && null === r ? (this.x = null, this.y = null, this.inf = !0) : (this.x = new n(t, 16), this.y = new n(r, 16), i && (this.x.forceRed(this.curve.red), this.y.forceRed(this.curve.red)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.inf = !1)
        }

        function d(e, t, r, i) {
            s.BasePoint.call(this, e, "jacobian"), null === t && null === r && null === i ? (this.x = this.curve.one, this.y = this.curve.one, this.z = new n(0)) : (this.x = new n(t, 16), this.y = new n(r, 16), this.z = new n(i, 16)), this.x.red || (this.x = this.x.toRed(this.curve.red)), this.y.red || (this.y = this.y.toRed(this.curve.red)), this.z.red || (this.z = this.z.toRed(this.curve.red)), this.zOne = this.z === this.curve.one
        }

        a(c, s), e.exports = c, c.prototype._getEndomorphism = function (e) {
            if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
                var t, r;
                if (e.beta) t = new n(e.beta, 16).toRed(this.red); else {
                    var i = this._getEndoRoots(this.p);
                    t = (t = i[0].cmp(i[1]) < 0 ? i[0] : i[1]).toRed(this.red)
                }
                if (e.lambda) r = new n(e.lambda, 16); else {
                    var a = this._getEndoRoots(this.n);
                    0 === this.g.mul(a[0]).x.cmp(this.g.x.redMul(t)) ? r = a[0] : (r = a[1], o(0 === this.g.mul(r).x.cmp(this.g.x.redMul(t))))
                }
                return {
                    beta: t, lambda: r, basis: e.basis ? e.basis.map((function (e) {
                        return {a: new n(e.a, 16), b: new n(e.b, 16)}
                    })) : this._getEndoBasis(r)
                }
            }
        }, c.prototype._getEndoRoots = function (e) {
            var t = e === this.p ? this.red : n.mont(e), r = new n(2).toRed(t).redInvm(), i = r.redNeg(),
                a = new n(3).toRed(t).redNeg().redSqrt().redMul(r);
            return [i.redAdd(a).fromRed(), i.redSub(a).fromRed()]
        }, c.prototype._getEndoBasis = function (e) {
            for (var t, r, i, a, s, o, c, f, d, u = this.n.ushrn(Math.floor(this.n.bitLength() / 2)), l = e, h = this.n.clone(), p = new n(1), g = new n(0), y = new n(0), m = new n(1), v = 0; 0 !== l.cmpn(0);) {
                var b = h.div(l);
                f = h.sub(b.mul(l)), d = y.sub(b.mul(p));
                var w = m.sub(b.mul(g));
                if (!i && f.cmp(u) < 0) t = c.neg(), r = p, i = f.neg(), a = d; else if (i && 2 == ++v) break;
                c = f, h = l, l = f, y = p, p = d, m = g, g = w
            }
            s = f.neg(), o = d;
            var E = i.sqr().add(a.sqr());
            return s.sqr().add(o.sqr()).cmp(E) >= 0 && (s = t, o = r), i.negative && (i = i.neg(), a = a.neg()), s.negative && (s = s.neg(), o = o.neg()), [{
                a: i,
                b: a
            }, {a: s, b: o}]
        }, c.prototype._endoSplit = function (e) {
            var t = this.endo.basis, r = t[0], i = t[1], n = i.b.mul(e).divRound(this.n),
                a = r.b.neg().mul(e).divRound(this.n), s = n.mul(r.a), o = a.mul(i.a), c = n.mul(r.b), f = a.mul(i.b);
            return {k1: e.sub(s).sub(o), k2: c.add(f).neg()}
        }, c.prototype.pointFromX = function (e, t) {
            (e = new n(e, 16)).red || (e = e.toRed(this.red));
            var r = e.redSqr().redMul(e).redIAdd(e.redMul(this.a)).redIAdd(this.b), i = r.redSqrt();
            if (0 !== i.redSqr().redSub(r).cmp(this.zero)) throw new Error("invalid point");
            var a = i.fromRed().isOdd();
            return (t && !a || !t && a) && (i = i.redNeg()), this.point(e, i)
        }, c.prototype.validate = function (e) {
            if (e.inf) return !0;
            var t = e.x, r = e.y, i = this.a.redMul(t), n = t.redSqr().redMul(t).redIAdd(i).redIAdd(this.b);
            return 0 === r.redSqr().redISub(n).cmpn(0)
        }, c.prototype._endoWnafMulAdd = function (e, t, r) {
            for (var i = this._endoWnafT1, n = this._endoWnafT2, a = 0; a < e.length; a++) {
                var s = this._endoSplit(t[a]), o = e[a], c = o._getBeta();
                s.k1.negative && (s.k1.ineg(), o = o.neg(!0)), s.k2.negative && (s.k2.ineg(), c = c.neg(!0)), i[2 * a] = o, i[2 * a + 1] = c, n[2 * a] = s.k1, n[2 * a + 1] = s.k2
            }
            for (var f = this._wnafMulAdd(1, i, n, 2 * a, r), d = 0; d < 2 * a; d++) i[d] = null, n[d] = null;
            return f
        }, a(f, s.BasePoint), c.prototype.point = function (e, t, r) {
            return new f(this, e, t, r)
        }, c.prototype.pointFromJSON = function (e, t) {
            return f.fromJSON(this, e, t)
        }, f.prototype._getBeta = function () {
            if (this.curve.endo) {
                var e = this.precomputed;
                if (e && e.beta) return e.beta;
                var t = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
                if (e) {
                    var r = this.curve, i = function (e) {
                        return r.point(e.x.redMul(r.endo.beta), e.y)
                    };
                    e.beta = t, t.precomputed = {
                        beta: null,
                        naf: e.naf && {wnd: e.naf.wnd, points: e.naf.points.map(i)},
                        doubles: e.doubles && {step: e.doubles.step, points: e.doubles.points.map(i)}
                    }
                }
                return t
            }
        }, f.prototype.toJSON = function () {
            return this.precomputed ? [this.x, this.y, this.precomputed && {
                doubles: this.precomputed.doubles && {
                    step: this.precomputed.doubles.step,
                    points: this.precomputed.doubles.points.slice(1)
                },
                naf: this.precomputed.naf && {
                    wnd: this.precomputed.naf.wnd,
                    points: this.precomputed.naf.points.slice(1)
                }
            }] : [this.x, this.y]
        }, f.fromJSON = function (e, t, r) {
            "string" == typeof t && (t = JSON.parse(t));
            var i = e.point(t[0], t[1], r);
            if (!t[2]) return i;

            function n(t) {
                return e.point(t[0], t[1], r)
            }

            var a = t[2];
            return i.precomputed = {
                beta: null,
                doubles: a.doubles && {step: a.doubles.step, points: [i].concat(a.doubles.points.map(n))},
                naf: a.naf && {wnd: a.naf.wnd, points: [i].concat(a.naf.points.map(n))}
            }, i
        }, f.prototype.inspect = function () {
            return this.isInfinity() ? "<EC Point Infinity>" : "<EC Point x: " + this.x.fromRed().toString(16, 2) + " y: " + this.y.fromRed().toString(16, 2) + ">"
        }, f.prototype.isInfinity = function () {
            return this.inf
        }, f.prototype.add = function (e) {
            if (this.inf) return e;
            if (e.inf) return this;
            if (this.eq(e)) return this.dbl();
            if (this.neg().eq(e)) return this.curve.point(null, null);
            if (0 === this.x.cmp(e.x)) return this.curve.point(null, null);
            var t = this.y.redSub(e.y);
            0 !== t.cmpn(0) && (t = t.redMul(this.x.redSub(e.x).redInvm()));
            var r = t.redSqr().redISub(this.x).redISub(e.x), i = t.redMul(this.x.redSub(r)).redISub(this.y);
            return this.curve.point(r, i)
        }, f.prototype.dbl = function () {
            if (this.inf) return this;
            var e = this.y.redAdd(this.y);
            if (0 === e.cmpn(0)) return this.curve.point(null, null);
            var t = this.curve.a, r = this.x.redSqr(), i = e.redInvm(), n = r.redAdd(r).redIAdd(r).redIAdd(t).redMul(i),
                a = n.redSqr().redISub(this.x.redAdd(this.x)), s = n.redMul(this.x.redSub(a)).redISub(this.y);
            return this.curve.point(a, s)
        }, f.prototype.getX = function () {
            return this.x.fromRed()
        }, f.prototype.getY = function () {
            return this.y.fromRed()
        }, f.prototype.mul = function (e) {
            return e = new n(e, 16), this.isInfinity() ? this : this._hasDoubles(e) ? this.curve._fixedNafMul(this, e) : this.curve.endo ? this.curve._endoWnafMulAdd([this], [e]) : this.curve._wnafMul(this, e)
        }, f.prototype.mulAdd = function (e, t, r) {
            var i = [this, t], n = [e, r];
            return this.curve.endo ? this.curve._endoWnafMulAdd(i, n) : this.curve._wnafMulAdd(1, i, n, 2)
        }, f.prototype.jmulAdd = function (e, t, r) {
            var i = [this, t], n = [e, r];
            return this.curve.endo ? this.curve._endoWnafMulAdd(i, n, !0) : this.curve._wnafMulAdd(1, i, n, 2, !0)
        }, f.prototype.eq = function (e) {
            return this === e || this.inf === e.inf && (this.inf || 0 === this.x.cmp(e.x) && 0 === this.y.cmp(e.y))
        }, f.prototype.neg = function (e) {
            if (this.inf) return this;
            var t = this.curve.point(this.x, this.y.redNeg());
            if (e && this.precomputed) {
                var r = this.precomputed, i = function (e) {
                    return e.neg()
                };
                t.precomputed = {
                    naf: r.naf && {wnd: r.naf.wnd, points: r.naf.points.map(i)},
                    doubles: r.doubles && {step: r.doubles.step, points: r.doubles.points.map(i)}
                }
            }
            return t
        }, f.prototype.toJ = function () {
            return this.inf ? this.curve.jpoint(null, null, null) : this.curve.jpoint(this.x, this.y, this.curve.one)
        }, a(d, s.BasePoint), c.prototype.jpoint = function (e, t, r) {
            return new d(this, e, t, r)
        }, d.prototype.toP = function () {
            if (this.isInfinity()) return this.curve.point(null, null);
            var e = this.z.redInvm(), t = e.redSqr(), r = this.x.redMul(t), i = this.y.redMul(t).redMul(e);
            return this.curve.point(r, i)
        }, d.prototype.neg = function () {
            return this.curve.jpoint(this.x, this.y.redNeg(), this.z)
        }, d.prototype.add = function (e) {
            if (this.isInfinity()) return e;
            if (e.isInfinity()) return this;
            var t = e.z.redSqr(), r = this.z.redSqr(), i = this.x.redMul(t), n = e.x.redMul(r),
                a = this.y.redMul(t.redMul(e.z)), s = e.y.redMul(r.redMul(this.z)), o = i.redSub(n), c = a.redSub(s);
            if (0 === o.cmpn(0)) return 0 !== c.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var f = o.redSqr(), d = f.redMul(o), u = i.redMul(f), l = c.redSqr().redIAdd(d).redISub(u).redISub(u),
                h = c.redMul(u.redISub(l)).redISub(a.redMul(d)), p = this.z.redMul(e.z).redMul(o);
            return this.curve.jpoint(l, h, p)
        }, d.prototype.mixedAdd = function (e) {
            if (this.isInfinity()) return e.toJ();
            if (e.isInfinity()) return this;
            var t = this.z.redSqr(), r = this.x, i = e.x.redMul(t), n = this.y, a = e.y.redMul(t).redMul(this.z),
                s = r.redSub(i), o = n.redSub(a);
            if (0 === s.cmpn(0)) return 0 !== o.cmpn(0) ? this.curve.jpoint(null, null, null) : this.dbl();
            var c = s.redSqr(), f = c.redMul(s), d = r.redMul(c), u = o.redSqr().redIAdd(f).redISub(d).redISub(d),
                l = o.redMul(d.redISub(u)).redISub(n.redMul(f)), h = this.z.redMul(s);
            return this.curve.jpoint(u, l, h)
        }, d.prototype.dblp = function (e) {
            if (0 === e) return this;
            if (this.isInfinity()) return this;
            if (!e) return this.dbl();
            var t;
            if (this.curve.zeroA || this.curve.threeA) {
                var r = this;
                for (t = 0; t < e; t++) r = r.dbl();
                return r
            }
            var i = this.curve.a, n = this.curve.tinv, a = this.x, s = this.y, o = this.z, c = o.redSqr().redSqr(),
                f = s.redAdd(s);
            for (t = 0; t < e; t++) {
                var d = a.redSqr(), u = f.redSqr(), l = u.redSqr(), h = d.redAdd(d).redIAdd(d).redIAdd(i.redMul(c)),
                    p = a.redMul(u), g = h.redSqr().redISub(p.redAdd(p)), y = p.redISub(g), m = h.redMul(y);
                m = m.redIAdd(m).redISub(l);
                var v = f.redMul(o);
                t + 1 < e && (c = c.redMul(l)), a = g, o = v, f = m
            }
            return this.curve.jpoint(a, f.redMul(n), o)
        }, d.prototype.dbl = function () {
            return this.isInfinity() ? this : this.curve.zeroA ? this._zeroDbl() : this.curve.threeA ? this._threeDbl() : this._dbl()
        }, d.prototype._zeroDbl = function () {
            var e, t, r;
            if (this.zOne) {
                var i = this.x.redSqr(), n = this.y.redSqr(), a = n.redSqr(),
                    s = this.x.redAdd(n).redSqr().redISub(i).redISub(a);
                s = s.redIAdd(s);
                var o = i.redAdd(i).redIAdd(i), c = o.redSqr().redISub(s).redISub(s), f = a.redIAdd(a);
                f = (f = f.redIAdd(f)).redIAdd(f), e = c, t = o.redMul(s.redISub(c)).redISub(f), r = this.y.redAdd(this.y)
            } else {
                var d = this.x.redSqr(), u = this.y.redSqr(), l = u.redSqr(),
                    h = this.x.redAdd(u).redSqr().redISub(d).redISub(l);
                h = h.redIAdd(h);
                var p = d.redAdd(d).redIAdd(d), g = p.redSqr(), y = l.redIAdd(l);
                y = (y = y.redIAdd(y)).redIAdd(y), e = g.redISub(h).redISub(h), t = p.redMul(h.redISub(e)).redISub(y), r = (r = this.y.redMul(this.z)).redIAdd(r)
            }
            return this.curve.jpoint(e, t, r)
        }, d.prototype._threeDbl = function () {
            var e, t, r;
            if (this.zOne) {
                var i = this.x.redSqr(), n = this.y.redSqr(), a = n.redSqr(),
                    s = this.x.redAdd(n).redSqr().redISub(i).redISub(a);
                s = s.redIAdd(s);
                var o = i.redAdd(i).redIAdd(i).redIAdd(this.curve.a), c = o.redSqr().redISub(s).redISub(s);
                e = c;
                var f = a.redIAdd(a);
                f = (f = f.redIAdd(f)).redIAdd(f), t = o.redMul(s.redISub(c)).redISub(f), r = this.y.redAdd(this.y)
            } else {
                var d = this.z.redSqr(), u = this.y.redSqr(), l = this.x.redMul(u),
                    h = this.x.redSub(d).redMul(this.x.redAdd(d));
                h = h.redAdd(h).redIAdd(h);
                var p = l.redIAdd(l), g = (p = p.redIAdd(p)).redAdd(p);
                e = h.redSqr().redISub(g), r = this.y.redAdd(this.z).redSqr().redISub(u).redISub(d);
                var y = u.redSqr();
                y = (y = (y = y.redIAdd(y)).redIAdd(y)).redIAdd(y), t = h.redMul(p.redISub(e)).redISub(y)
            }
            return this.curve.jpoint(e, t, r)
        }, d.prototype._dbl = function () {
            var e = this.curve.a, t = this.x, r = this.y, i = this.z, n = i.redSqr().redSqr(), a = t.redSqr(),
                s = r.redSqr(), o = a.redAdd(a).redIAdd(a).redIAdd(e.redMul(n)), c = t.redAdd(t),
                f = (c = c.redIAdd(c)).redMul(s), d = o.redSqr().redISub(f.redAdd(f)), u = f.redISub(d), l = s.redSqr();
            l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
            var h = o.redMul(u).redISub(l), p = r.redAdd(r).redMul(i);
            return this.curve.jpoint(d, h, p)
        }, d.prototype.trpl = function () {
            if (!this.curve.zeroA) return this.dbl().add(this);
            var e = this.x.redSqr(), t = this.y.redSqr(), r = this.z.redSqr(), i = t.redSqr(),
                n = e.redAdd(e).redIAdd(e), a = n.redSqr(), s = this.x.redAdd(t).redSqr().redISub(e).redISub(i),
                o = (s = (s = (s = s.redIAdd(s)).redAdd(s).redIAdd(s)).redISub(a)).redSqr(), c = i.redIAdd(i);
            c = (c = (c = c.redIAdd(c)).redIAdd(c)).redIAdd(c);
            var f = n.redIAdd(s).redSqr().redISub(a).redISub(o).redISub(c), d = t.redMul(f);
            d = (d = d.redIAdd(d)).redIAdd(d);
            var u = this.x.redMul(o).redISub(d);
            u = (u = u.redIAdd(u)).redIAdd(u);
            var l = this.y.redMul(f.redMul(c.redISub(f)).redISub(s.redMul(o)));
            l = (l = (l = l.redIAdd(l)).redIAdd(l)).redIAdd(l);
            var h = this.z.redAdd(s).redSqr().redISub(r).redISub(o);
            return this.curve.jpoint(u, l, h)
        }, d.prototype.mul = function (e, t) {
            return e = new n(e, t), this.curve._wnafMul(this, e)
        }, d.prototype.eq = function (e) {
            if ("affine" === e.type) return this.eq(e.toJ());
            if (this === e) return !0;
            var t = this.z.redSqr(), r = e.z.redSqr();
            if (0 !== this.x.redMul(r).redISub(e.x.redMul(t)).cmpn(0)) return !1;
            var i = t.redMul(this.z), n = r.redMul(e.z);
            return 0 === this.y.redMul(n).redISub(e.y.redMul(i)).cmpn(0)
        }, d.prototype.eqXToP = function (e) {
            var t = this.z.redSqr(), r = e.toRed(this.curve.red).redMul(t);
            if (0 === this.x.cmp(r)) return !0;
            for (var i = e.clone(), n = this.curve.redN.redMul(t); ;) {
                if (i.iadd(this.curve.n), i.cmp(this.curve.p) >= 0) return !1;
                if (r.redIAdd(n), 0 === this.x.cmp(r)) return !0
            }
        }, d.prototype.inspect = function () {
            return this.isInfinity() ? "<EC JPoint Infinity>" : "<EC JPoint x: " + this.x.toString(16, 2) + " y: " + this.y.toString(16, 2) + " z: " + this.z.toString(16, 2) + ">"
        }, d.prototype.isInfinity = function () {
            return 0 === this.z.cmpn(0)
        }
    }, 45427: (e, t, r) => {
        "use strict";
        var i, n = t, a = r(33715), s = r(88254), o = r(80953).assert;

        function c(e) {
            "short" === e.type ? this.curve = new s.short(e) : "edwards" === e.type ? this.curve = new s.edwards(e) : this.curve = new s.mont(e), this.g = this.curve.g, this.n = this.curve.n, this.hash = e.hash, o(this.g.validate(), "Invalid curve"), o(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O")
        }

        function f(e, t) {
            Object.defineProperty(n, e, {
                configurable: !0, enumerable: !0, get: function () {
                    var r = new c(t);
                    return Object.defineProperty(n, e, {configurable: !0, enumerable: !0, value: r}), r
                }
            })
        }

        n.PresetCurve = c, f("p192", {
            type: "short",
            prime: "p192",
            p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
            b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
            n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
            hash: a.sha256,
            gRed: !1,
            g: ["188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012", "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811"]
        }), f("p224", {
            type: "short",
            prime: "p224",
            p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
            a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
            b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
            n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
            hash: a.sha256,
            gRed: !1,
            g: ["b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21", "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34"]
        }), f("p256", {
            type: "short",
            prime: null,
            p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
            a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
            b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
            n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
            hash: a.sha256,
            gRed: !1,
            g: ["6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296", "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5"]
        }), f("p384", {
            type: "short",
            prime: null,
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
            a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
            b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
            n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
            hash: a.sha384,
            gRed: !1,
            g: ["aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7", "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f"]
        }), f("p521", {
            type: "short",
            prime: null,
            p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
            a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
            b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
            n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
            hash: a.sha512,
            gRed: !1,
            g: ["000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66", "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650"]
        }), f("curve25519", {
            type: "mont",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "76d06",
            b: "1",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: a.sha256,
            gRed: !1,
            g: ["9"]
        }), f("ed25519", {
            type: "edwards",
            prime: "p25519",
            p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
            a: "-1",
            c: "1",
            d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
            n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
            hash: a.sha256,
            gRed: !1,
            g: ["216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a", "6666666666666666666666666666666666666666666666666666666666666658"]
        });
        try {
            i = r(91037)
        } catch (d) {
            i = void 0
        }
        f("secp256k1", {
            type: "short",
            prime: "k256",
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            a: "0",
            b: "7",
            n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
            h: "1",
            hash: a.sha256,
            beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
            lambda: "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
            basis: [{
                a: "3086d221a7d46bcde86c90e49284eb15",
                b: "-e4437ed6010e88286f547fa90abfe4c3"
            }, {a: "114ca50f7a8e2f3f657c1108d9d44cfd8", b: "3086d221a7d46bcde86c90e49284eb15"}],
            gRed: !1,
            g: ["79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798", "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8", i]
        })
    }, 57954: (e, t, r) => {
        "use strict";
        var i = r(13550), n = r(2156), a = r(80953), s = r(45427), o = r(29931), c = a.assert, f = r(31251),
            d = r(90611);

        function u(e) {
            if (!(this instanceof u)) return new u(e);
            "string" == typeof e && (c(Object.prototype.hasOwnProperty.call(s, e), "Unknown curve " + e), e = s[e]), e instanceof s.PresetCurve && (e = {curve: e}), this.curve = e.curve.curve, this.n = this.curve.n, this.nh = this.n.ushrn(1), this.g = this.curve.g, this.g = e.curve.g, this.g.precompute(e.curve.n.bitLength() + 1), this.hash = e.hash || e.curve.hash
        }

        e.exports = u, u.prototype.keyPair = function (e) {
            return new f(this, e)
        }, u.prototype.keyFromPrivate = function (e, t) {
            return f.fromPrivate(this, e, t)
        }, u.prototype.keyFromPublic = function (e, t) {
            return f.fromPublic(this, e, t)
        }, u.prototype.genKeyPair = function (e) {
            e || (e = {});
            for (var t = new n({
                hash: this.hash,
                pers: e.pers,
                persEnc: e.persEnc || "utf8",
                entropy: e.entropy || o(this.hash.hmacStrength),
                entropyEnc: e.entropy && e.entropyEnc || "utf8",
                nonce: this.n.toArray()
            }), r = this.n.byteLength(), a = this.n.sub(new i(2)); ;) {
                var s = new i(t.generate(r));
                if (!(s.cmp(a) > 0)) return s.iaddn(1), this.keyFromPrivate(s)
            }
        }, u.prototype._truncateToN = function (e, t) {
            var r = 8 * e.byteLength() - this.n.bitLength();
            return r > 0 && (e = e.ushrn(r)), !t && e.cmp(this.n) >= 0 ? e.sub(this.n) : e
        }, u.prototype.sign = function (e, t, r, a) {
            "object" == typeof r && (a = r, r = null), a || (a = {}), t = this.keyFromPrivate(t, r), e = this._truncateToN(new i(e, 16));
            for (var s = this.n.byteLength(), o = t.getPrivate().toArray("be", s), c = e.toArray("be", s), f = new n({
                hash: this.hash,
                entropy: o,
                nonce: c,
                pers: a.pers,
                persEnc: a.persEnc || "utf8"
            }), u = this.n.sub(new i(1)), l = 0; ; l++) {
                var h = a.k ? a.k(l) : new i(f.generate(this.n.byteLength()));
                if (!((h = this._truncateToN(h, !0)).cmpn(1) <= 0 || h.cmp(u) >= 0)) {
                    var p = this.g.mul(h);
                    if (!p.isInfinity()) {
                        var g = p.getX(), y = g.umod(this.n);
                        if (0 !== y.cmpn(0)) {
                            var m = h.invm(this.n).mul(y.mul(t.getPrivate()).iadd(e));
                            if (0 !== (m = m.umod(this.n)).cmpn(0)) {
                                var v = (p.getY().isOdd() ? 1 : 0) | (0 !== g.cmp(y) ? 2 : 0);
                                return a.canonical && m.cmp(this.nh) > 0 && (m = this.n.sub(m), v ^= 1), new d({
                                    r: y,
                                    s: m,
                                    recoveryParam: v
                                })
                            }
                        }
                    }
                }
            }
        }, u.prototype.verify = function (e, t, r, n) {
            e = this._truncateToN(new i(e, 16)), r = this.keyFromPublic(r, n);
            var a = (t = new d(t, "hex")).r, s = t.s;
            if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
            if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0) return !1;
            var o, c = s.invm(this.n), f = c.mul(e).umod(this.n), u = c.mul(a).umod(this.n);
            return this.curve._maxwellTrick ? !(o = this.g.jmulAdd(f, r.getPublic(), u)).isInfinity() && o.eqXToP(a) : !(o = this.g.mulAdd(f, r.getPublic(), u)).isInfinity() && 0 === o.getX().umod(this.n).cmp(a)
        }, u.prototype.recoverPubKey = function (e, t, r, n) {
            c((3 & r) === r, "The recovery param is more than two bits"), t = new d(t, n);
            var a = this.n, s = new i(e), o = t.r, f = t.s, u = 1 & r, l = r >> 1;
            if (o.cmp(this.curve.p.umod(this.curve.n)) >= 0 && l) throw new Error("Unable to find sencond key candinate");
            o = l ? this.curve.pointFromX(o.add(this.curve.n), u) : this.curve.pointFromX(o, u);
            var h = t.r.invm(a), p = a.sub(s).mul(h).umod(a), g = f.mul(h).umod(a);
            return this.g.mulAdd(p, o, g)
        }, u.prototype.getKeyRecoveryParam = function (e, t, r, i) {
            if (null !== (t = new d(t, i)).recoveryParam) return t.recoveryParam;
            for (var n = 0; n < 4; n++) {
                var a;
                try {
                    a = this.recoverPubKey(e, t, n)
                } catch (e) {
                    continue
                }
                if (a.eq(r)) return n
            }
            throw new Error("Unable to find valid recovery factor")
        }
    }, 31251: (e, t, r) => {
        "use strict";
        var i = r(13550), n = r(80953).assert;

        function a(e, t) {
            this.ec = e, this.priv = null, this.pub = null, t.priv && this._importPrivate(t.priv, t.privEnc), t.pub && this._importPublic(t.pub, t.pubEnc)
        }

        e.exports = a, a.fromPublic = function (e, t, r) {
            return t instanceof a ? t : new a(e, {pub: t, pubEnc: r})
        }, a.fromPrivate = function (e, t, r) {
            return t instanceof a ? t : new a(e, {priv: t, privEnc: r})
        }, a.prototype.validate = function () {
            var e = this.getPublic();
            return e.isInfinity() ? {
                result: !1,
                reason: "Invalid public key"
            } : e.validate() ? e.mul(this.ec.curve.n).isInfinity() ? {result: !0, reason: null} : {
                result: !1,
                reason: "Public key * N != O"
            } : {result: !1, reason: "Public key is not a point"}
        }, a.prototype.getPublic = function (e, t) {
            return "string" == typeof e && (t = e, e = null), this.pub || (this.pub = this.ec.g.mul(this.priv)), t ? this.pub.encode(t, e) : this.pub
        }, a.prototype.getPrivate = function (e) {
            return "hex" === e ? this.priv.toString(16, 2) : this.priv
        }, a.prototype._importPrivate = function (e, t) {
            this.priv = new i(e, t || 16), this.priv = this.priv.umod(this.ec.curve.n)
        }, a.prototype._importPublic = function (e, t) {
            if (e.x || e.y) return "mont" === this.ec.curve.type ? n(e.x, "Need x coordinate") : "short" !== this.ec.curve.type && "edwards" !== this.ec.curve.type || n(e.x && e.y, "Need both x and y coordinate"), void (this.pub = this.ec.curve.point(e.x, e.y));
            this.pub = this.ec.curve.decodePoint(e, t)
        }, a.prototype.derive = function (e) {
            return e.validate() || n(e.validate(), "public point not validated"), e.mul(this.priv).getX()
        }, a.prototype.sign = function (e, t, r) {
            return this.ec.sign(e, this, t, r)
        }, a.prototype.verify = function (e, t) {
            return this.ec.verify(e, t, this)
        }, a.prototype.inspect = function () {
            return "<Key priv: " + (this.priv && this.priv.toString(16, 2)) + " pub: " + (this.pub && this.pub.inspect()) + " >"
        }
    }, 90611: (e, t, r) => {
        "use strict";
        var i = r(13550), n = r(80953), a = n.assert;

        function s(e, t) {
            if (e instanceof s) return e;
            this._importDER(e, t) || (a(e.r && e.s, "Signature without r or s"), this.r = new i(e.r, 16), this.s = new i(e.s, 16), void 0 === e.recoveryParam ? this.recoveryParam = null : this.recoveryParam = e.recoveryParam)
        }

        function o() {
            this.place = 0
        }

        function c(e, t) {
            var r = e[t.place++];
            if (!(128 & r)) return r;
            var i = 15 & r;
            if (0 === i || i > 4) return !1;
            for (var n = 0, a = 0, s = t.place; a < i; a++, s++) n <<= 8, n |= e[s], n >>>= 0;
            return !(n <= 127) && (t.place = s, n)
        }

        function f(e) {
            for (var t = 0, r = e.length - 1; !e[t] && !(128 & e[t + 1]) && t < r;) t++;
            return 0 === t ? e : e.slice(t)
        }

        function d(e, t) {
            if (t < 128) e.push(t); else {
                var r = 1 + (Math.log(t) / Math.LN2 >>> 3);
                for (e.push(128 | r); --r;) e.push(t >>> (r << 3) & 255);
                e.push(t)
            }
        }

        e.exports = s, s.prototype._importDER = function (e, t) {
            e = n.toArray(e, t);
            var r = new o;
            if (48 !== e[r.place++]) return !1;
            var a = c(e, r);
            if (!1 === a) return !1;
            if (a + r.place !== e.length) return !1;
            if (2 !== e[r.place++]) return !1;
            var s = c(e, r);
            if (!1 === s) return !1;
            var f = e.slice(r.place, s + r.place);
            if (r.place += s, 2 !== e[r.place++]) return !1;
            var d = c(e, r);
            if (!1 === d) return !1;
            if (e.length !== d + r.place) return !1;
            var u = e.slice(r.place, d + r.place);
            if (0 === f[0]) {
                if (!(128 & f[1])) return !1;
                f = f.slice(1)
            }
            if (0 === u[0]) {
                if (!(128 & u[1])) return !1;
                u = u.slice(1)
            }
            return this.r = new i(f), this.s = new i(u), this.recoveryParam = null, !0
        }, s.prototype.toDER = function (e) {
            var t = this.r.toArray(), r = this.s.toArray();
            for (128 & t[0] && (t = [0].concat(t)), 128 & r[0] && (r = [0].concat(r)), t = f(t), r = f(r); !(r[0] || 128 & r[1]);) r = r.slice(1);
            var i = [2];
            d(i, t.length), (i = i.concat(t)).push(2), d(i, r.length);
            var a = i.concat(r), s = [48];
            return d(s, a.length), s = s.concat(a), n.encode(s, e)
        }
    }, 65980: (e, t, r) => {
        "use strict";
        var i = r(33715), n = r(45427), a = r(80953), s = a.assert, o = a.parseBytes, c = r(79087), f = r(23622);

        function d(e) {
            if (s("ed25519" === e, "only tested with ed25519 so far"), !(this instanceof d)) return new d(e);
            e = n[e].curve, this.curve = e, this.g = e.g, this.g.precompute(e.n.bitLength() + 1), this.pointClass = e.point().constructor, this.encodingLength = Math.ceil(e.n.bitLength() / 8), this.hash = i.sha512
        }

        e.exports = d, d.prototype.sign = function (e, t) {
            e = o(e);
            var r = this.keyFromSecret(t), i = this.hashInt(r.messagePrefix(), e), n = this.g.mul(i),
                a = this.encodePoint(n), s = this.hashInt(a, r.pubBytes(), e).mul(r.priv()),
                c = i.add(s).umod(this.curve.n);
            return this.makeSignature({R: n, S: c, Rencoded: a})
        }, d.prototype.verify = function (e, t, r) {
            e = o(e), t = this.makeSignature(t);
            var i = this.keyFromPublic(r), n = this.hashInt(t.Rencoded(), i.pubBytes(), e), a = this.g.mul(t.S());
            return t.R().add(i.pub().mul(n)).eq(a)
        }, d.prototype.hashInt = function () {
            for (var e = this.hash(), t = 0; t < arguments.length; t++) e.update(arguments[t]);
            return a.intFromLE(e.digest()).umod(this.curve.n)
        }, d.prototype.keyFromPublic = function (e) {
            return c.fromPublic(this, e)
        }, d.prototype.keyFromSecret = function (e) {
            return c.fromSecret(this, e)
        }, d.prototype.makeSignature = function (e) {
            return e instanceof f ? e : new f(this, e)
        }, d.prototype.encodePoint = function (e) {
            var t = e.getY().toArray("le", this.encodingLength);
            return t[this.encodingLength - 1] |= e.getX().isOdd() ? 128 : 0, t
        }, d.prototype.decodePoint = function (e) {
            var t = (e = a.parseBytes(e)).length - 1, r = e.slice(0, t).concat(-129 & e[t]), i = 0 != (128 & e[t]),
                n = a.intFromLE(r);
            return this.curve.pointFromY(n, i)
        }, d.prototype.encodeInt = function (e) {
            return e.toArray("le", this.encodingLength)
        }, d.prototype.decodeInt = function (e) {
            return a.intFromLE(e)
        }, d.prototype.isPoint = function (e) {
            return e instanceof this.pointClass
        }
    }, 79087: (e, t, r) => {
        "use strict";
        var i = r(80953), n = i.assert, a = i.parseBytes, s = i.cachedProperty;

        function o(e, t) {
            this.eddsa = e, this._secret = a(t.secret), e.isPoint(t.pub) ? this._pub = t.pub : this._pubBytes = a(t.pub)
        }

        o.fromPublic = function (e, t) {
            return t instanceof o ? t : new o(e, {pub: t})
        }, o.fromSecret = function (e, t) {
            return t instanceof o ? t : new o(e, {secret: t})
        }, o.prototype.secret = function () {
            return this._secret
        }, s(o, "pubBytes", (function () {
            return this.eddsa.encodePoint(this.pub())
        })), s(o, "pub", (function () {
            return this._pubBytes ? this.eddsa.decodePoint(this._pubBytes) : this.eddsa.g.mul(this.priv())
        })), s(o, "privBytes", (function () {
            var e = this.eddsa, t = this.hash(), r = e.encodingLength - 1, i = t.slice(0, e.encodingLength);
            return i[0] &= 248, i[r] &= 127, i[r] |= 64, i
        })), s(o, "priv", (function () {
            return this.eddsa.decodeInt(this.privBytes())
        })), s(o, "hash", (function () {
            return this.eddsa.hash().update(this.secret()).digest()
        })), s(o, "messagePrefix", (function () {
            return this.hash().slice(this.eddsa.encodingLength)
        })), o.prototype.sign = function (e) {
            return n(this._secret, "KeyPair can only verify"), this.eddsa.sign(e, this)
        }, o.prototype.verify = function (e, t) {
            return this.eddsa.verify(e, t, this)
        }, o.prototype.getSecret = function (e) {
            return n(this._secret, "KeyPair is public only"), i.encode(this.secret(), e)
        }, o.prototype.getPublic = function (e) {
            return i.encode(this.pubBytes(), e)
        }, e.exports = o
    }, 23622: (e, t, r) => {
        "use strict";
        var i = r(13550), n = r(80953), a = n.assert, s = n.cachedProperty, o = n.parseBytes;

        function c(e, t) {
            this.eddsa = e, "object" != typeof t && (t = o(t)), Array.isArray(t) && (t = {
                R: t.slice(0, e.encodingLength),
                S: t.slice(e.encodingLength)
            }), a(t.R && t.S, "Signature without R or S"), e.isPoint(t.R) && (this._R = t.R), t.S instanceof i && (this._S = t.S), this._Rencoded = Array.isArray(t.R) ? t.R : t.Rencoded, this._Sencoded = Array.isArray(t.S) ? t.S : t.Sencoded
        }

        s(c, "S", (function () {
            return this.eddsa.decodeInt(this.Sencoded())
        })), s(c, "R", (function () {
            return this.eddsa.decodePoint(this.Rencoded())
        })), s(c, "Rencoded", (function () {
            return this.eddsa.encodePoint(this.R())
        })), s(c, "Sencoded", (function () {
            return this.eddsa.encodeInt(this.S())
        })), c.prototype.toBytes = function () {
            return this.Rencoded().concat(this.Sencoded())
        }, c.prototype.toHex = function () {
            return n.encode(this.toBytes(), "hex").toUpperCase()
        }, e.exports = c
    }, 91037: e => {
        e.exports = {
            doubles: {
                step: 4,
                points: [["e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a", "f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821"], ["8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508", "11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf"], ["175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739", "d3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695"], ["363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640", "4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9"], ["8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c", "4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36"], ["723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda", "96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f"], ["eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa", "5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999"], ["100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0", "cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09"], ["e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d", "9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d"], ["feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d", "e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088"], ["da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1", "9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d"], ["53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0", "5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8"], ["8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047", "10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a"], ["385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862", "283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453"], ["6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7", "7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160"], ["3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd", "56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0"], ["85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83", "7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6"], ["948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a", "53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589"], ["6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8", "bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17"], ["e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d", "4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda"], ["e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725", "7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd"], ["213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754", "4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2"], ["4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c", "17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6"], ["fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6", "6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f"], ["76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39", "c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01"], ["c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891", "893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3"], ["d895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b", "febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f"], ["b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03", "2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7"], ["e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d", "eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78"], ["a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070", "7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1"], ["90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4", "e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150"], ["8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da", "662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82"], ["e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11", "1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc"], ["8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e", "efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b"], ["e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41", "2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51"], ["b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef", "67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45"], ["d68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8", "db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120"], ["324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d", "648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84"], ["4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96", "35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d"], ["9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd", "ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d"], ["6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5", "9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8"], ["a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266", "40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8"], ["7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71", "34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac"], ["928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac", "c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f"], ["85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751", "1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962"], ["ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e", "493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907"], ["827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241", "c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec"], ["eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3", "be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d"], ["e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f", "4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414"], ["1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19", "aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd"], ["146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be", "b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0"], ["fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9", "6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811"], ["da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2", "8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1"], ["a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13", "7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c"], ["174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c", "ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73"], ["959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba", "2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd"], ["d2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151", "e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405"], ["64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073", "d99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589"], ["8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458", "38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e"], ["13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b", "69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27"], ["bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366", "d3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1"], ["8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa", "40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482"], ["8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0", "620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945"], ["dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787", "7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573"], ["f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e", "ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82"]]
            }, naf: {
                wnd: 7,
                points: [["f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9", "388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672"], ["2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4", "d8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6"], ["5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc", "6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da"], ["acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe", "cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37"], ["774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb", "d984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b"], ["f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8", "ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81"], ["d7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e", "581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58"], ["defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34", "4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77"], ["2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c", "85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a"], ["352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5", "321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c"], ["2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f", "2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67"], ["9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714", "73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402"], ["daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729", "a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55"], ["c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db", "2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482"], ["6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4", "e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82"], ["1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5", "b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396"], ["605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479", "2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49"], ["62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d", "80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf"], ["80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f", "1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a"], ["7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb", "d0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7"], ["d528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9", "eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933"], ["49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963", "758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a"], ["77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74", "958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6"], ["f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530", "e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37"], ["463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b", "5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e"], ["f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247", "cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6"], ["caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1", "cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476"], ["2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120", "4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40"], ["7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435", "91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61"], ["754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18", "673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683"], ["e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8", "59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5"], ["186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb", "3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b"], ["df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f", "55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417"], ["5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143", "efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868"], ["290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba", "e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a"], ["af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45", "f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6"], ["766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a", "744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996"], ["59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e", "c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e"], ["f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8", "e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d"], ["7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c", "30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2"], ["948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519", "e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e"], ["7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab", "100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437"], ["3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca", "ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311"], ["d3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf", "8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4"], ["1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610", "68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575"], ["733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4", "f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d"], ["15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c", "d56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d"], ["a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940", "edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629"], ["e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980", "a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06"], ["311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3", "66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374"], ["34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf", "9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee"], ["f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63", "4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1"], ["d7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448", "fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b"], ["32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf", "5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661"], ["7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5", "8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6"], ["ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6", "8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e"], ["16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5", "5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d"], ["eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99", "f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc"], ["78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51", "f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4"], ["494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5", "42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c"], ["a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5", "204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b"], ["c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997", "4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913"], ["841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881", "73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154"], ["5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5", "39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865"], ["36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66", "d2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc"], ["336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726", "ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224"], ["8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede", "6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e"], ["1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94", "60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6"], ["85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31", "3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511"], ["29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51", "b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b"], ["a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252", "ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2"], ["4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5", "cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c"], ["d24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b", "6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3"], ["ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4", "322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d"], ["af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f", "6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700"], ["e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889", "2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4"], ["591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246", "b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196"], ["11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984", "998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4"], ["3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a", "b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257"], ["cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030", "bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13"], ["c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197", "6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096"], ["c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593", "c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38"], ["a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef", "21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f"], ["347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38", "60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448"], ["da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a", "49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a"], ["c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111", "5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4"], ["4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502", "7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437"], ["3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea", "be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7"], ["cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26", "8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d"], ["b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986", "39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a"], ["d4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e", "62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54"], ["48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4", "25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77"], ["dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda", "ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517"], ["6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859", "cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10"], ["e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f", "f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125"], ["eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c", "6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e"], ["13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942", "fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1"], ["ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a", "1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2"], ["b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80", "5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423"], ["ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d", "438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8"], ["8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1", "cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758"], ["52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63", "c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375"], ["e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352", "6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d"], ["7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193", "ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec"], ["5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00", "9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0"], ["32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58", "ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c"], ["e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7", "d3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4"], ["8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8", "c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f"], ["4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e", "67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649"], ["3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d", "cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826"], ["674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b", "299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5"], ["d32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f", "f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87"], ["30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6", "462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b"], ["be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297", "62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc"], ["93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a", "7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c"], ["b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c", "ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f"], ["d5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52", "4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a"], ["d3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb", "bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46"], ["463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065", "bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f"], ["7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917", "603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03"], ["74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9", "cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08"], ["30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3", "553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8"], ["9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57", "712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373"], ["176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66", "ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3"], ["75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8", "9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8"], ["809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721", "9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1"], ["1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180", "4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9"]]
            }
        }
    }, 80953: (e, t, r) => {
        "use strict";
        var i = t, n = r(13550), a = r(79746), s = r(34504);
        i.assert = a, i.toArray = s.toArray, i.zero2 = s.zero2, i.toHex = s.toHex, i.encode = s.encode, i.getNAF = function (e, t, r) {
            var i = new Array(Math.max(e.bitLength(), r) + 1);
            i.fill(0);
            for (var n = 1 << t + 1, a = e.clone(), s = 0; s < i.length; s++) {
                var o, c = a.andln(n - 1);
                a.isOdd() ? (o = c > (n >> 1) - 1 ? (n >> 1) - c : c, a.isubn(o)) : o = 0, i[s] = o, a.iushrn(1)
            }
            return i
        }, i.getJSF = function (e, t) {
            var r = [[], []];
            e = e.clone(), t = t.clone();
            for (var i, n = 0, a = 0; e.cmpn(-n) > 0 || t.cmpn(-a) > 0;) {
                var s, o, c = e.andln(3) + n & 3, f = t.andln(3) + a & 3;
                3 === c && (c = -1), 3 === f && (f = -1), s = 0 == (1 & c) ? 0 : 3 !== (i = e.andln(7) + n & 7) && 5 !== i || 2 !== f ? c : -c, r[0].push(s), o = 0 == (1 & f) ? 0 : 3 !== (i = t.andln(7) + a & 7) && 5 !== i || 2 !== c ? f : -f, r[1].push(o), 2 * n === s + 1 && (n = 1 - n), 2 * a === o + 1 && (a = 1 - a), e.iushrn(1), t.iushrn(1)
            }
            return r
        }, i.cachedProperty = function (e, t, r) {
            var i = "_" + t;
            e.prototype[t] = function () {
                return void 0 !== this[i] ? this[i] : this[i] = r.call(this)
            }
        }, i.parseBytes = function (e) {
            return "string" == typeof e ? i.toArray(e, "hex") : e
        }, i.intFromLE = function (e) {
            return new n(e, "hex", "le")
        }
    }, 8925: (e, t, r) => {
        var i = r(3832);

        function n(e, t) {
            i.cipher.registerAlgorithm(e, (function () {
                return new i.aes.Algorithm(e, t)
            }))
        }

        r(85649), r(61967), r(97116), e.exports = i.aes = i.aes || {}, i.aes.startEncrypting = function (e, t, r, i) {
            var n = g({key: e, output: r, decrypt: !1, mode: i});
            return n.start(t), n
        }, i.aes.createEncryptionCipher = function (e, t) {
            return g({key: e, output: null, decrypt: !1, mode: t})
        }, i.aes.startDecrypting = function (e, t, r, i) {
            var n = g({key: e, output: r, decrypt: !0, mode: i});
            return n.start(t), n
        }, i.aes.createDecryptionCipher = function (e, t) {
            return g({key: e, output: null, decrypt: !0, mode: t})
        }, i.aes.Algorithm = function (e, t) {
            d || l();
            var r = this;
            r.name = e, r.mode = new t({
                blockSize: 16, cipher: {
                    encrypt: function (e, t) {
                        return p(r._w, e, t, !1)
                    }, decrypt: function (e, t) {
                        return p(r._w, e, t, !0)
                    }
                }
            }), r._init = !1
        }, i.aes.Algorithm.prototype.initialize = function (e) {
            if (!this._init) {
                var t, r = e.key;
                if ("string" != typeof r || 16 !== r.length && 24 !== r.length && 32 !== r.length) {
                    if (i.util.isArray(r) && (16 === r.length || 24 === r.length || 32 === r.length)) {
                        t = r, r = i.util.createBuffer();
                        for (var n = 0; n < t.length; ++n) r.putByte(t[n])
                    }
                } else r = i.util.createBuffer(r);
                if (!i.util.isArray(r)) {
                    t = r, r = [];
                    var a = t.length();
                    if (16 === a || 24 === a || 32 === a) {
                        a >>>= 2;
                        for (n = 0; n < a; ++n) r.push(t.getInt32())
                    }
                }
                if (!i.util.isArray(r) || 4 !== r.length && 6 !== r.length && 8 !== r.length) throw new Error("Invalid key parameter.");
                var s = this.mode.name, o = -1 !== ["CFB", "OFB", "CTR", "GCM"].indexOf(s);
                this._w = h(r, e.decrypt && !o), this._init = !0
            }
        }, i.aes._expandKey = function (e, t) {
            return d || l(), h(e, t)
        }, i.aes._updateBlock = p, n("AES-ECB", i.cipher.modes.ecb), n("AES-CBC", i.cipher.modes.cbc), n("AES-CFB", i.cipher.modes.cfb), n("AES-OFB", i.cipher.modes.ofb), n("AES-CTR", i.cipher.modes.ctr), n("AES-GCM", i.cipher.modes.gcm);
        var a, s, o, c, f, d = !1, u = 4;

        function l() {
            d = !0, o = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
            for (var e = new Array(256), t = 0; t < 128; ++t) e[t] = t << 1, e[t + 128] = t + 128 << 1 ^ 283;
            a = new Array(256), s = new Array(256), c = new Array(4), f = new Array(4);
            for (t = 0; t < 4; ++t) c[t] = new Array(256), f[t] = new Array(256);
            var r, i, n, u, l, h, p, g = 0, y = 0;
            for (t = 0; t < 256; ++t) {
                u = (u = y ^ y << 1 ^ y << 2 ^ y << 3 ^ y << 4) >> 8 ^ 255 & u ^ 99, a[g] = u, s[u] = g, h = (l = e[u]) << 24 ^ u << 16 ^ u << 8 ^ u ^ l, p = ((r = e[g]) ^ (i = e[r]) ^ (n = e[i])) << 24 ^ (g ^ n) << 16 ^ (g ^ i ^ n) << 8 ^ g ^ r ^ n;
                for (var m = 0; m < 4; ++m) c[m][g] = h, f[m][u] = p, h = h << 24 | h >>> 8, p = p << 24 | p >>> 8;
                0 === g ? g = y = 1 : (g = r ^ e[e[e[r ^ n]]], y ^= e[e[y]])
            }
        }

        function h(e, t) {
            for (var r, i = e.slice(0), n = 1, s = i.length, c = u * (s + 6 + 1), d = s; d < c; ++d) r = i[d - 1], d % s == 0 ? (r = a[r >>> 16 & 255] << 24 ^ a[r >>> 8 & 255] << 16 ^ a[255 & r] << 8 ^ a[r >>> 24] ^ o[n] << 24, n++) : s > 6 && d % s == 4 && (r = a[r >>> 24] << 24 ^ a[r >>> 16 & 255] << 16 ^ a[r >>> 8 & 255] << 8 ^ a[255 & r]), i[d] = i[d - s] ^ r;
            if (t) {
                for (var l, h = f[0], p = f[1], g = f[2], y = f[3], m = i.slice(0), v = (d = 0, (c = i.length) - u); d < c; d += u, v -= u) if (0 === d || d === c - u) m[d] = i[v], m[d + 1] = i[v + 3], m[d + 2] = i[v + 2], m[d + 3] = i[v + 1]; else for (var b = 0; b < u; ++b) l = i[v + b], m[d + (3 & -b)] = h[a[l >>> 24]] ^ p[a[l >>> 16 & 255]] ^ g[a[l >>> 8 & 255]] ^ y[a[255 & l]];
                i = m
            }
            return i
        }

        function p(e, t, r, i) {
            var n, o, d, u, l, h, p, g, y, m, v, b, w = e.length / 4 - 1;
            i ? (n = f[0], o = f[1], d = f[2], u = f[3], l = s) : (n = c[0], o = c[1], d = c[2], u = c[3], l = a), h = t[0] ^ e[0], p = t[i ? 3 : 1] ^ e[1], g = t[2] ^ e[2], y = t[i ? 1 : 3] ^ e[3];
            for (var E = 3, C = 1; C < w; ++C) m = n[h >>> 24] ^ o[p >>> 16 & 255] ^ d[g >>> 8 & 255] ^ u[255 & y] ^ e[++E], v = n[p >>> 24] ^ o[g >>> 16 & 255] ^ d[y >>> 8 & 255] ^ u[255 & h] ^ e[++E], b = n[g >>> 24] ^ o[y >>> 16 & 255] ^ d[h >>> 8 & 255] ^ u[255 & p] ^ e[++E], y = n[y >>> 24] ^ o[h >>> 16 & 255] ^ d[p >>> 8 & 255] ^ u[255 & g] ^ e[++E], h = m, p = v, g = b;
            r[0] = l[h >>> 24] << 24 ^ l[p >>> 16 & 255] << 16 ^ l[g >>> 8 & 255] << 8 ^ l[255 & y] ^ e[++E], r[i ? 3 : 1] = l[p >>> 24] << 24 ^ l[g >>> 16 & 255] << 16 ^ l[y >>> 8 & 255] << 8 ^ l[255 & h] ^ e[++E], r[2] = l[g >>> 24] << 24 ^ l[y >>> 16 & 255] << 16 ^ l[h >>> 8 & 255] << 8 ^ l[255 & p] ^ e[++E], r[i ? 1 : 3] = l[y >>> 24] << 24 ^ l[h >>> 16 & 255] << 16 ^ l[p >>> 8 & 255] << 8 ^ l[255 & g] ^ e[++E]
        }

        function g(e) {
            var t, r = "AES-" + ((e = e || {}).mode || "CBC").toUpperCase(),
                n = (t = e.decrypt ? i.cipher.createDecipher(r, e.key) : i.cipher.createCipher(r, e.key)).start;
            return t.start = function (e, r) {
                var a = null;
                r instanceof i.util.ByteBuffer && (a = r, r = {}), (r = r || {}).output = a, r.iv = e, n.call(t, r)
            }, t
        }
    }, 26164: (e, t, r) => {
        var i = r(3832);
        r(8925), r(84311);
        var n = e.exports = i.tls;

        function a(e, t, r) {
            var a = t.entity === i.tls.ConnectionEnd.client;
            e.read.cipherState = {
                init: !1,
                cipher: i.cipher.createDecipher("AES-CBC", a ? r.keys.server_write_key : r.keys.client_write_key),
                iv: a ? r.keys.server_write_IV : r.keys.client_write_IV
            }, e.write.cipherState = {
                init: !1,
                cipher: i.cipher.createCipher("AES-CBC", a ? r.keys.client_write_key : r.keys.server_write_key),
                iv: a ? r.keys.client_write_IV : r.keys.server_write_IV
            }, e.read.cipherFunction = f, e.write.cipherFunction = s, e.read.macLength = e.write.macLength = r.mac_length, e.read.macFunction = e.write.macFunction = n.hmac_sha1
        }

        function s(e, t) {
            var r, a = !1, s = t.macFunction(t.macKey, t.sequenceNumber, e);
            e.fragment.putBytes(s), t.updateSequenceNumber(), r = e.version.minor === n.Versions.TLS_1_0.minor ? t.cipherState.init ? null : t.cipherState.iv : i.random.getBytesSync(16), t.cipherState.init = !0;
            var c = t.cipherState.cipher;
            return c.start({iv: r}), e.version.minor >= n.Versions.TLS_1_1.minor && c.output.putBytes(r), c.update(e.fragment), c.finish(o) && (e.fragment = c.output, e.length = e.fragment.length(), a = !0), a
        }

        function o(e, t, r) {
            if (!r) {
                var i = e - t.length() % e;
                t.fillWithByte(i - 1, i)
            }
            return !0
        }

        function c(e, t, r) {
            var i = !0;
            if (r) {
                for (var n = t.length(), a = t.last(), s = n - 1 - a; s < n - 1; ++s) i = i && t.at(s) == a;
                i && t.truncate(a + 1)
            }
            return i
        }

        function f(e, t) {
            var r, a = !1;
            r = e.version.minor === n.Versions.TLS_1_0.minor ? t.cipherState.init ? null : t.cipherState.iv : e.fragment.getBytes(16), t.cipherState.init = !0;
            var s = t.cipherState.cipher;
            s.start({iv: r}), s.update(e.fragment), a = s.finish(c);
            var o = t.macLength, f = i.random.getBytesSync(o), d = s.output.length();
            d >= o ? (e.fragment = s.output.getBytes(d - o), f = s.output.getBytes(o)) : e.fragment = s.output.getBytes(), e.fragment = i.util.createBuffer(e.fragment), e.length = e.fragment.length();
            var u = t.macFunction(t.macKey, t.sequenceNumber, e);
            return t.updateSequenceNumber(), a = function (e, t, r) {
                var n = i.hmac.create();
                return n.start("SHA1", e), n.update(t), t = n.digest().getBytes(), n.start(null, null), n.update(r), r = n.digest().getBytes(), t === r
            }(t.macKey, f, u) && a, a
        }

        n.CipherSuites.TLS_RSA_WITH_AES_128_CBC_SHA = {
            id: [0, 47],
            name: "TLS_RSA_WITH_AES_128_CBC_SHA",
            initSecurityParameters: function (e) {
                e.bulk_cipher_algorithm = n.BulkCipherAlgorithm.aes, e.cipher_type = n.CipherType.block, e.enc_key_length = 16, e.block_length = 16, e.fixed_iv_length = 16, e.record_iv_length = 16, e.mac_algorithm = n.MACAlgorithm.hmac_sha1, e.mac_length = 20, e.mac_key_length = 20
            },
            initConnectionState: a
        }, n.CipherSuites.TLS_RSA_WITH_AES_256_CBC_SHA = {
            id: [0, 53],
            name: "TLS_RSA_WITH_AES_256_CBC_SHA",
            initSecurityParameters: function (e) {
                e.bulk_cipher_algorithm = n.BulkCipherAlgorithm.aes, e.cipher_type = n.CipherType.block, e.enc_key_length = 32, e.block_length = 16, e.fixed_iv_length = 16, e.record_iv_length = 16, e.mac_algorithm = n.MACAlgorithm.hmac_sha1, e.mac_length = 20, e.mac_key_length = 20
            },
            initConnectionState: a
        }
    }, 59205: (e, t, r) => {
        var i = r(3832);
        r(3068);
        var n = i.asn1;
        t.privateKeyValidator = {
            name: "PrivateKeyInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PrivateKeyInfo.version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyVersion"
            }, {
                name: "PrivateKeyInfo.privateKeyAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "privateKeyOid"
                }]
            }, {
                name: "PrivateKeyInfo",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OCTETSTRING,
                constructed: !1,
                capture: "privateKey"
            }]
        }, t.publicKeyValidator = {
            name: "SubjectPublicKeyInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "subjectPublicKeyInfo",
            value: [{
                name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "publicKeyOid"
                }]
            }, {
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.BITSTRING,
                constructed: !1,
                composed: !0,
                captureBitStringValue: "ed25519PublicKey"
            }]
        }
    }, 3068: (e, t, r) => {
        var i = r(3832);
        r(97116), r(66270);
        var n = e.exports = i.asn1 = i.asn1 || {};

        function a(e, t, r) {
            if (r > t) {
                var i = new Error("Too few bytes to parse DER.");
                throw i.available = e.length(), i.remaining = t, i.requested = r, i
            }
        }

        n.Class = {UNIVERSAL: 0, APPLICATION: 64, CONTEXT_SPECIFIC: 128, PRIVATE: 192}, n.Type = {
            NONE: 0,
            BOOLEAN: 1,
            INTEGER: 2,
            BITSTRING: 3,
            OCTETSTRING: 4,
            NULL: 5,
            OID: 6,
            ODESC: 7,
            EXTERNAL: 8,
            REAL: 9,
            ENUMERATED: 10,
            EMBEDDED: 11,
            UTF8: 12,
            ROID: 13,
            SEQUENCE: 16,
            SET: 17,
            PRINTABLESTRING: 19,
            IA5STRING: 22,
            UTCTIME: 23,
            GENERALIZEDTIME: 24,
            BMPSTRING: 30
        }, n.create = function (e, t, r, a, s) {
            if (i.util.isArray(a)) {
                for (var o = [], c = 0; c < a.length; ++c) void 0 !== a[c] && o.push(a[c]);
                a = o
            }
            var f = {tagClass: e, type: t, constructed: r, composed: r || i.util.isArray(a), value: a};
            return s && "bitStringContents" in s && (f.bitStringContents = s.bitStringContents, f.original = n.copy(f)), f
        }, n.copy = function (e, t) {
            var r;
            if (i.util.isArray(e)) {
                r = [];
                for (var a = 0; a < e.length; ++a) r.push(n.copy(e[a], t));
                return r
            }
            return "string" == typeof e ? e : (r = {
                tagClass: e.tagClass,
                type: e.type,
                constructed: e.constructed,
                composed: e.composed,
                value: n.copy(e.value, t)
            }, t && !t.excludeBitStringContents && (r.bitStringContents = e.bitStringContents), r)
        }, n.equals = function (e, t, r) {
            if (i.util.isArray(e)) {
                if (!i.util.isArray(t)) return !1;
                if (e.length !== t.length) return !1;
                for (var a = 0; a < e.length; ++a) if (!n.equals(e[a], t[a])) return !1;
                return !0
            }
            if (typeof e != typeof t) return !1;
            if ("string" == typeof e) return e === t;
            var s = e.tagClass === t.tagClass && e.type === t.type && e.constructed === t.constructed && e.composed === t.composed && n.equals(e.value, t.value);
            return r && r.includeBitStringContents && (s = s && e.bitStringContents === t.bitStringContents), s
        }, n.getBerValueLength = function (e) {
            var t = e.getByte();
            if (128 !== t) return 128 & t ? e.getInt((127 & t) << 3) : t
        };

        function s(e, t, r, i) {
            var o;
            a(e, t, 2);
            var c = e.getByte();
            t--;
            var f = 192 & c, d = 31 & c;
            o = e.length();
            var u, l, h = function (e, t) {
                var r = e.getByte();
                if (t--, 128 !== r) {
                    var i;
                    if (128 & r) {
                        var n = 127 & r;
                        a(e, t, n), i = e.getInt(n << 3)
                    } else i = r;
                    if (i < 0) throw new Error("Negative length: " + i);
                    return i
                }
            }(e, t);
            if (t -= o - e.length(), void 0 !== h && h > t) {
                if (i.strict) {
                    var p = new Error("Too few bytes to read ASN.1 value.");
                    throw p.available = e.length(), p.remaining = t, p.requested = h, p
                }
                h = t
            }
            var g = 32 == (32 & c);
            if (g) if (u = [], void 0 === h) for (; ;) {
                if (a(e, t, 2), e.bytes(2) === String.fromCharCode(0, 0)) {
                    e.getBytes(2), t -= 2;
                    break
                }
                o = e.length(), u.push(s(e, t, r + 1, i)), t -= o - e.length()
            } else for (; h > 0;) o = e.length(), u.push(s(e, h, r + 1, i)), t -= o - e.length(), h -= o - e.length();
            if (void 0 === u && f === n.Class.UNIVERSAL && d === n.Type.BITSTRING && (l = e.bytes(h)), void 0 === u && i.decodeBitStrings && f === n.Class.UNIVERSAL && d === n.Type.BITSTRING && h > 1) {
                var y = e.read, m = t, v = 0;
                if (d === n.Type.BITSTRING && (a(e, t, 1), v = e.getByte(), t--), 0 === v) try {
                    o = e.length();
                    var b = s(e, t, r + 1, {strict: !0, decodeBitStrings: !0}), w = o - e.length();
                    t -= w, d == n.Type.BITSTRING && w++;
                    var E = b.tagClass;
                    w !== h || E !== n.Class.UNIVERSAL && E !== n.Class.CONTEXT_SPECIFIC || (u = [b])
                } catch (S) {
                }
                void 0 === u && (e.read = y, t = m)
            }
            if (void 0 === u) {
                if (void 0 === h) {
                    if (i.strict) throw new Error("Non-constructed ASN.1 object of indefinite length.");
                    h = t
                }
                if (d === n.Type.BMPSTRING) for (u = ""; h > 0; h -= 2) a(e, t, 2), u += String.fromCharCode(e.getInt16()), t -= 2; else u = e.getBytes(h), t -= h
            }
            var C = void 0 === l ? null : {bitStringContents: l};
            return n.create(f, d, g, u, C)
        }

        n.fromDer = function (e, t) {
            void 0 === t && (t = {
                strict: !0,
                parseAllBytes: !0,
                decodeBitStrings: !0
            }), "boolean" == typeof t && (t = {
                strict: t,
                parseAllBytes: !0,
                decodeBitStrings: !0
            }), "strict" in t || (t.strict = !0), "parseAllBytes" in t || (t.parseAllBytes = !0), "decodeBitStrings" in t || (t.decodeBitStrings = !0), "string" == typeof e && (e = i.util.createBuffer(e));
            var r = e.length(), n = s(e, e.length(), 0, t);
            if (t.parseAllBytes && 0 !== e.length()) {
                var a = new Error("Unparsed DER bytes remain after ASN.1 parsing.");
                throw a.byteCount = r, a.remaining = e.length(), a
            }
            return n
        }, n.toDer = function (e) {
            var t = i.util.createBuffer(), r = e.tagClass | e.type, a = i.util.createBuffer(), s = !1;
            if ("bitStringContents" in e && (s = !0, e.original && (s = n.equals(e, e.original))), s) a.putBytes(e.bitStringContents); else if (e.composed) {
                e.constructed ? r |= 32 : a.putByte(0);
                for (var o = 0; o < e.value.length; ++o) void 0 !== e.value[o] && a.putBuffer(n.toDer(e.value[o]))
            } else if (e.type === n.Type.BMPSTRING) for (o = 0; o < e.value.length; ++o) a.putInt16(e.value.charCodeAt(o)); else e.type === n.Type.INTEGER && e.value.length > 1 && (0 === e.value.charCodeAt(0) && 0 == (128 & e.value.charCodeAt(1)) || 255 === e.value.charCodeAt(0) && 128 == (128 & e.value.charCodeAt(1))) ? a.putBytes(e.value.substr(1)) : a.putBytes(e.value);
            if (t.putByte(r), a.length() <= 127) t.putByte(127 & a.length()); else {
                var c = a.length(), f = "";
                do {
                    f += String.fromCharCode(255 & c), c >>>= 8
                } while (c > 0);
                t.putByte(128 | f.length);
                for (o = f.length - 1; o >= 0; --o) t.putByte(f.charCodeAt(o))
            }
            return t.putBuffer(a), t
        }, n.oidToDer = function (e) {
            var t, r, n, a, s = e.split("."), o = i.util.createBuffer();
            o.putByte(40 * parseInt(s[0], 10) + parseInt(s[1], 10));
            for (var c = 2; c < s.length; ++c) {
                t = !0, r = [], n = parseInt(s[c], 10);
                do {
                    a = 127 & n, n >>>= 7, t || (a |= 128), r.push(a), t = !1
                } while (n > 0);
                for (var f = r.length - 1; f >= 0; --f) o.putByte(r[f])
            }
            return o
        }, n.derToOid = function (e) {
            var t;
            "string" == typeof e && (e = i.util.createBuffer(e));
            var r = e.getByte();
            t = Math.floor(r / 40) + "." + r % 40;
            for (var n = 0; e.length() > 0;) n <<= 7, 128 & (r = e.getByte()) ? n += 127 & r : (t += "." + (n + r), n = 0);
            return t
        }, n.utcTimeToDate = function (e) {
            var t = new Date, r = parseInt(e.substr(0, 2), 10);
            r = r >= 50 ? 1900 + r : 2e3 + r;
            var i = parseInt(e.substr(2, 2), 10) - 1, n = parseInt(e.substr(4, 2), 10),
                a = parseInt(e.substr(6, 2), 10), s = parseInt(e.substr(8, 2), 10), o = 0;
            if (e.length > 11) {
                var c = e.charAt(10), f = 10;
                "+" !== c && "-" !== c && (o = parseInt(e.substr(10, 2), 10), f += 2)
            }
            if (t.setUTCFullYear(r, i, n), t.setUTCHours(a, s, o, 0), f && ("+" === (c = e.charAt(f)) || "-" === c)) {
                var d = 60 * parseInt(e.substr(f + 1, 2), 10) + parseInt(e.substr(f + 4, 2), 10);
                d *= 6e4, "+" === c ? t.setTime(+t - d) : t.setTime(+t + d)
            }
            return t
        }, n.generalizedTimeToDate = function (e) {
            var t = new Date, r = parseInt(e.substr(0, 4), 10), i = parseInt(e.substr(4, 2), 10) - 1,
                n = parseInt(e.substr(6, 2), 10), a = parseInt(e.substr(8, 2), 10), s = parseInt(e.substr(10, 2), 10),
                o = parseInt(e.substr(12, 2), 10), c = 0, f = 0, d = !1;
            "Z" === e.charAt(e.length - 1) && (d = !0);
            var u = e.length - 5, l = e.charAt(u);
            "+" !== l && "-" !== l || (f = 60 * parseInt(e.substr(u + 1, 2), 10) + parseInt(e.substr(u + 4, 2), 10), f *= 6e4, "+" === l && (f *= -1), d = !0);
            return "." === e.charAt(14) && (c = 1e3 * parseFloat(e.substr(14), 10)), d ? (t.setUTCFullYear(r, i, n), t.setUTCHours(a, s, o, c), t.setTime(+t + f)) : (t.setFullYear(r, i, n), t.setHours(a, s, o, c)), t
        }, n.dateToUtcTime = function (e) {
            if ("string" == typeof e) return e;
            var t = "", r = [];
            r.push(("" + e.getUTCFullYear()).substr(2)), r.push("" + (e.getUTCMonth() + 1)), r.push("" + e.getUTCDate()), r.push("" + e.getUTCHours()), r.push("" + e.getUTCMinutes()), r.push("" + e.getUTCSeconds());
            for (var i = 0; i < r.length; ++i) r[i].length < 2 && (t += "0"), t += r[i];
            return t += "Z"
        }, n.dateToGeneralizedTime = function (e) {
            if ("string" == typeof e) return e;
            var t = "", r = [];
            r.push("" + e.getUTCFullYear()), r.push("" + (e.getUTCMonth() + 1)), r.push("" + e.getUTCDate()), r.push("" + e.getUTCHours()), r.push("" + e.getUTCMinutes()), r.push("" + e.getUTCSeconds());
            for (var i = 0; i < r.length; ++i) r[i].length < 2 && (t += "0"), t += r[i];
            return t += "Z"
        }, n.integerToDer = function (e) {
            var t = i.util.createBuffer();
            if (e >= -128 && e < 128) return t.putSignedInt(e, 8);
            if (e >= -32768 && e < 32768) return t.putSignedInt(e, 16);
            if (e >= -8388608 && e < 8388608) return t.putSignedInt(e, 24);
            if (e >= -2147483648 && e < 2147483648) return t.putSignedInt(e, 32);
            var r = new Error("Integer too large; max is 32-bits.");
            throw r.integer = e, r
        }, n.derToInteger = function (e) {
            "string" == typeof e && (e = i.util.createBuffer(e));
            var t = 8 * e.length();
            if (t > 32) throw new Error("Integer too large; max is 32-bits.");
            return e.getSignedInt(t)
        }, n.validate = function (e, t, r, a) {
            var s = !1;
            if (e.tagClass !== t.tagClass && void 0 !== t.tagClass || e.type !== t.type && void 0 !== t.type) a && (e.tagClass !== t.tagClass && a.push("[" + t.name + '] Expected tag class "' + t.tagClass + '", got "' + e.tagClass + '"'), e.type !== t.type && a.push("[" + t.name + '] Expected type "' + t.type + '", got "' + e.type + '"')); else if (e.constructed === t.constructed || void 0 === t.constructed) {
                if (s = !0, t.value && i.util.isArray(t.value)) for (var o = 0, c = 0; s && c < t.value.length; ++c) s = t.value[c].optional || !1, e.value[o] && ((s = n.validate(e.value[o], t.value[c], r, a)) ? ++o : t.value[c].optional && (s = !0)), !s && a && a.push("[" + t.name + '] Tag class "' + t.tagClass + '", type "' + t.type + '" expected value length "' + t.value.length + '", got "' + e.value.length + '"');
                if (s && r) if (t.capture && (r[t.capture] = e.value), t.captureAsn1 && (r[t.captureAsn1] = e), t.captureBitStringContents && "bitStringContents" in e && (r[t.captureBitStringContents] = e.bitStringContents), t.captureBitStringValue && "bitStringContents" in e) if (e.bitStringContents.length < 2) r[t.captureBitStringValue] = ""; else {
                    if (0 !== e.bitStringContents.charCodeAt(0)) throw new Error("captureBitStringValue only supported for zero unused bits");
                    r[t.captureBitStringValue] = e.bitStringContents.slice(1)
                }
            } else a && a.push("[" + t.name + '] Expected constructed "' + t.constructed + '", got "' + e.constructed + '"');
            return s
        };
        var o = /[^\\u0000-\\u00ff]/;
        n.prettyPrint = function (e, t, r) {
            var a = "";
            r = r || 2, (t = t || 0) > 0 && (a += "\n");
            for (var s = "", c = 0; c < t * r; ++c) s += " ";
            switch (a += s + "Tag: ", e.tagClass) {
                case n.Class.UNIVERSAL:
                    a += "Universal:";
                    break;
                case n.Class.APPLICATION:
                    a += "Application:";
                    break;
                case n.Class.CONTEXT_SPECIFIC:
                    a += "Context-Specific:";
                    break;
                case n.Class.PRIVATE:
                    a += "Private:"
            }
            if (e.tagClass === n.Class.UNIVERSAL) switch (a += e.type, e.type) {
                case n.Type.NONE:
                    a += " (None)";
                    break;
                case n.Type.BOOLEAN:
                    a += " (Boolean)";
                    break;
                case n.Type.INTEGER:
                    a += " (Integer)";
                    break;
                case n.Type.BITSTRING:
                    a += " (Bit string)";
                    break;
                case n.Type.OCTETSTRING:
                    a += " (Octet string)";
                    break;
                case n.Type.NULL:
                    a += " (Null)";
                    break;
                case n.Type.OID:
                    a += " (Object Identifier)";
                    break;
                case n.Type.ODESC:
                    a += " (Object Descriptor)";
                    break;
                case n.Type.EXTERNAL:
                    a += " (External or Instance of)";
                    break;
                case n.Type.REAL:
                    a += " (Real)";
                    break;
                case n.Type.ENUMERATED:
                    a += " (Enumerated)";
                    break;
                case n.Type.EMBEDDED:
                    a += " (Embedded PDV)";
                    break;
                case n.Type.UTF8:
                    a += " (UTF8)";
                    break;
                case n.Type.ROID:
                    a += " (Relative Object Identifier)";
                    break;
                case n.Type.SEQUENCE:
                    a += " (Sequence)";
                    break;
                case n.Type.SET:
                    a += " (Set)";
                    break;
                case n.Type.PRINTABLESTRING:
                    a += " (Printable String)";
                    break;
                case n.Type.IA5String:
                    a += " (IA5String (ASCII))";
                    break;
                case n.Type.UTCTIME:
                    a += " (UTC time)";
                    break;
                case n.Type.GENERALIZEDTIME:
                    a += " (Generalized time)";
                    break;
                case n.Type.BMPSTRING:
                    a += " (BMP String)"
            } else a += e.type;
            if (a += "\n", a += s + "Constructed: " + e.constructed + "\n", e.composed) {
                var f = 0, d = "";
                for (c = 0; c < e.value.length; ++c) void 0 !== e.value[c] && (f += 1, d += n.prettyPrint(e.value[c], t + 1, r), c + 1 < e.value.length && (d += ","));
                a += s + "Sub values: " + f + d
            } else {
                if (a += s + "Value: ", e.type === n.Type.OID) {
                    var u = n.derToOid(e.value);
                    a += u, i.pki && i.pki.oids && u in i.pki.oids && (a += " (" + i.pki.oids[u] + ") ")
                }
                if (e.type === n.Type.INTEGER) try {
                    a += n.derToInteger(e.value)
                } catch (h) {
                    a += "0x" + i.util.bytesToHex(e.value)
                } else if (e.type === n.Type.BITSTRING) {
                    if (e.value.length > 1 ? a += "0x" + i.util.bytesToHex(e.value.slice(1)) : a += "(none)", e.value.length > 0) {
                        var l = e.value.charCodeAt(0);
                        1 == l ? a += " (1 unused bit shown)" : l > 1 && (a += " (" + l + " unused bits shown)")
                    }
                } else if (e.type === n.Type.OCTETSTRING) o.test(e.value) || (a += "(" + e.value + ") "), a += "0x" + i.util.bytesToHex(e.value); else if (e.type === n.Type.UTF8) try {
                    a += i.util.decodeUtf8(e.value)
                } catch (p) {
                    if ("URI malformed" !== p.message) throw p;
                    a += "0x" + i.util.bytesToHex(e.value) + " (malformed UTF8)"
                } else e.type === n.Type.PRINTABLESTRING || e.type === n.Type.IA5String ? a += e.value : o.test(e.value) ? a += "0x" + i.util.bytesToHex(e.value) : 0 === e.value.length ? a += "[null]" : a += e.value
            }
            return a
        }
    }, 78807: e => {
        var t = {};
        e.exports = t;
        var r = {};
        t.encode = function (e, t, r) {
            if ("string" != typeof t) throw new TypeError('"alphabet" must be a string.');
            if (void 0 !== r && "number" != typeof r) throw new TypeError('"maxline" must be a number.');
            var i = "";
            if (e instanceof Uint8Array) {
                var n = 0, a = t.length, s = t.charAt(0), o = [0];
                for (n = 0; n < e.length; ++n) {
                    for (var c = 0, f = e[n]; c < o.length; ++c) f += o[c] << 8, o[c] = f % a, f = f / a | 0;
                    for (; f > 0;) o.push(f % a), f = f / a | 0
                }
                for (n = 0; 0 === e[n] && n < e.length - 1; ++n) i += s;
                for (n = o.length - 1; n >= 0; --n) i += t[o[n]]
            } else i = function (e, t) {
                var r = 0, i = t.length, n = t.charAt(0), a = [0];
                for (r = 0; r < e.length(); ++r) {
                    for (var s = 0, o = e.at(r); s < a.length; ++s) o += a[s] << 8, a[s] = o % i, o = o / i | 0;
                    for (; o > 0;) a.push(o % i), o = o / i | 0
                }
                var c = "";
                for (r = 0; 0 === e.at(r) && r < e.length() - 1; ++r) c += n;
                for (r = a.length - 1; r >= 0; --r) c += t[a[r]];
                return c
            }(e, t);
            if (r) {
                var d = new RegExp(".{1," + r + "}", "g");
                i = i.match(d).join("\r\n")
            }
            return i
        }, t.decode = function (e, t) {
            if ("string" != typeof e) throw new TypeError('"input" must be a string.');
            if ("string" != typeof t) throw new TypeError('"alphabet" must be a string.');
            var i = r[t];
            if (!i) {
                i = r[t] = [];
                for (var n = 0; n < t.length; ++n) i[t.charCodeAt(n)] = n
            }
            e = e.replace(/\s/g, "");
            var a = t.length, s = t.charAt(0), o = [0];
            for (n = 0; n < e.length; n++) {
                var c = i[e.charCodeAt(n)];
                if (void 0 === c) return;
                for (var f = 0, d = c; f < o.length; ++f) d += o[f] * a, o[f] = 255 & d, d >>= 8;
                for (; d > 0;) o.push(255 & d), d >>= 8
            }
            for (var u = 0; e[u] === s && u < e.length - 1; ++u) o.push(0);
            return "undefined" != typeof Buffer ? Buffer.from(o.reverse()) : new Uint8Array(o.reverse())
        }
    }, 85649: (e, t, r) => {
        var i = r(3832);
        r(97116), e.exports = i.cipher = i.cipher || {}, i.cipher.algorithms = i.cipher.algorithms || {}, i.cipher.createCipher = function (e, t) {
            var r = e;
            if ("string" == typeof r && (r = i.cipher.getAlgorithm(r)) && (r = r()), !r) throw new Error("Unsupported algorithm: " + e);
            return new i.cipher.BlockCipher({algorithm: r, key: t, decrypt: !1})
        }, i.cipher.createDecipher = function (e, t) {
            var r = e;
            if ("string" == typeof r && (r = i.cipher.getAlgorithm(r)) && (r = r()), !r) throw new Error("Unsupported algorithm: " + e);
            return new i.cipher.BlockCipher({algorithm: r, key: t, decrypt: !0})
        }, i.cipher.registerAlgorithm = function (e, t) {
            e = e.toUpperCase(), i.cipher.algorithms[e] = t
        }, i.cipher.getAlgorithm = function (e) {
            return (e = e.toUpperCase()) in i.cipher.algorithms ? i.cipher.algorithms[e] : null
        };
        var n = i.cipher.BlockCipher = function (e) {
            this.algorithm = e.algorithm, this.mode = this.algorithm.mode, this.blockSize = this.mode.blockSize, this._finish = !1, this._input = null, this.output = null, this._op = e.decrypt ? this.mode.decrypt : this.mode.encrypt, this._decrypt = e.decrypt, this.algorithm.initialize(e)
        };
        n.prototype.start = function (e) {
            e = e || {};
            var t = {};
            for (var r in e) t[r] = e[r];
            t.decrypt = this._decrypt, this._finish = !1, this._input = i.util.createBuffer(), this.output = e.output || i.util.createBuffer(), this.mode.start(t)
        }, n.prototype.update = function (e) {
            for (e && this._input.putBuffer(e); !this._op.call(this.mode, this._input, this.output, this._finish) && !this._finish;) ;
            this._input.compact()
        }, n.prototype.finish = function (e) {
            !e || "ECB" !== this.mode.name && "CBC" !== this.mode.name || (this.mode.pad = function (t) {
                return e(this.blockSize, t, !1)
            }, this.mode.unpad = function (t) {
                return e(this.blockSize, t, !0)
            });
            var t = {};
            return t.decrypt = this._decrypt, t.overflow = this._input.length() % this.blockSize, !(!this._decrypt && this.mode.pad && !this.mode.pad(this._input, t)) && (this._finish = !0, this.update(), !(this._decrypt && this.mode.unpad && !this.mode.unpad(this.output, t)) && !(this.mode.afterFinish && !this.mode.afterFinish(this.output, t)))
        }
    }, 61967: (e, t, r) => {
        var i = r(3832);
        r(97116), i.cipher = i.cipher || {};
        var n = e.exports = i.cipher.modes = i.cipher.modes || {};

        function a(e, t) {
            if ("string" == typeof e && (e = i.util.createBuffer(e)), i.util.isArray(e) && e.length > 4) {
                var r = e;
                e = i.util.createBuffer();
                for (var n = 0; n < r.length; ++n) e.putByte(r[n])
            }
            if (e.length() < t) throw new Error("Invalid IV length; got " + e.length() + " bytes and expected " + t + " bytes.");
            if (!i.util.isArray(e)) {
                var a = [], s = t / 4;
                for (n = 0; n < s; ++n) a.push(e.getInt32());
                e = a
            }
            return e
        }

        function s(e) {
            e[e.length - 1] = e[e.length - 1] + 1 & 4294967295
        }

        function o(e) {
            return [e / 4294967296 | 0, 4294967295 & e]
        }

        n.ecb = function (e) {
            e = e || {}, this.name = "ECB", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints)
        }, n.ecb.prototype.start = function (e) {
        }, n.ecb.prototype.encrypt = function (e, t, r) {
            if (e.length() < this.blockSize && !(r && e.length() > 0)) return !0;
            for (var i = 0; i < this._ints; ++i) this._inBlock[i] = e.getInt32();
            this.cipher.encrypt(this._inBlock, this._outBlock);
            for (i = 0; i < this._ints; ++i) t.putInt32(this._outBlock[i])
        }, n.ecb.prototype.decrypt = function (e, t, r) {
            if (e.length() < this.blockSize && !(r && e.length() > 0)) return !0;
            for (var i = 0; i < this._ints; ++i) this._inBlock[i] = e.getInt32();
            this.cipher.decrypt(this._inBlock, this._outBlock);
            for (i = 0; i < this._ints; ++i) t.putInt32(this._outBlock[i])
        }, n.ecb.prototype.pad = function (e, t) {
            var r = e.length() === this.blockSize ? this.blockSize : this.blockSize - e.length();
            return e.fillWithByte(r, r), !0
        }, n.ecb.prototype.unpad = function (e, t) {
            if (t.overflow > 0) return !1;
            var r = e.length(), i = e.at(r - 1);
            return !(i > this.blockSize << 2) && (e.truncate(i), !0)
        }, n.cbc = function (e) {
            e = e || {}, this.name = "CBC", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints)
        }, n.cbc.prototype.start = function (e) {
            if (null === e.iv) {
                if (!this._prev) throw new Error("Invalid IV parameter.");
                this._iv = this._prev.slice(0)
            } else {
                if (!("iv" in e)) throw new Error("Invalid IV parameter.");
                this._iv = a(e.iv, this.blockSize), this._prev = this._iv.slice(0)
            }
        }, n.cbc.prototype.encrypt = function (e, t, r) {
            if (e.length() < this.blockSize && !(r && e.length() > 0)) return !0;
            for (var i = 0; i < this._ints; ++i) this._inBlock[i] = this._prev[i] ^ e.getInt32();
            this.cipher.encrypt(this._inBlock, this._outBlock);
            for (i = 0; i < this._ints; ++i) t.putInt32(this._outBlock[i]);
            this._prev = this._outBlock
        }, n.cbc.prototype.decrypt = function (e, t, r) {
            if (e.length() < this.blockSize && !(r && e.length() > 0)) return !0;
            for (var i = 0; i < this._ints; ++i) this._inBlock[i] = e.getInt32();
            this.cipher.decrypt(this._inBlock, this._outBlock);
            for (i = 0; i < this._ints; ++i) t.putInt32(this._prev[i] ^ this._outBlock[i]);
            this._prev = this._inBlock.slice(0)
        }, n.cbc.prototype.pad = function (e, t) {
            var r = e.length() === this.blockSize ? this.blockSize : this.blockSize - e.length();
            return e.fillWithByte(r, r), !0
        }, n.cbc.prototype.unpad = function (e, t) {
            if (t.overflow > 0) return !1;
            var r = e.length(), i = e.at(r - 1);
            return !(i > this.blockSize << 2) && (e.truncate(i), !0)
        }, n.cfb = function (e) {
            e = e || {}, this.name = "CFB", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialBlock = new Array(this._ints), this._partialOutput = i.util.createBuffer(), this._partialBytes = 0
        }, n.cfb.prototype.start = function (e) {
            if (!("iv" in e)) throw new Error("Invalid IV parameter.");
            this._iv = a(e.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0
        }, n.cfb.prototype.encrypt = function (e, t, r) {
            var i = e.length();
            if (0 === i) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && i >= this.blockSize) for (var n = 0; n < this._ints; ++n) this._inBlock[n] = e.getInt32() ^ this._outBlock[n], t.putInt32(this._inBlock[n]); else {
                var a = (this.blockSize - i) % this.blockSize;
                a > 0 && (a = this.blockSize - a), this._partialOutput.clear();
                for (n = 0; n < this._ints; ++n) this._partialBlock[n] = e.getInt32() ^ this._outBlock[n], this._partialOutput.putInt32(this._partialBlock[n]);
                if (a > 0) e.read -= this.blockSize; else for (n = 0; n < this._ints; ++n) this._inBlock[n] = this._partialBlock[n];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), a > 0 && !r) return t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = a, !0;
                t.putBytes(this._partialOutput.getBytes(i - this._partialBytes)), this._partialBytes = 0
            }
        }, n.cfb.prototype.decrypt = function (e, t, r) {
            var i = e.length();
            if (0 === i) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && i >= this.blockSize) for (var n = 0; n < this._ints; ++n) this._inBlock[n] = e.getInt32(), t.putInt32(this._inBlock[n] ^ this._outBlock[n]); else {
                var a = (this.blockSize - i) % this.blockSize;
                a > 0 && (a = this.blockSize - a), this._partialOutput.clear();
                for (n = 0; n < this._ints; ++n) this._partialBlock[n] = e.getInt32(), this._partialOutput.putInt32(this._partialBlock[n] ^ this._outBlock[n]);
                if (a > 0) e.read -= this.blockSize; else for (n = 0; n < this._ints; ++n) this._inBlock[n] = this._partialBlock[n];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), a > 0 && !r) return t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = a, !0;
                t.putBytes(this._partialOutput.getBytes(i - this._partialBytes)), this._partialBytes = 0
            }
        }, n.ofb = function (e) {
            e = e || {}, this.name = "OFB", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialOutput = i.util.createBuffer(), this._partialBytes = 0
        }, n.ofb.prototype.start = function (e) {
            if (!("iv" in e)) throw new Error("Invalid IV parameter.");
            this._iv = a(e.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0
        }, n.ofb.prototype.encrypt = function (e, t, r) {
            var i = e.length();
            if (0 === e.length()) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && i >= this.blockSize) for (var n = 0; n < this._ints; ++n) t.putInt32(e.getInt32() ^ this._outBlock[n]), this._inBlock[n] = this._outBlock[n]; else {
                var a = (this.blockSize - i) % this.blockSize;
                a > 0 && (a = this.blockSize - a), this._partialOutput.clear();
                for (n = 0; n < this._ints; ++n) this._partialOutput.putInt32(e.getInt32() ^ this._outBlock[n]);
                if (a > 0) e.read -= this.blockSize; else for (n = 0; n < this._ints; ++n) this._inBlock[n] = this._outBlock[n];
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), a > 0 && !r) return t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = a, !0;
                t.putBytes(this._partialOutput.getBytes(i - this._partialBytes)), this._partialBytes = 0
            }
        }, n.ofb.prototype.decrypt = n.ofb.prototype.encrypt, n.ctr = function (e) {
            e = e || {}, this.name = "CTR", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = null, this._outBlock = new Array(this._ints), this._partialOutput = i.util.createBuffer(), this._partialBytes = 0
        }, n.ctr.prototype.start = function (e) {
            if (!("iv" in e)) throw new Error("Invalid IV parameter.");
            this._iv = a(e.iv, this.blockSize), this._inBlock = this._iv.slice(0), this._partialBytes = 0
        }, n.ctr.prototype.encrypt = function (e, t, r) {
            var i = e.length();
            if (0 === i) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && i >= this.blockSize) for (var n = 0; n < this._ints; ++n) t.putInt32(e.getInt32() ^ this._outBlock[n]); else {
                var a = (this.blockSize - i) % this.blockSize;
                a > 0 && (a = this.blockSize - a), this._partialOutput.clear();
                for (n = 0; n < this._ints; ++n) this._partialOutput.putInt32(e.getInt32() ^ this._outBlock[n]);
                if (a > 0 && (e.read -= this.blockSize), this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), a > 0 && !r) return t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = a, !0;
                t.putBytes(this._partialOutput.getBytes(i - this._partialBytes)), this._partialBytes = 0
            }
            s(this._inBlock)
        }, n.ctr.prototype.decrypt = n.ctr.prototype.encrypt, n.gcm = function (e) {
            e = e || {}, this.name = "GCM", this.cipher = e.cipher, this.blockSize = e.blockSize || 16, this._ints = this.blockSize / 4, this._inBlock = new Array(this._ints), this._outBlock = new Array(this._ints), this._partialOutput = i.util.createBuffer(), this._partialBytes = 0, this._R = 3774873600
        }, n.gcm.prototype.start = function (e) {
            if (!("iv" in e)) throw new Error("Invalid IV parameter.");
            var t, r = i.util.createBuffer(e.iv);
            if (this._cipherLength = 0, t = "additionalData" in e ? i.util.createBuffer(e.additionalData) : i.util.createBuffer(), this._tagLength = "tagLength" in e ? e.tagLength : 128, this._tag = null, e.decrypt && (this._tag = i.util.createBuffer(e.tag).getBytes(), this._tag.length !== this._tagLength / 8)) throw new Error("Authentication tag does not match tag length.");
            this._hashBlock = new Array(this._ints), this.tag = null, this._hashSubkey = new Array(this._ints), this.cipher.encrypt([0, 0, 0, 0], this._hashSubkey), this.componentBits = 4, this._m = this.generateHashTable(this._hashSubkey, this.componentBits);
            var n = r.length();
            if (12 === n) this._j0 = [r.getInt32(), r.getInt32(), r.getInt32(), 1]; else {
                for (this._j0 = [0, 0, 0, 0]; r.length() > 0;) this._j0 = this.ghash(this._hashSubkey, this._j0, [r.getInt32(), r.getInt32(), r.getInt32(), r.getInt32()]);
                this._j0 = this.ghash(this._hashSubkey, this._j0, [0, 0].concat(o(8 * n)))
            }
            this._inBlock = this._j0.slice(0), s(this._inBlock), this._partialBytes = 0, t = i.util.createBuffer(t), this._aDataLength = o(8 * t.length());
            var a = t.length() % this.blockSize;
            for (a && t.fillWithByte(0, this.blockSize - a), this._s = [0, 0, 0, 0]; t.length() > 0;) this._s = this.ghash(this._hashSubkey, this._s, [t.getInt32(), t.getInt32(), t.getInt32(), t.getInt32()])
        }, n.gcm.prototype.encrypt = function (e, t, r) {
            var i = e.length();
            if (0 === i) return !0;
            if (this.cipher.encrypt(this._inBlock, this._outBlock), 0 === this._partialBytes && i >= this.blockSize) {
                for (var n = 0; n < this._ints; ++n) t.putInt32(this._outBlock[n] ^= e.getInt32());
                this._cipherLength += this.blockSize
            } else {
                var a = (this.blockSize - i) % this.blockSize;
                a > 0 && (a = this.blockSize - a), this._partialOutput.clear();
                for (n = 0; n < this._ints; ++n) this._partialOutput.putInt32(e.getInt32() ^ this._outBlock[n]);
                if (a <= 0 || r) {
                    if (r) {
                        var o = i % this.blockSize;
                        this._cipherLength += o, this._partialOutput.truncate(this.blockSize - o)
                    } else this._cipherLength += this.blockSize;
                    for (n = 0; n < this._ints; ++n) this._outBlock[n] = this._partialOutput.getInt32();
                    this._partialOutput.read -= this.blockSize
                }
                if (this._partialBytes > 0 && this._partialOutput.getBytes(this._partialBytes), a > 0 && !r) return e.read -= this.blockSize, t.putBytes(this._partialOutput.getBytes(a - this._partialBytes)), this._partialBytes = a, !0;
                t.putBytes(this._partialOutput.getBytes(i - this._partialBytes)), this._partialBytes = 0
            }
            this._s = this.ghash(this._hashSubkey, this._s, this._outBlock), s(this._inBlock)
        }, n.gcm.prototype.decrypt = function (e, t, r) {
            var i = e.length();
            if (i < this.blockSize && !(r && i > 0)) return !0;
            this.cipher.encrypt(this._inBlock, this._outBlock), s(this._inBlock), this._hashBlock[0] = e.getInt32(), this._hashBlock[1] = e.getInt32(), this._hashBlock[2] = e.getInt32(), this._hashBlock[3] = e.getInt32(), this._s = this.ghash(this._hashSubkey, this._s, this._hashBlock);
            for (var n = 0; n < this._ints; ++n) t.putInt32(this._outBlock[n] ^ this._hashBlock[n]);
            i < this.blockSize ? this._cipherLength += i % this.blockSize : this._cipherLength += this.blockSize
        }, n.gcm.prototype.afterFinish = function (e, t) {
            var r = !0;
            t.decrypt && t.overflow && e.truncate(this.blockSize - t.overflow), this.tag = i.util.createBuffer();
            var n = this._aDataLength.concat(o(8 * this._cipherLength));
            this._s = this.ghash(this._hashSubkey, this._s, n);
            var a = [];
            this.cipher.encrypt(this._j0, a);
            for (var s = 0; s < this._ints; ++s) this.tag.putInt32(this._s[s] ^ a[s]);
            return this.tag.truncate(this.tag.length() % (this._tagLength / 8)), t.decrypt && this.tag.bytes() !== this._tag && (r = !1), r
        }, n.gcm.prototype.multiply = function (e, t) {
            for (var r = [0, 0, 0, 0], i = t.slice(0), n = 0; n < 128; ++n) {
                e[n / 32 | 0] & 1 << 31 - n % 32 && (r[0] ^= i[0], r[1] ^= i[1], r[2] ^= i[2], r[3] ^= i[3]), this.pow(i, i)
            }
            return r
        }, n.gcm.prototype.pow = function (e, t) {
            for (var r = 1 & e[3], i = 3; i > 0; --i) t[i] = e[i] >>> 1 | (1 & e[i - 1]) << 31;
            t[0] = e[0] >>> 1, r && (t[0] ^= this._R)
        }, n.gcm.prototype.tableMultiply = function (e) {
            for (var t = [0, 0, 0, 0], r = 0; r < 32; ++r) {
                var i = e[r / 8 | 0] >>> 4 * (7 - r % 8) & 15, n = this._m[r][i];
                t[0] ^= n[0], t[1] ^= n[1], t[2] ^= n[2], t[3] ^= n[3]
            }
            return t
        }, n.gcm.prototype.ghash = function (e, t, r) {
            return t[0] ^= r[0], t[1] ^= r[1], t[2] ^= r[2], t[3] ^= r[3], this.tableMultiply(t)
        }, n.gcm.prototype.generateHashTable = function (e, t) {
            for (var r = 8 / t, i = 4 * r, n = 16 * r, a = new Array(n), s = 0; s < n; ++s) {
                var o = [0, 0, 0, 0], c = (i - 1 - s % i) * t;
                o[s / i | 0] = 1 << t - 1 << c, a[s] = this.generateSubHashTable(this.multiply(o, e), t)
            }
            return a
        }, n.gcm.prototype.generateSubHashTable = function (e, t) {
            var r = 1 << t, i = r >>> 1, n = new Array(r);
            n[i] = e.slice(0);
            for (var a = i >>> 1; a > 0;) this.pow(n[2 * a], n[a] = []), a >>= 1;
            for (a = 2; a < i;) {
                for (var s = 1; s < a; ++s) {
                    var o = n[a], c = n[s];
                    n[a + s] = [o[0] ^ c[0], o[1] ^ c[1], o[2] ^ c[2], o[3] ^ c[3]]
                }
                a *= 2
            }
            for (n[0] = [0, 0, 0, 0], a = i + 1; a < r; ++a) {
                var f = n[a ^ i];
                n[a] = [e[0] ^ f[0], e[1] ^ f[1], e[2] ^ f[2], e[3] ^ f[3]]
            }
            return n
        }
    }, 33480: (e, t, r) => {
        var i = r(3832);

        function n(e, t) {
            i.cipher.registerAlgorithm(e, (function () {
                return new i.des.Algorithm(e, t)
            }))
        }

        r(85649), r(61967), r(97116), e.exports = i.des = i.des || {}, i.des.startEncrypting = function (e, t, r, i) {
            var n = p({key: e, output: r, decrypt: !1, mode: i || (null === t ? "ECB" : "CBC")});
            return n.start(t), n
        }, i.des.createEncryptionCipher = function (e, t) {
            return p({key: e, output: null, decrypt: !1, mode: t})
        }, i.des.startDecrypting = function (e, t, r, i) {
            var n = p({key: e, output: r, decrypt: !0, mode: i || (null === t ? "ECB" : "CBC")});
            return n.start(t), n
        }, i.des.createDecryptionCipher = function (e, t) {
            return p({key: e, output: null, decrypt: !0, mode: t})
        }, i.des.Algorithm = function (e, t) {
            var r = this;
            r.name = e, r.mode = new t({
                blockSize: 8, cipher: {
                    encrypt: function (e, t) {
                        return h(r._keys, e, t, !1)
                    }, decrypt: function (e, t) {
                        return h(r._keys, e, t, !0)
                    }
                }
            }), r._init = !1
        }, i.des.Algorithm.prototype.initialize = function (e) {
            if (!this._init) {
                var t = i.util.createBuffer(e.key);
                if (0 === this.name.indexOf("3DES") && 24 !== t.length()) throw new Error("Invalid Triple-DES key size: " + 8 * t.length());
                this._keys = function (e) {
                    for (var t, r = [0, 4, 536870912, 536870916, 65536, 65540, 536936448, 536936452, 512, 516, 536871424, 536871428, 66048, 66052, 536936960, 536936964], i = [0, 1, 1048576, 1048577, 67108864, 67108865, 68157440, 68157441, 256, 257, 1048832, 1048833, 67109120, 67109121, 68157696, 68157697], n = [0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272, 0, 8, 2048, 2056, 16777216, 16777224, 16779264, 16779272], a = [0, 2097152, 134217728, 136314880, 8192, 2105344, 134225920, 136323072, 131072, 2228224, 134348800, 136445952, 139264, 2236416, 134356992, 136454144], s = [0, 262144, 16, 262160, 0, 262144, 16, 262160, 4096, 266240, 4112, 266256, 4096, 266240, 4112, 266256], o = [0, 1024, 32, 1056, 0, 1024, 32, 1056, 33554432, 33555456, 33554464, 33555488, 33554432, 33555456, 33554464, 33555488], c = [0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746, 0, 268435456, 524288, 268959744, 2, 268435458, 524290, 268959746], f = [0, 65536, 2048, 67584, 536870912, 536936448, 536872960, 536938496, 131072, 196608, 133120, 198656, 537001984, 537067520, 537004032, 537069568], d = [0, 262144, 0, 262144, 2, 262146, 2, 262146, 33554432, 33816576, 33554432, 33816576, 33554434, 33816578, 33554434, 33816578], u = [0, 268435456, 8, 268435464, 0, 268435456, 8, 268435464, 1024, 268436480, 1032, 268436488, 1024, 268436480, 1032, 268436488], l = [0, 32, 0, 32, 1048576, 1048608, 1048576, 1048608, 8192, 8224, 8192, 8224, 1056768, 1056800, 1056768, 1056800], h = [0, 16777216, 512, 16777728, 2097152, 18874368, 2097664, 18874880, 67108864, 83886080, 67109376, 83886592, 69206016, 85983232, 69206528, 85983744], p = [0, 4096, 134217728, 134221824, 524288, 528384, 134742016, 134746112, 16, 4112, 134217744, 134221840, 524304, 528400, 134742032, 134746128], g = [0, 4, 256, 260, 0, 4, 256, 260, 1, 5, 257, 261, 1, 5, 257, 261], y = e.length() > 8 ? 3 : 1, m = [], v = [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0], b = 0, w = 0; w < y; w++) {
                        var E = e.getInt32(), C = e.getInt32();
                        E ^= (t = 252645135 & (E >>> 4 ^ C)) << 4, E ^= t = 65535 & ((C ^= t) >>> -16 ^ E), E ^= (t = 858993459 & (E >>> 2 ^ (C ^= t << -16))) << 2, E ^= t = 65535 & ((C ^= t) >>> -16 ^ E), E ^= (t = 1431655765 & (E >>> 1 ^ (C ^= t << -16))) << 1, E ^= t = 16711935 & ((C ^= t) >>> 8 ^ E), t = (E ^= (t = 1431655765 & (E >>> 1 ^ (C ^= t << 8))) << 1) << 8 | (C ^= t) >>> 20 & 240, E = C << 24 | C << 8 & 16711680 | C >>> 8 & 65280 | C >>> 24 & 240, C = t;
                        for (var S = 0; S < v.length; ++S) {
                            v[S] ? (E = E << 2 | E >>> 26, C = C << 2 | C >>> 26) : (E = E << 1 | E >>> 27, C = C << 1 | C >>> 27), C &= -15;
                            var I = r[(E &= -15) >>> 28] | i[E >>> 24 & 15] | n[E >>> 20 & 15] | a[E >>> 16 & 15] | s[E >>> 12 & 15] | o[E >>> 8 & 15] | c[E >>> 4 & 15],
                                A = f[C >>> 28] | d[C >>> 24 & 15] | u[C >>> 20 & 15] | l[C >>> 16 & 15] | h[C >>> 12 & 15] | p[C >>> 8 & 15] | g[C >>> 4 & 15];
                            t = 65535 & (A >>> 16 ^ I), m[b++] = I ^ t, m[b++] = A ^ t << 16
                        }
                    }
                    return m
                }(t), this._init = !0
            }
        }, n("DES-ECB", i.cipher.modes.ecb), n("DES-CBC", i.cipher.modes.cbc), n("DES-CFB", i.cipher.modes.cfb), n("DES-OFB", i.cipher.modes.ofb), n("DES-CTR", i.cipher.modes.ctr), n("3DES-ECB", i.cipher.modes.ecb), n("3DES-CBC", i.cipher.modes.cbc), n("3DES-CFB", i.cipher.modes.cfb), n("3DES-OFB", i.cipher.modes.ofb), n("3DES-CTR", i.cipher.modes.ctr);
        var a = [16843776, 0, 65536, 16843780, 16842756, 66564, 4, 65536, 1024, 16843776, 16843780, 1024, 16778244, 16842756, 16777216, 4, 1028, 16778240, 16778240, 66560, 66560, 16842752, 16842752, 16778244, 65540, 16777220, 16777220, 65540, 0, 1028, 66564, 16777216, 65536, 16843780, 4, 16842752, 16843776, 16777216, 16777216, 1024, 16842756, 65536, 66560, 16777220, 1024, 4, 16778244, 66564, 16843780, 65540, 16842752, 16778244, 16777220, 1028, 66564, 16843776, 1028, 16778240, 16778240, 0, 65540, 66560, 0, 16842756],
            s = [-2146402272, -2147450880, 32768, 1081376, 1048576, 32, -2146435040, -2147450848, -2147483616, -2146402272, -2146402304, -2147483648, -2147450880, 1048576, 32, -2146435040, 1081344, 1048608, -2147450848, 0, -2147483648, 32768, 1081376, -2146435072, 1048608, -2147483616, 0, 1081344, 32800, -2146402304, -2146435072, 32800, 0, 1081376, -2146435040, 1048576, -2147450848, -2146435072, -2146402304, 32768, -2146435072, -2147450880, 32, -2146402272, 1081376, 32, 32768, -2147483648, 32800, -2146402304, 1048576, -2147483616, 1048608, -2147450848, -2147483616, 1048608, 1081344, 0, -2147450880, 32800, -2147483648, -2146435040, -2146402272, 1081344],
            o = [520, 134349312, 0, 134348808, 134218240, 0, 131592, 134218240, 131080, 134217736, 134217736, 131072, 134349320, 131080, 134348800, 520, 134217728, 8, 134349312, 512, 131584, 134348800, 134348808, 131592, 134218248, 131584, 131072, 134218248, 8, 134349320, 512, 134217728, 134349312, 134217728, 131080, 520, 131072, 134349312, 134218240, 0, 512, 131080, 134349320, 134218240, 134217736, 512, 0, 134348808, 134218248, 131072, 134217728, 134349320, 8, 131592, 131584, 134217736, 134348800, 134218248, 520, 134348800, 131592, 8, 134348808, 131584],
            c = [8396801, 8321, 8321, 128, 8396928, 8388737, 8388609, 8193, 0, 8396800, 8396800, 8396929, 129, 0, 8388736, 8388609, 1, 8192, 8388608, 8396801, 128, 8388608, 8193, 8320, 8388737, 1, 8320, 8388736, 8192, 8396928, 8396929, 129, 8388736, 8388609, 8396800, 8396929, 129, 0, 0, 8396800, 8320, 8388736, 8388737, 1, 8396801, 8321, 8321, 128, 8396929, 129, 1, 8192, 8388609, 8193, 8396928, 8388737, 8193, 8320, 8388608, 8396801, 128, 8388608, 8192, 8396928],
            f = [256, 34078976, 34078720, 1107296512, 524288, 256, 1073741824, 34078720, 1074266368, 524288, 33554688, 1074266368, 1107296512, 1107820544, 524544, 1073741824, 33554432, 1074266112, 1074266112, 0, 1073742080, 1107820800, 1107820800, 33554688, 1107820544, 1073742080, 0, 1107296256, 34078976, 33554432, 1107296256, 524544, 524288, 1107296512, 256, 33554432, 1073741824, 34078720, 1107296512, 1074266368, 33554688, 1073741824, 1107820544, 34078976, 1074266368, 256, 33554432, 1107820544, 1107820800, 524544, 1107296256, 1107820800, 34078720, 0, 1074266112, 1107296256, 524544, 33554688, 1073742080, 524288, 0, 1074266112, 34078976, 1073742080],
            d = [536870928, 541065216, 16384, 541081616, 541065216, 16, 541081616, 4194304, 536887296, 4210704, 4194304, 536870928, 4194320, 536887296, 536870912, 16400, 0, 4194320, 536887312, 16384, 4210688, 536887312, 16, 541065232, 541065232, 0, 4210704, 541081600, 16400, 4210688, 541081600, 536870912, 536887296, 16, 541065232, 4210688, 541081616, 4194304, 16400, 536870928, 4194304, 536887296, 536870912, 16400, 536870928, 541081616, 4210688, 541065216, 4210704, 541081600, 0, 541065232, 16, 16384, 541065216, 4210704, 16384, 4194320, 536887312, 0, 541081600, 536870912, 4194320, 536887312],
            u = [2097152, 69206018, 67110914, 0, 2048, 67110914, 2099202, 69208064, 69208066, 2097152, 0, 67108866, 2, 67108864, 69206018, 2050, 67110912, 2099202, 2097154, 67110912, 67108866, 69206016, 69208064, 2097154, 69206016, 2048, 2050, 69208066, 2099200, 2, 67108864, 2099200, 67108864, 2099200, 2097152, 67110914, 67110914, 69206018, 69206018, 2, 2097154, 67108864, 67110912, 2097152, 69208064, 2050, 2099202, 69208064, 2050, 67108866, 69208066, 69206016, 2099200, 0, 2, 69208066, 0, 2099202, 69206016, 2048, 67108866, 67110912, 2048, 2097154],
            l = [268439616, 4096, 262144, 268701760, 268435456, 268439616, 64, 268435456, 262208, 268697600, 268701760, 266240, 268701696, 266304, 4096, 64, 268697600, 268435520, 268439552, 4160, 266240, 262208, 268697664, 268701696, 4160, 0, 0, 268697664, 268435520, 268439552, 266304, 262144, 266304, 262144, 268701696, 4096, 64, 268697664, 4096, 266304, 268439552, 64, 268435520, 268697600, 268697664, 268435456, 262144, 268439616, 0, 268701760, 262208, 268435520, 268697600, 268439552, 268439616, 0, 268701760, 266240, 266240, 4160, 4160, 262208, 268435456, 268701696];

        function h(e, t, r, i) {
            var n, h, p = 32 === e.length ? 3 : 9;
            n = 3 === p ? i ? [30, -2, -2] : [0, 32, 2] : i ? [94, 62, -2, 32, 64, 2, 30, -2, -2] : [0, 32, 2, 62, 30, -2, 64, 96, 2];
            var g = t[0], y = t[1];
            g ^= (h = 252645135 & (g >>> 4 ^ y)) << 4, g ^= (h = 65535 & (g >>> 16 ^ (y ^= h))) << 16, g ^= h = 858993459 & ((y ^= h) >>> 2 ^ g), g ^= h = 16711935 & ((y ^= h << 2) >>> 8 ^ g), g = (g ^= (h = 1431655765 & (g >>> 1 ^ (y ^= h << 8))) << 1) << 1 | g >>> 31, y = (y ^= h) << 1 | y >>> 31;
            for (var m = 0; m < p; m += 3) {
                for (var v = n[m + 1], b = n[m + 2], w = n[m]; w != v; w += b) {
                    var E = y ^ e[w], C = (y >>> 4 | y << 28) ^ e[w + 1];
                    h = g, g = y, y = h ^ (s[E >>> 24 & 63] | c[E >>> 16 & 63] | d[E >>> 8 & 63] | l[63 & E] | a[C >>> 24 & 63] | o[C >>> 16 & 63] | f[C >>> 8 & 63] | u[63 & C])
                }
                h = g, g = y, y = h
            }
            y = y >>> 1 | y << 31, y ^= h = 1431655765 & ((g = g >>> 1 | g << 31) >>> 1 ^ y), y ^= (h = 16711935 & (y >>> 8 ^ (g ^= h << 1))) << 8, y ^= (h = 858993459 & (y >>> 2 ^ (g ^= h))) << 2, y ^= h = 65535 & ((g ^= h) >>> 16 ^ y), y ^= h = 252645135 & ((g ^= h << 16) >>> 4 ^ y), g ^= h << 4, r[0] = g, r[1] = y
        }

        function p(e) {
            var t, r = "DES-" + ((e = e || {}).mode || "CBC").toUpperCase(),
                n = (t = e.decrypt ? i.cipher.createDecipher(r, e.key) : i.cipher.createCipher(r, e.key)).start;
            return t.start = function (e, r) {
                var a = null;
                r instanceof i.util.ByteBuffer && (a = r, r = {}), (r = r || {}).output = a, r.iv = e, n.call(t, r)
            }, t
        }
    }, 80069: (e, t, r) => {
        var i = r(3832);
        r(15764), r(49563), r(63219), r(97116);
        var n = r(59205), a = n.publicKeyValidator, s = n.privateKeyValidator;
        if (void 0 === o) var o = i.jsbn.BigInteger;
        var c = i.util.ByteBuffer, f = "undefined" == typeof Buffer ? Uint8Array : Buffer;
        i.pki = i.pki || {}, e.exports = i.pki.ed25519 = i.ed25519 = i.ed25519 || {};
        var d = i.ed25519;

        function u(e) {
            var t = e.message;
            if (t instanceof Uint8Array || t instanceof f) return t;
            var r = e.encoding;
            if (void 0 === t) {
                if (!e.md) throw new TypeError('"options.message" or "options.md" not specified.');
                t = e.md.digest().getBytes(), r = "binary"
            }
            if ("string" == typeof t && !r) throw new TypeError('"options.encoding" must be "binary" or "utf8".');
            if ("string" == typeof t) {
                if ("undefined" != typeof Buffer) return Buffer.from(t, r);
                t = new c(t, r)
            } else if (!(t instanceof c)) throw new TypeError('"options.message" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a string with "options.encoding" specifying its encoding.');
            for (var i = new f(t.length()), n = 0; n < i.length; ++n) i[n] = t.at(n);
            return i
        }

        d.constants = {}, d.constants.PUBLIC_KEY_BYTE_LENGTH = 32, d.constants.PRIVATE_KEY_BYTE_LENGTH = 64, d.constants.SEED_BYTE_LENGTH = 32, d.constants.SIGN_BYTE_LENGTH = 64, d.constants.HASH_BYTE_LENGTH = 64, d.generateKeyPair = function (e) {
            var t = (e = e || {}).seed;
            if (void 0 === t) t = i.random.getBytesSync(d.constants.SEED_BYTE_LENGTH); else if ("string" == typeof t) {
                if (t.length !== d.constants.SEED_BYTE_LENGTH) throw new TypeError('"seed" must be ' + d.constants.SEED_BYTE_LENGTH + " bytes in length.")
            } else if (!(t instanceof Uint8Array)) throw new TypeError('"seed" must be a node.js Buffer, Uint8Array, or a binary string.');
            t = u({message: t, encoding: "binary"});
            for (var r = new f(d.constants.PUBLIC_KEY_BYTE_LENGTH), n = new f(d.constants.PRIVATE_KEY_BYTE_LENGTH), a = 0; a < 32; ++a) n[a] = t[a];
            return function (e, t) {
                var r, i = [P(), P(), P(), P()], n = w(t, 32);
                for (n[0] &= 248, n[31] &= 127, n[31] |= 64, R(i, n), A(e, i), r = 0; r < 32; ++r) t[r + 32] = e[r]
            }(r, n), {publicKey: r, privateKey: n}
        }, d.privateKeyFromAsn1 = function (e) {
            var t = {}, r = [];
            if (!i.asn1.validate(e, s, t, r)) {
                var n = new Error("Invalid Key.");
                throw n.errors = r, n
            }
            var a = i.asn1.derToOid(t.privateKeyOid), o = i.oids.EdDSA25519;
            if (a !== o) throw new Error('Invalid OID "' + a + '"; OID must be "' + o + '".');
            var c = t.privateKey;
            return {privateKeyBytes: u({message: i.asn1.fromDer(c).value, encoding: "binary"})}
        }, d.publicKeyFromAsn1 = function (e) {
            var t = {}, r = [];
            if (!i.asn1.validate(e, a, t, r)) {
                var n = new Error("Invalid Key.");
                throw n.errors = r, n
            }
            var s = i.asn1.derToOid(t.publicKeyOid), o = i.oids.EdDSA25519;
            if (s !== o) throw new Error('Invalid OID "' + s + '"; OID must be "' + o + '".');
            var c = t.ed25519PublicKey;
            if (c.length !== d.constants.PUBLIC_KEY_BYTE_LENGTH) throw new Error("Key length is invalid.");
            return u({message: c, encoding: "binary"})
        }, d.publicKeyFromPrivateKey = function (e) {
            var t = u({message: (e = e || {}).privateKey, encoding: "binary"});
            if (t.length !== d.constants.PRIVATE_KEY_BYTE_LENGTH) throw new TypeError('"options.privateKey" must have a byte length of ' + d.constants.PRIVATE_KEY_BYTE_LENGTH);
            for (var r = new f(d.constants.PUBLIC_KEY_BYTE_LENGTH), i = 0; i < r.length; ++i) r[i] = t[32 + i];
            return r
        }, d.sign = function (e) {
            var t = u(e = e || {}), r = u({message: e.privateKey, encoding: "binary"});
            if (r.length === d.constants.SEED_BYTE_LENGTH) r = d.generateKeyPair({seed: r}).privateKey; else if (r.length !== d.constants.PRIVATE_KEY_BYTE_LENGTH) throw new TypeError('"options.privateKey" must have a byte length of ' + d.constants.SEED_BYTE_LENGTH + " or " + d.constants.PRIVATE_KEY_BYTE_LENGTH);
            var i = new f(d.constants.SIGN_BYTE_LENGTH + t.length);
            !function (e, t, r, i) {
                var n, a, s = new Float64Array(64), o = [P(), P(), P(), P()], c = w(i, 32);
                c[0] &= 248, c[31] &= 127, c[31] |= 64;
                var f = r + 64;
                for (n = 0; n < r; ++n) e[64 + n] = t[n];
                for (n = 0; n < 32; ++n) e[32 + n] = c[32 + n];
                var d = w(e.subarray(32), r + 32);
                for (C(d), R(o, d), A(e, o), n = 32; n < 64; ++n) e[n] = i[n];
                var u = w(e, r + 64);
                for (C(u), n = 32; n < 64; ++n) s[n] = 0;
                for (n = 0; n < 32; ++n) s[n] = d[n];
                for (n = 0; n < 32; ++n) for (a = 0; a < 32; a++) s[n + a] += u[n] * c[a];
                E(e.subarray(32), s)
            }(i, t, t.length, r);
            for (var n = new f(d.constants.SIGN_BYTE_LENGTH), a = 0; a < n.length; ++a) n[a] = i[a];
            return n
        }, d.verify = function (e) {
            var t = u(e = e || {});
            if (void 0 === e.signature) throw new TypeError('"options.signature" must be a node.js Buffer, a Uint8Array, a forge ByteBuffer, or a binary string.');
            var r = u({message: e.signature, encoding: "binary"});
            if (r.length !== d.constants.SIGN_BYTE_LENGTH) throw new TypeError('"options.signature" must have a byte length of ' + d.constants.SIGN_BYTE_LENGTH);
            var i = u({message: e.publicKey, encoding: "binary"});
            if (i.length !== d.constants.PUBLIC_KEY_BYTE_LENGTH) throw new TypeError('"options.publicKey" must have a byte length of ' + d.constants.PUBLIC_KEY_BYTE_LENGTH);
            var n, a = new f(d.constants.SIGN_BYTE_LENGTH + t.length),
                s = new f(d.constants.SIGN_BYTE_LENGTH + t.length);
            for (n = 0; n < d.constants.SIGN_BYTE_LENGTH; ++n) a[n] = r[n];
            for (n = 0; n < t.length; ++n) a[n + d.constants.SIGN_BYTE_LENGTH] = t[n];
            return function (e, t, r, i) {
                var n, a = new f(32), s = [P(), P(), P(), P()], o = [P(), P(), P(), P()];
                if (-1, r < 64) return -1;
                if (function (e, t) {
                    var r = P(), i = P(), n = P(), a = P(), s = P(), o = P(), c = P();
                    L(e[2], h), function (e, t) {
                        var r;
                        for (r = 0; r < 16; ++r) e[r] = t[2 * r] + (t[2 * r + 1] << 8);
                        e[15] &= 32767
                    }(e[1], t), O(n, e[1]), V(a, n, p), x(n, n, e[2]), D(a, e[2], a), O(s, a), O(o, s), V(c, o, s), V(r, c, n), V(r, r, a), function (e, t) {
                        var r, i = P();
                        for (r = 0; r < 16; ++r) i[r] = t[r];
                        for (r = 250; r >= 0; --r) O(i, i), 1 !== r && V(i, i, t);
                        for (r = 0; r < 16; ++r) e[r] = i[r]
                    }(r, r), V(r, r, n), V(r, r, a), V(r, r, a), V(e[0], r, a), O(i, e[0]), V(i, i, a), T(i, n) && V(e[0], e[0], b);
                    if (O(i, e[0]), V(i, i, a), T(i, n)) return -1;
                    N(e[0]) === t[31] >> 7 && x(e[0], l, e[0]);
                    return V(e[3], e[0], e[1]), 0
                }(o, i)) return -1;
                for (n = 0; n < r; ++n) e[n] = t[n];
                for (n = 0; n < 32; ++n) e[n + 32] = i[n];
                var c = w(e, r);
                if (C(c), k(s, o, c), R(o, t.subarray(32)), S(s, o), A(a, s), r -= 64, B(t, 0, a, 0)) {
                    for (n = 0; n < r; ++n) e[n] = 0;
                    return -1
                }
                for (n = 0; n < r; ++n) e[n] = t[n + 64];
                return r
            }(s, a, a.length, i) >= 0
        };
        var l = P(), h = P([1]),
            p = P([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]),
            g = P([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]),
            y = P([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]),
            m = P([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]),
            v = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]),
            b = P([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);

        function w(e, t) {
            var r = i.md.sha512.create(), n = new c(e);
            r.update(n.getBytes(t), "binary");
            var a = r.digest().getBytes();
            if ("undefined" != typeof Buffer) return Buffer.from(a, "binary");
            for (var s = new f(d.constants.HASH_BYTE_LENGTH), o = 0; o < 64; ++o) s[o] = a.charCodeAt(o);
            return s
        }

        function E(e, t) {
            var r, i, n, a;
            for (i = 63; i >= 32; --i) {
                for (r = 0, n = i - 32, a = i - 12; n < a; ++n) t[n] += r - 16 * t[i] * v[n - (i - 32)], r = t[n] + 128 >> 8, t[n] -= 256 * r;
                t[n] += r, t[i] = 0
            }
            for (r = 0, n = 0; n < 32; ++n) t[n] += r - (t[31] >> 4) * v[n], r = t[n] >> 8, t[n] &= 255;
            for (n = 0; n < 32; ++n) t[n] -= r * v[n];
            for (i = 0; i < 32; ++i) t[i + 1] += t[i] >> 8, e[i] = 255 & t[i]
        }

        function C(e) {
            for (var t = new Float64Array(64), r = 0; r < 64; ++r) t[r] = e[r], e[r] = 0;
            E(e, t)
        }

        function S(e, t) {
            var r = P(), i = P(), n = P(), a = P(), s = P(), o = P(), c = P(), f = P(), d = P();
            x(r, e[1], e[0]), x(d, t[1], t[0]), V(r, r, d), D(i, e[0], e[1]), D(d, t[0], t[1]), V(i, i, d), V(n, e[3], t[3]), V(n, n, g), V(a, e[2], t[2]), D(a, a, a), x(s, i, r), x(o, a, n), D(c, a, n), D(f, i, r), V(e[0], s, o), V(e[1], f, c), V(e[2], c, o), V(e[3], s, f)
        }

        function I(e, t, r) {
            for (var i = 0; i < 4; ++i) U(e[i], t[i], r)
        }

        function A(e, t) {
            var r = P(), i = P(), n = P();
            !function (e, t) {
                var r, i = P();
                for (r = 0; r < 16; ++r) i[r] = t[r];
                for (r = 253; r >= 0; --r) O(i, i), 2 !== r && 4 !== r && V(i, i, t);
                for (r = 0; r < 16; ++r) e[r] = i[r]
            }(n, t[2]), V(r, t[0], n), V(i, t[1], n), _(e, i), e[31] ^= N(r) << 7
        }

        function _(e, t) {
            var r, i, n, a = P(), s = P();
            for (r = 0; r < 16; ++r) s[r] = t[r];
            for (M(s), M(s), M(s), i = 0; i < 2; ++i) {
                for (a[0] = s[0] - 65517, r = 1; r < 15; ++r) a[r] = s[r] - 65535 - (a[r - 1] >> 16 & 1), a[r - 1] &= 65535;
                a[15] = s[15] - 32767 - (a[14] >> 16 & 1), n = a[15] >> 16 & 1, a[14] &= 65535, U(s, a, 1 - n)
            }
            for (r = 0; r < 16; r++) e[2 * r] = 255 & s[r], e[2 * r + 1] = s[r] >> 8
        }

        function T(e, t) {
            var r = new f(32), i = new f(32);
            return _(r, e), _(i, t), B(r, 0, i, 0)
        }

        function B(e, t, r, i) {
            return function (e, t, r, i, n) {
                var a, s = 0;
                for (a = 0; a < n; ++a) s |= e[t + a] ^ r[i + a];
                return (1 & s - 1 >>> 8) - 1
            }(e, t, r, i, 32)
        }

        function N(e) {
            var t = new f(32);
            return _(t, e), 1 & t[0]
        }

        function k(e, t, r) {
            var i, n;
            for (L(e[0], l), L(e[1], h), L(e[2], h), L(e[3], l), n = 255; n >= 0; --n) I(e, t, i = r[n / 8 | 0] >> (7 & n) & 1), S(t, e), S(e, e), I(e, t, i)
        }

        function R(e, t) {
            var r = [P(), P(), P(), P()];
            L(r[0], y), L(r[1], m), L(r[2], h), V(r[3], y, m), k(e, r, t)
        }

        function L(e, t) {
            var r;
            for (r = 0; r < 16; r++) e[r] = 0 | t[r]
        }

        function M(e) {
            var t, r, i = 1;
            for (t = 0; t < 16; ++t) r = e[t] + i + 65535, i = Math.floor(r / 65536), e[t] = r - 65536 * i;
            e[0] += i - 1 + 37 * (i - 1)
        }

        function U(e, t, r) {
            for (var i, n = ~(r - 1), a = 0; a < 16; ++a) i = n & (e[a] ^ t[a]), e[a] ^= i, t[a] ^= i
        }

        function P(e) {
            var t, r = new Float64Array(16);
            if (e) for (t = 0; t < e.length; ++t) r[t] = e[t];
            return r
        }

        function D(e, t, r) {
            for (var i = 0; i < 16; ++i) e[i] = t[i] + r[i]
        }

        function x(e, t, r) {
            for (var i = 0; i < 16; ++i) e[i] = t[i] - r[i]
        }

        function O(e, t) {
            V(e, t, t)
        }

        function V(e, t, r) {
            var i, n, a = 0, s = 0, o = 0, c = 0, f = 0, d = 0, u = 0, l = 0, h = 0, p = 0, g = 0, y = 0, m = 0, v = 0,
                b = 0, w = 0, E = 0, C = 0, S = 0, I = 0, A = 0, _ = 0, T = 0, B = 0, N = 0, k = 0, R = 0, L = 0, M = 0,
                U = 0, P = 0, D = r[0], x = r[1], O = r[2], V = r[3], K = r[4], z = r[5], q = r[6], F = r[7], j = r[8],
                H = r[9], G = r[10], W = r[11], Q = r[12], Z = r[13], X = r[14], Y = r[15];
            a += (i = t[0]) * D, s += i * x, o += i * O, c += i * V, f += i * K, d += i * z, u += i * q, l += i * F, h += i * j, p += i * H, g += i * G, y += i * W, m += i * Q, v += i * Z, b += i * X, w += i * Y, s += (i = t[1]) * D, o += i * x, c += i * O, f += i * V, d += i * K, u += i * z, l += i * q, h += i * F, p += i * j, g += i * H, y += i * G, m += i * W, v += i * Q, b += i * Z, w += i * X, E += i * Y, o += (i = t[2]) * D, c += i * x, f += i * O, d += i * V, u += i * K, l += i * z, h += i * q, p += i * F, g += i * j, y += i * H, m += i * G, v += i * W, b += i * Q, w += i * Z, E += i * X, C += i * Y, c += (i = t[3]) * D, f += i * x, d += i * O, u += i * V, l += i * K, h += i * z, p += i * q, g += i * F, y += i * j, m += i * H, v += i * G, b += i * W, w += i * Q, E += i * Z, C += i * X, S += i * Y, f += (i = t[4]) * D, d += i * x, u += i * O, l += i * V, h += i * K, p += i * z, g += i * q, y += i * F, m += i * j, v += i * H, b += i * G, w += i * W, E += i * Q, C += i * Z, S += i * X, I += i * Y, d += (i = t[5]) * D, u += i * x, l += i * O, h += i * V, p += i * K, g += i * z, y += i * q, m += i * F, v += i * j, b += i * H, w += i * G, E += i * W, C += i * Q, S += i * Z, I += i * X, A += i * Y, u += (i = t[6]) * D, l += i * x, h += i * O, p += i * V, g += i * K,y += i * z,m += i * q,v += i * F,b += i * j,w += i * H,E += i * G,C += i * W,S += i * Q,I += i * Z,A += i * X,_ += i * Y,l += (i = t[7]) * D,h += i * x,p += i * O,g += i * V,y += i * K,m += i * z,v += i * q,b += i * F,w += i * j,E += i * H,C += i * G,S += i * W,I += i * Q,A += i * Z,_ += i * X,T += i * Y,h += (i = t[8]) * D,p += i * x,g += i * O,y += i * V,m += i * K,v += i * z,b += i * q,w += i * F,E += i * j,C += i * H,S += i * G,I += i * W,A += i * Q,_ += i * Z,T += i * X,B += i * Y,p += (i = t[9]) * D,g += i * x,y += i * O,m += i * V,v += i * K,b += i * z,w += i * q,E += i * F,C += i * j,S += i * H,I += i * G,A += i * W,_ += i * Q,T += i * Z,B += i * X,N += i * Y,g += (i = t[10]) * D,y += i * x,m += i * O,v += i * V,b += i * K,w += i * z,E += i * q,C += i * F,S += i * j,I += i * H,A += i * G,_ += i * W,T += i * Q,B += i * Z,N += i * X,k += i * Y,y += (i = t[11]) * D,m += i * x,v += i * O,b += i * V,w += i * K,E += i * z,C += i * q,S += i * F,I += i * j,A += i * H,_ += i * G,T += i * W,B += i * Q,N += i * Z,k += i * X,R += i * Y,m += (i = t[12]) * D,v += i * x,b += i * O,w += i * V,E += i * K,C += i * z,S += i * q,I += i * F,A += i * j,_ += i * H,T += i * G,B += i * W,N += i * Q,k += i * Z,R += i * X,L += i * Y,v += (i = t[13]) * D,b += i * x,w += i * O,E += i * V,C += i * K,S += i * z,I += i * q,A += i * F,_ += i * j,T += i * H,B += i * G,N += i * W,k += i * Q,R += i * Z,L += i * X,M += i * Y,b += (i = t[14]) * D,w += i * x,E += i * O,C += i * V,S += i * K,I += i * z,A += i * q,_ += i * F,T += i * j,B += i * H,N += i * G,k += i * W,R += i * Q,L += i * Z,M += i * X,U += i * Y,w += (i = t[15]) * D,s += 38 * (C += i * O),o += 38 * (S += i * V),c += 38 * (I += i * K),f += 38 * (A += i * z),d += 38 * (_ += i * q),u += 38 * (T += i * F),l += 38 * (B += i * j),h += 38 * (N += i * H),p += 38 * (k += i * G),g += 38 * (R += i * W),y += 38 * (L += i * Q),m += 38 * (M += i * Z),v += 38 * (U += i * X),b += 38 * (P += i * Y),a = (i = (a += 38 * (E += i * x)) + (n = 1) + 65535) - 65536 * (n = Math.floor(i / 65536)),s = (i = s + n + 65535) - 65536 * (n = Math.floor(i / 65536)),o = (i = o + n + 65535) - 65536 * (n = Math.floor(i / 65536)),c = (i = c + n + 65535) - 65536 * (n = Math.floor(i / 65536)),f = (i = f + n + 65535) - 65536 * (n = Math.floor(i / 65536)),d = (i = d + n + 65535) - 65536 * (n = Math.floor(i / 65536)),u = (i = u + n + 65535) - 65536 * (n = Math.floor(i / 65536)),l = (i = l + n + 65535) - 65536 * (n = Math.floor(i / 65536)),h = (i = h + n + 65535) - 65536 * (n = Math.floor(i / 65536)),p = (i = p + n + 65535) - 65536 * (n = Math.floor(i / 65536)),g = (i = g + n + 65535) - 65536 * (n = Math.floor(i / 65536)),y = (i = y + n + 65535) - 65536 * (n = Math.floor(i / 65536)),m = (i = m + n + 65535) - 65536 * (n = Math.floor(i / 65536)),v = (i = v + n + 65535) - 65536 * (n = Math.floor(i / 65536)),b = (i = b + n + 65535) - 65536 * (n = Math.floor(i / 65536)),w = (i = w + n + 65535) - 65536 * (n = Math.floor(i / 65536)),a = (i = (a += n - 1 + 37 * (n - 1)) + (n = 1) + 65535) - 65536 * (n = Math.floor(i / 65536)),s = (i = s + n + 65535) - 65536 * (n = Math.floor(i / 65536)),o = (i = o + n + 65535) - 65536 * (n = Math.floor(i / 65536)),c = (i = c + n + 65535) - 65536 * (n = Math.floor(i / 65536)),f = (i = f + n + 65535) - 65536 * (n = Math.floor(i / 65536)),d = (i = d + n + 65535) - 65536 * (n = Math.floor(i / 65536)),u = (i = u + n + 65535) - 65536 * (n = Math.floor(i / 65536)),l = (i = l + n + 65535) - 65536 * (n = Math.floor(i / 65536)),h = (i = h + n + 65535) - 65536 * (n = Math.floor(i / 65536)),p = (i = p + n + 65535) - 65536 * (n = Math.floor(i / 65536)),g = (i = g + n + 65535) - 65536 * (n = Math.floor(i / 65536)),y = (i = y + n + 65535) - 65536 * (n = Math.floor(i / 65536)),m = (i = m + n + 65535) - 65536 * (n = Math.floor(i / 65536)),v = (i = v + n + 65535) - 65536 * (n = Math.floor(i / 65536)),b = (i = b + n + 65535) - 65536 * (n = Math.floor(i / 65536)),w = (i = w + n + 65535) - 65536 * (n = Math.floor(i / 65536)),a += n - 1 + 37 * (n - 1),e[0] = a,e[1] = s,e[2] = o,e[3] = c,e[4] = f,e[5] = d,e[6] = u,e[7] = l,e[8] = h,e[9] = p,e[10] = g,e[11] = y,e[12] = m,e[13] = v,e[14] = b,e[15] = w
        }
    }, 3832: e => {
        e.exports = {options: {usePureJavaScript: !1}}
    }, 36607: (e, t, r) => {
        var i = r(3832);
        r(28991), r(97116), (e.exports = i.hmac = i.hmac || {}).create = function () {
            var e = null, t = null, r = null, n = null, a = {
                start: function (a, s) {
                    if (null !== a) if ("string" == typeof a) {
                        if (!((a = a.toLowerCase()) in i.md.algorithms)) throw new Error('Unknown hash algorithm "' + a + '"');
                        t = i.md.algorithms[a].create()
                    } else t = a;
                    if (null === s) s = e; else {
                        if ("string" == typeof s) s = i.util.createBuffer(s); else if (i.util.isArray(s)) {
                            var o = s;
                            s = i.util.createBuffer();
                            for (var c = 0; c < o.length; ++c) s.putByte(o[c])
                        }
                        var f = s.length();
                        f > t.blockLength && (t.start(), t.update(s.bytes()), s = t.digest()), r = i.util.createBuffer(), n = i.util.createBuffer(), f = s.length();
                        for (c = 0; c < f; ++c) {
                            o = s.at(c);
                            r.putByte(54 ^ o), n.putByte(92 ^ o)
                        }
                        if (f < t.blockLength) for (o = t.blockLength - f, c = 0; c < o; ++c) r.putByte(54), n.putByte(92);
                        e = s, r = r.bytes(), n = n.bytes()
                    }
                    t.start(), t.update(r)
                }, update: function (e) {
                    t.update(e)
                }, getMac: function () {
                    var e = t.digest().bytes();
                    return t.start(), t.update(n), t.update(e), t.digest()
                }
            };
            return a.digest = a.getMac, a
        }
    }, 22079: (e, t, r) => {
        e.exports = r(3832), r(8925), r(26164), r(3068), r(85649), r(33480), r(80069), r(36607), r(96366), r(84145), r(43389), r(83453), r(98960), r(26953), r(18936), r(55147), r(79437), r(4742), r(29654), r(74933), r(47629), r(49563), r(69372), r(77173), r(84311), r(97116)
    }, 15764: (e, t, r) => {
        var i, n = r(3832);
        e.exports = n.jsbn = n.jsbn || {};

        function a(e, t, r) {
            this.data = [], null != e && ("number" == typeof e ? this.fromNumber(e, t, r) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
        }

        function s() {
            return new a(null)
        }

        function o(e, t, r, i, n, a) {
            for (var s = 16383 & t, o = t >> 14; --a >= 0;) {
                var c = 16383 & this.data[e], f = this.data[e++] >> 14, d = o * c + f * s;
                n = ((c = s * c + ((16383 & d) << 14) + r.data[i] + n) >> 28) + (d >> 14) + o * f, r.data[i++] = 268435455 & c
            }
            return n
        }

        n.jsbn.BigInteger = a, "undefined" == typeof navigator ? (a.prototype.am = o, i = 28) : "Microsoft Internet Explorer" == navigator.appName ? (a.prototype.am = function (e, t, r, i, n, a) {
            for (var s = 32767 & t, o = t >> 15; --a >= 0;) {
                var c = 32767 & this.data[e], f = this.data[e++] >> 15, d = o * c + f * s;
                n = ((c = s * c + ((32767 & d) << 15) + r.data[i] + (1073741823 & n)) >>> 30) + (d >>> 15) + o * f + (n >>> 30), r.data[i++] = 1073741823 & c
            }
            return n
        }, i = 30) : "Netscape" != navigator.appName ? (a.prototype.am = function (e, t, r, i, n, a) {
            for (; --a >= 0;) {
                var s = t * this.data[e++] + r.data[i] + n;
                n = Math.floor(s / 67108864), r.data[i++] = 67108863 & s
            }
            return n
        }, i = 26) : (a.prototype.am = o, i = 28), a.prototype.DB = i, a.prototype.DM = (1 << i) - 1, a.prototype.DV = 1 << i;
        a.prototype.FV = Math.pow(2, 52), a.prototype.F1 = 52 - i, a.prototype.F2 = 2 * i - 52;
        var c, f, d = "0123456789abcdefghijklmnopqrstuvwxyz", u = new Array;
        for (c = "0".charCodeAt(0), f = 0; f <= 9; ++f) u[c++] = f;
        for (c = "a".charCodeAt(0), f = 10; f < 36; ++f) u[c++] = f;
        for (c = "A".charCodeAt(0), f = 10; f < 36; ++f) u[c++] = f;

        function l(e) {
            return d.charAt(e)
        }

        function h(e, t) {
            var r = u[e.charCodeAt(t)];
            return null == r ? -1 : r
        }

        function p(e) {
            var t = s();
            return t.fromInt(e), t
        }

        function g(e) {
            var t, r = 1;
            return 0 != (t = e >>> 16) && (e = t, r += 16), 0 != (t = e >> 8) && (e = t, r += 8), 0 != (t = e >> 4) && (e = t, r += 4), 0 != (t = e >> 2) && (e = t, r += 2), 0 != (t = e >> 1) && (e = t, r += 1), r
        }

        function y(e) {
            this.m = e
        }

        function m(e) {
            this.m = e, this.mp = e.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, this.um = (1 << e.DB - 15) - 1, this.mt2 = 2 * e.t
        }

        function v(e, t) {
            return e & t
        }

        function b(e, t) {
            return e | t
        }

        function w(e, t) {
            return e ^ t
        }

        function E(e, t) {
            return e & ~t
        }

        function C(e) {
            if (0 == e) return -1;
            var t = 0;
            return 0 == (65535 & e) && (e >>= 16, t += 16), 0 == (255 & e) && (e >>= 8, t += 8), 0 == (15 & e) && (e >>= 4, t += 4), 0 == (3 & e) && (e >>= 2, t += 2), 0 == (1 & e) && ++t, t
        }

        function S(e) {
            for (var t = 0; 0 != e;) e &= e - 1, ++t;
            return t
        }

        function I() {
        }

        function A(e) {
            return e
        }

        function _(e) {
            this.r2 = s(), this.q3 = s(), a.ONE.dlShiftTo(2 * e.t, this.r2), this.mu = this.r2.divide(e), this.m = e
        }

        y.prototype.convert = function (e) {
            return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
        }, y.prototype.revert = function (e) {
            return e
        }, y.prototype.reduce = function (e) {
            e.divRemTo(this.m, null, e)
        }, y.prototype.mulTo = function (e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
        }, y.prototype.sqrTo = function (e, t) {
            e.squareTo(t), this.reduce(t)
        }, m.prototype.convert = function (e) {
            var t = s();
            return e.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), e.s < 0 && t.compareTo(a.ZERO) > 0 && this.m.subTo(t, t), t
        }, m.prototype.revert = function (e) {
            var t = s();
            return e.copyTo(t), this.reduce(t), t
        }, m.prototype.reduce = function (e) {
            for (; e.t <= this.mt2;) e.data[e.t++] = 0;
            for (var t = 0; t < this.m.t; ++t) {
                var r = 32767 & e.data[t],
                    i = r * this.mpl + ((r * this.mph + (e.data[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
                for (r = t + this.m.t, e.data[r] += this.m.am(0, i, e, t, 0, this.m.t); e.data[r] >= e.DV;) e.data[r] -= e.DV, e.data[++r]++
            }
            e.clamp(), e.drShiftTo(this.m.t, e), e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
        }, m.prototype.mulTo = function (e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
        }, m.prototype.sqrTo = function (e, t) {
            e.squareTo(t), this.reduce(t)
        }, a.prototype.copyTo = function (e) {
            for (var t = this.t - 1; t >= 0; --t) e.data[t] = this.data[t];
            e.t = this.t, e.s = this.s
        }, a.prototype.fromInt = function (e) {
            this.t = 1, this.s = e < 0 ? -1 : 0, e > 0 ? this.data[0] = e : e < -1 ? this.data[0] = e + this.DV : this.t = 0
        }, a.prototype.fromString = function (e, t) {
            var r;
            if (16 == t) r = 4; else if (8 == t) r = 3; else if (256 == t) r = 8; else if (2 == t) r = 1; else if (32 == t) r = 5; else {
                if (4 != t) return void this.fromRadix(e, t);
                r = 2
            }
            this.t = 0, this.s = 0;
            for (var i = e.length, n = !1, s = 0; --i >= 0;) {
                var o = 8 == r ? 255 & e[i] : h(e, i);
                o < 0 ? "-" == e.charAt(i) && (n = !0) : (n = !1, 0 == s ? this.data[this.t++] = o : s + r > this.DB ? (this.data[this.t - 1] |= (o & (1 << this.DB - s) - 1) << s, this.data[this.t++] = o >> this.DB - s) : this.data[this.t - 1] |= o << s, (s += r) >= this.DB && (s -= this.DB))
            }
            8 == r && 0 != (128 & e[0]) && (this.s = -1, s > 0 && (this.data[this.t - 1] |= (1 << this.DB - s) - 1 << s)), this.clamp(), n && a.ZERO.subTo(this, this)
        }, a.prototype.clamp = function () {
            for (var e = this.s & this.DM; this.t > 0 && this.data[this.t - 1] == e;) --this.t
        }, a.prototype.dlShiftTo = function (e, t) {
            var r;
            for (r = this.t - 1; r >= 0; --r) t.data[r + e] = this.data[r];
            for (r = e - 1; r >= 0; --r) t.data[r] = 0;
            t.t = this.t + e, t.s = this.s
        }, a.prototype.drShiftTo = function (e, t) {
            for (var r = e; r < this.t; ++r) t.data[r - e] = this.data[r];
            t.t = Math.max(this.t - e, 0), t.s = this.s
        }, a.prototype.lShiftTo = function (e, t) {
            var r, i = e % this.DB, n = this.DB - i, a = (1 << n) - 1, s = Math.floor(e / this.DB),
                o = this.s << i & this.DM;
            for (r = this.t - 1; r >= 0; --r) t.data[r + s + 1] = this.data[r] >> n | o, o = (this.data[r] & a) << i;
            for (r = s - 1; r >= 0; --r) t.data[r] = 0;
            t.data[s] = o, t.t = this.t + s + 1, t.s = this.s, t.clamp()
        }, a.prototype.rShiftTo = function (e, t) {
            t.s = this.s;
            var r = Math.floor(e / this.DB);
            if (r >= this.t) t.t = 0; else {
                var i = e % this.DB, n = this.DB - i, a = (1 << i) - 1;
                t.data[0] = this.data[r] >> i;
                for (var s = r + 1; s < this.t; ++s) t.data[s - r - 1] |= (this.data[s] & a) << n, t.data[s - r] = this.data[s] >> i;
                i > 0 && (t.data[this.t - r - 1] |= (this.s & a) << n), t.t = this.t - r, t.clamp()
            }
        }, a.prototype.subTo = function (e, t) {
            for (var r = 0, i = 0, n = Math.min(e.t, this.t); r < n;) i += this.data[r] - e.data[r], t.data[r++] = i & this.DM, i >>= this.DB;
            if (e.t < this.t) {
                for (i -= e.s; r < this.t;) i += this.data[r], t.data[r++] = i & this.DM, i >>= this.DB;
                i += this.s
            } else {
                for (i += this.s; r < e.t;) i -= e.data[r], t.data[r++] = i & this.DM, i >>= this.DB;
                i -= e.s
            }
            t.s = i < 0 ? -1 : 0, i < -1 ? t.data[r++] = this.DV + i : i > 0 && (t.data[r++] = i), t.t = r, t.clamp()
        }, a.prototype.multiplyTo = function (e, t) {
            var r = this.abs(), i = e.abs(), n = r.t;
            for (t.t = n + i.t; --n >= 0;) t.data[n] = 0;
            for (n = 0; n < i.t; ++n) t.data[n + r.t] = r.am(0, i.data[n], t, n, 0, r.t);
            t.s = 0, t.clamp(), this.s != e.s && a.ZERO.subTo(t, t)
        }, a.prototype.squareTo = function (e) {
            for (var t = this.abs(), r = e.t = 2 * t.t; --r >= 0;) e.data[r] = 0;
            for (r = 0; r < t.t - 1; ++r) {
                var i = t.am(r, t.data[r], e, 2 * r, 0, 1);
                (e.data[r + t.t] += t.am(r + 1, 2 * t.data[r], e, 2 * r + 1, i, t.t - r - 1)) >= t.DV && (e.data[r + t.t] -= t.DV, e.data[r + t.t + 1] = 1)
            }
            e.t > 0 && (e.data[e.t - 1] += t.am(r, t.data[r], e, 2 * r, 0, 1)), e.s = 0, e.clamp()
        }, a.prototype.divRemTo = function (e, t, r) {
            var i = e.abs();
            if (!(i.t <= 0)) {
                var n = this.abs();
                if (n.t < i.t) return null != t && t.fromInt(0), void (null != r && this.copyTo(r));
                null == r && (r = s());
                var o = s(), c = this.s, f = e.s, d = this.DB - g(i.data[i.t - 1]);
                d > 0 ? (i.lShiftTo(d, o), n.lShiftTo(d, r)) : (i.copyTo(o), n.copyTo(r));
                var u = o.t, l = o.data[u - 1];
                if (0 != l) {
                    var h = l * (1 << this.F1) + (u > 1 ? o.data[u - 2] >> this.F2 : 0), p = this.FV / h,
                        y = (1 << this.F1) / h, m = 1 << this.F2, v = r.t, b = v - u, w = null == t ? s() : t;
                    for (o.dlShiftTo(b, w), r.compareTo(w) >= 0 && (r.data[r.t++] = 1, r.subTo(w, r)), a.ONE.dlShiftTo(u, w), w.subTo(o, o); o.t < u;) o.data[o.t++] = 0;
                    for (; --b >= 0;) {
                        var E = r.data[--v] == l ? this.DM : Math.floor(r.data[v] * p + (r.data[v - 1] + m) * y);
                        if ((r.data[v] += o.am(0, E, r, b, 0, u)) < E) for (o.dlShiftTo(b, w), r.subTo(w, r); r.data[v] < --E;) r.subTo(w, r)
                    }
                    null != t && (r.drShiftTo(u, t), c != f && a.ZERO.subTo(t, t)), r.t = u, r.clamp(), d > 0 && r.rShiftTo(d, r), c < 0 && a.ZERO.subTo(r, r)
                }
            }
        }, a.prototype.invDigit = function () {
            if (this.t < 1) return 0;
            var e = this.data[0];
            if (0 == (1 & e)) return 0;
            var t = 3 & e;
            return (t = (t = (t = (t = t * (2 - (15 & e) * t) & 15) * (2 - (255 & e) * t) & 255) * (2 - ((65535 & e) * t & 65535)) & 65535) * (2 - e * t % this.DV) % this.DV) > 0 ? this.DV - t : -t
        }, a.prototype.isEven = function () {
            return 0 == (this.t > 0 ? 1 & this.data[0] : this.s)
        }, a.prototype.exp = function (e, t) {
            if (e > 4294967295 || e < 1) return a.ONE;
            var r = s(), i = s(), n = t.convert(this), o = g(e) - 1;
            for (n.copyTo(r); --o >= 0;) if (t.sqrTo(r, i), (e & 1 << o) > 0) t.mulTo(i, n, r); else {
                var c = r;
                r = i, i = c
            }
            return t.revert(r)
        }, a.prototype.toString = function (e) {
            if (this.s < 0) return "-" + this.negate().toString(e);
            var t;
            if (16 == e) t = 4; else if (8 == e) t = 3; else if (2 == e) t = 1; else if (32 == e) t = 5; else {
                if (4 != e) return this.toRadix(e);
                t = 2
            }
            var r, i = (1 << t) - 1, n = !1, a = "", s = this.t, o = this.DB - s * this.DB % t;
            if (s-- > 0) for (o < this.DB && (r = this.data[s] >> o) > 0 && (n = !0, a = l(r)); s >= 0;) o < t ? (r = (this.data[s] & (1 << o) - 1) << t - o, r |= this.data[--s] >> (o += this.DB - t)) : (r = this.data[s] >> (o -= t) & i, o <= 0 && (o += this.DB, --s)), r > 0 && (n = !0), n && (a += l(r));
            return n ? a : "0"
        }, a.prototype.negate = function () {
            var e = s();
            return a.ZERO.subTo(this, e), e
        }, a.prototype.abs = function () {
            return this.s < 0 ? this.negate() : this
        }, a.prototype.compareTo = function (e) {
            var t = this.s - e.s;
            if (0 != t) return t;
            var r = this.t;
            if (0 != (t = r - e.t)) return this.s < 0 ? -t : t;
            for (; --r >= 0;) if (0 != (t = this.data[r] - e.data[r])) return t;
            return 0
        }, a.prototype.bitLength = function () {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + g(this.data[this.t - 1] ^ this.s & this.DM)
        }, a.prototype.mod = function (e) {
            var t = s();
            return this.abs().divRemTo(e, null, t), this.s < 0 && t.compareTo(a.ZERO) > 0 && e.subTo(t, t), t
        }, a.prototype.modPowInt = function (e, t) {
            var r;
            return r = e < 256 || t.isEven() ? new y(t) : new m(t), this.exp(e, r)
        }, a.ZERO = p(0), a.ONE = p(1), I.prototype.convert = A, I.prototype.revert = A, I.prototype.mulTo = function (e, t, r) {
            e.multiplyTo(t, r)
        }, I.prototype.sqrTo = function (e, t) {
            e.squareTo(t)
        }, _.prototype.convert = function (e) {
            if (e.s < 0 || e.t > 2 * this.m.t) return e.mod(this.m);
            if (e.compareTo(this.m) < 0) return e;
            var t = s();
            return e.copyTo(t), this.reduce(t), t
        }, _.prototype.revert = function (e) {
            return e
        }, _.prototype.reduce = function (e) {
            for (e.drShiftTo(this.m.t - 1, this.r2), e.t > this.m.t + 1 && (e.t = this.m.t + 1, e.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0;) e.dAddOffset(1, this.m.t + 1);
            for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0;) e.subTo(this.m, e)
        }, _.prototype.mulTo = function (e, t, r) {
            e.multiplyTo(t, r), this.reduce(r)
        }, _.prototype.sqrTo = function (e, t) {
            e.squareTo(t), this.reduce(t)
        };
        var T = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509],
            B = (1 << 26) / T[T.length - 1];
        a.prototype.chunkSize = function (e) {
            return Math.floor(Math.LN2 * this.DB / Math.log(e))
        }, a.prototype.toRadix = function (e) {
            if (null == e && (e = 10), 0 == this.signum() || e < 2 || e > 36) return "0";
            var t = this.chunkSize(e), r = Math.pow(e, t), i = p(r), n = s(), a = s(), o = "";
            for (this.divRemTo(i, n, a); n.signum() > 0;) o = (r + a.intValue()).toString(e).substr(1) + o, n.divRemTo(i, n, a);
            return a.intValue().toString(e) + o
        }, a.prototype.fromRadix = function (e, t) {
            this.fromInt(0), null == t && (t = 10);
            for (var r = this.chunkSize(t), i = Math.pow(t, r), n = !1, s = 0, o = 0, c = 0; c < e.length; ++c) {
                var f = h(e, c);
                f < 0 ? "-" == e.charAt(c) && 0 == this.signum() && (n = !0) : (o = t * o + f, ++s >= r && (this.dMultiply(i), this.dAddOffset(o, 0), s = 0, o = 0))
            }
            s > 0 && (this.dMultiply(Math.pow(t, s)), this.dAddOffset(o, 0)), n && a.ZERO.subTo(this, this)
        }, a.prototype.fromNumber = function (e, t, r) {
            if ("number" == typeof t) if (e < 2) this.fromInt(1); else for (this.fromNumber(e, r), this.testBit(e - 1) || this.bitwiseTo(a.ONE.shiftLeft(e - 1), b, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t);) this.dAddOffset(2, 0), this.bitLength() > e && this.subTo(a.ONE.shiftLeft(e - 1), this); else {
                var i = new Array, n = 7 & e;
                i.length = 1 + (e >> 3), t.nextBytes(i), n > 0 ? i[0] &= (1 << n) - 1 : i[0] = 0, this.fromString(i, 256)
            }
        }, a.prototype.bitwiseTo = function (e, t, r) {
            var i, n, a = Math.min(e.t, this.t);
            for (i = 0; i < a; ++i) r.data[i] = t(this.data[i], e.data[i]);
            if (e.t < this.t) {
                for (n = e.s & this.DM, i = a; i < this.t; ++i) r.data[i] = t(this.data[i], n);
                r.t = this.t
            } else {
                for (n = this.s & this.DM, i = a; i < e.t; ++i) r.data[i] = t(n, e.data[i]);
                r.t = e.t
            }
            r.s = t(this.s, e.s), r.clamp()
        }, a.prototype.changeBit = function (e, t) {
            var r = a.ONE.shiftLeft(e);
            return this.bitwiseTo(r, t, r), r
        }, a.prototype.addTo = function (e, t) {
            for (var r = 0, i = 0, n = Math.min(e.t, this.t); r < n;) i += this.data[r] + e.data[r], t.data[r++] = i & this.DM, i >>= this.DB;
            if (e.t < this.t) {
                for (i += e.s; r < this.t;) i += this.data[r], t.data[r++] = i & this.DM, i >>= this.DB;
                i += this.s
            } else {
                for (i += this.s; r < e.t;) i += e.data[r], t.data[r++] = i & this.DM, i >>= this.DB;
                i += e.s
            }
            t.s = i < 0 ? -1 : 0, i > 0 ? t.data[r++] = i : i < -1 && (t.data[r++] = this.DV + i), t.t = r, t.clamp()
        }, a.prototype.dMultiply = function (e) {
            this.data[this.t] = this.am(0, e - 1, this, 0, 0, this.t), ++this.t, this.clamp()
        }, a.prototype.dAddOffset = function (e, t) {
            if (0 != e) {
                for (; this.t <= t;) this.data[this.t++] = 0;
                for (this.data[t] += e; this.data[t] >= this.DV;) this.data[t] -= this.DV, ++t >= this.t && (this.data[this.t++] = 0), ++this.data[t]
            }
        }, a.prototype.multiplyLowerTo = function (e, t, r) {
            var i, n = Math.min(this.t + e.t, t);
            for (r.s = 0, r.t = n; n > 0;) r.data[--n] = 0;
            for (i = r.t - this.t; n < i; ++n) r.data[n + this.t] = this.am(0, e.data[n], r, n, 0, this.t);
            for (i = Math.min(e.t, t); n < i; ++n) this.am(0, e.data[n], r, n, 0, t - n);
            r.clamp()
        }, a.prototype.multiplyUpperTo = function (e, t, r) {
            --t;
            var i = r.t = this.t + e.t - t;
            for (r.s = 0; --i >= 0;) r.data[i] = 0;
            for (i = Math.max(t - this.t, 0); i < e.t; ++i) r.data[this.t + i - t] = this.am(t - i, e.data[i], r, 0, 0, this.t + i - t);
            r.clamp(), r.drShiftTo(1, r)
        }, a.prototype.modInt = function (e) {
            if (e <= 0) return 0;
            var t = this.DV % e, r = this.s < 0 ? e - 1 : 0;
            if (this.t > 0) if (0 == t) r = this.data[0] % e; else for (var i = this.t - 1; i >= 0; --i) r = (t * r + this.data[i]) % e;
            return r
        }, a.prototype.millerRabin = function (e) {
            var t = this.subtract(a.ONE), r = t.getLowestSetBit();
            if (r <= 0) return !1;
            for (var i, n = t.shiftRight(r), s = {
                nextBytes: function (e) {
                    for (var t = 0; t < e.length; ++t) e[t] = Math.floor(256 * Math.random())
                }
            }, o = 0; o < e; ++o) {
                do {
                    i = new a(this.bitLength(), s)
                } while (i.compareTo(a.ONE) <= 0 || i.compareTo(t) >= 0);
                var c = i.modPow(n, this);
                if (0 != c.compareTo(a.ONE) && 0 != c.compareTo(t)) {
                    for (var f = 1; f++ < r && 0 != c.compareTo(t);) if (0 == (c = c.modPowInt(2, this)).compareTo(a.ONE)) return !1;
                    if (0 != c.compareTo(t)) return !1
                }
            }
            return !0
        }, a.prototype.clone = function () {
            var e = s();
            return this.copyTo(e), e
        }, a.prototype.intValue = function () {
            if (this.s < 0) {
                if (1 == this.t) return this.data[0] - this.DV;
                if (0 == this.t) return -1
            } else {
                if (1 == this.t) return this.data[0];
                if (0 == this.t) return 0
            }
            return (this.data[1] & (1 << 32 - this.DB) - 1) << this.DB | this.data[0]
        }, a.prototype.byteValue = function () {
            return 0 == this.t ? this.s : this.data[0] << 24 >> 24
        }, a.prototype.shortValue = function () {
            return 0 == this.t ? this.s : this.data[0] << 16 >> 16
        }, a.prototype.signum = function () {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this.data[0] <= 0 ? 0 : 1
        }, a.prototype.toByteArray = function () {
            var e = this.t, t = new Array;
            t[0] = this.s;
            var r, i = this.DB - e * this.DB % 8, n = 0;
            if (e-- > 0) for (i < this.DB && (r = this.data[e] >> i) != (this.s & this.DM) >> i && (t[n++] = r | this.s << this.DB - i); e >= 0;) i < 8 ? (r = (this.data[e] & (1 << i) - 1) << 8 - i, r |= this.data[--e] >> (i += this.DB - 8)) : (r = this.data[e] >> (i -= 8) & 255, i <= 0 && (i += this.DB, --e)), 0 != (128 & r) && (r |= -256), 0 == n && (128 & this.s) != (128 & r) && ++n, (n > 0 || r != this.s) && (t[n++] = r);
            return t
        }, a.prototype.equals = function (e) {
            return 0 == this.compareTo(e)
        }, a.prototype.min = function (e) {
            return this.compareTo(e) < 0 ? this : e
        }, a.prototype.max = function (e) {
            return this.compareTo(e) > 0 ? this : e
        }, a.prototype.and = function (e) {
            var t = s();
            return this.bitwiseTo(e, v, t), t
        }, a.prototype.or = function (e) {
            var t = s();
            return this.bitwiseTo(e, b, t), t
        }, a.prototype.xor = function (e) {
            var t = s();
            return this.bitwiseTo(e, w, t), t
        }, a.prototype.andNot = function (e) {
            var t = s();
            return this.bitwiseTo(e, E, t), t
        }, a.prototype.not = function () {
            for (var e = s(), t = 0; t < this.t; ++t) e.data[t] = this.DM & ~this.data[t];
            return e.t = this.t, e.s = ~this.s, e
        }, a.prototype.shiftLeft = function (e) {
            var t = s();
            return e < 0 ? this.rShiftTo(-e, t) : this.lShiftTo(e, t), t
        }, a.prototype.shiftRight = function (e) {
            var t = s();
            return e < 0 ? this.lShiftTo(-e, t) : this.rShiftTo(e, t), t
        }, a.prototype.getLowestSetBit = function () {
            for (var e = 0; e < this.t; ++e) if (0 != this.data[e]) return e * this.DB + C(this.data[e]);
            return this.s < 0 ? this.t * this.DB : -1
        }, a.prototype.bitCount = function () {
            for (var e = 0, t = this.s & this.DM, r = 0; r < this.t; ++r) e += S(this.data[r] ^ t);
            return e
        }, a.prototype.testBit = function (e) {
            var t = Math.floor(e / this.DB);
            return t >= this.t ? 0 != this.s : 0 != (this.data[t] & 1 << e % this.DB)
        }, a.prototype.setBit = function (e) {
            return this.changeBit(e, b)
        }, a.prototype.clearBit = function (e) {
            return this.changeBit(e, E)
        }, a.prototype.flipBit = function (e) {
            return this.changeBit(e, w)
        }, a.prototype.add = function (e) {
            var t = s();
            return this.addTo(e, t), t
        }, a.prototype.subtract = function (e) {
            var t = s();
            return this.subTo(e, t), t
        }, a.prototype.multiply = function (e) {
            var t = s();
            return this.multiplyTo(e, t), t
        }, a.prototype.divide = function (e) {
            var t = s();
            return this.divRemTo(e, t, null), t
        }, a.prototype.remainder = function (e) {
            var t = s();
            return this.divRemTo(e, null, t), t
        }, a.prototype.divideAndRemainder = function (e) {
            var t = s(), r = s();
            return this.divRemTo(e, t, r), new Array(t, r)
        }, a.prototype.modPow = function (e, t) {
            var r, i, n = e.bitLength(), a = p(1);
            if (n <= 0) return a;
            r = n < 18 ? 1 : n < 48 ? 3 : n < 144 ? 4 : n < 768 ? 5 : 6, i = n < 8 ? new y(t) : t.isEven() ? new _(t) : new m(t);
            var o = new Array, c = 3, f = r - 1, d = (1 << r) - 1;
            if (o[1] = i.convert(this), r > 1) {
                var u = s();
                for (i.sqrTo(o[1], u); c <= d;) o[c] = s(), i.mulTo(u, o[c - 2], o[c]), c += 2
            }
            var l, h, v = e.t - 1, b = !0, w = s();
            for (n = g(e.data[v]) - 1; v >= 0;) {
                for (n >= f ? l = e.data[v] >> n - f & d : (l = (e.data[v] & (1 << n + 1) - 1) << f - n, v > 0 && (l |= e.data[v - 1] >> this.DB + n - f)), c = r; 0 == (1 & l);) l >>= 1, --c;
                if ((n -= c) < 0 && (n += this.DB, --v), b) o[l].copyTo(a), b = !1; else {
                    for (; c > 1;) i.sqrTo(a, w), i.sqrTo(w, a), c -= 2;
                    c > 0 ? i.sqrTo(a, w) : (h = a, a = w, w = h), i.mulTo(w, o[l], a)
                }
                for (; v >= 0 && 0 == (e.data[v] & 1 << n);) i.sqrTo(a, w), h = a, a = w, w = h, --n < 0 && (n = this.DB - 1, --v)
            }
            return i.revert(a)
        }, a.prototype.modInverse = function (e) {
            var t = e.isEven();
            if (this.isEven() && t || 0 == e.signum()) return a.ZERO;
            for (var r = e.clone(), i = this.clone(), n = p(1), s = p(0), o = p(0), c = p(1); 0 != r.signum();) {
                for (; r.isEven();) r.rShiftTo(1, r), t ? (n.isEven() && s.isEven() || (n.addTo(this, n), s.subTo(e, s)), n.rShiftTo(1, n)) : s.isEven() || s.subTo(e, s), s.rShiftTo(1, s);
                for (; i.isEven();) i.rShiftTo(1, i), t ? (o.isEven() && c.isEven() || (o.addTo(this, o), c.subTo(e, c)), o.rShiftTo(1, o)) : c.isEven() || c.subTo(e, c), c.rShiftTo(1, c);
                r.compareTo(i) >= 0 ? (r.subTo(i, r), t && n.subTo(o, n), s.subTo(c, s)) : (i.subTo(r, i), t && o.subTo(n, o), c.subTo(s, c))
            }
            return 0 != i.compareTo(a.ONE) ? a.ZERO : c.compareTo(e) >= 0 ? c.subtract(e) : c.signum() < 0 ? (c.addTo(e, c), c.signum() < 0 ? c.add(e) : c) : c
        }, a.prototype.pow = function (e) {
            return this.exp(e, new I)
        }, a.prototype.gcd = function (e) {
            var t = this.s < 0 ? this.negate() : this.clone(), r = e.s < 0 ? e.negate() : e.clone();
            if (t.compareTo(r) < 0) {
                var i = t;
                t = r, r = i
            }
            var n = t.getLowestSetBit(), a = r.getLowestSetBit();
            if (a < 0) return t;
            for (n < a && (a = n), a > 0 && (t.rShiftTo(a, t), r.rShiftTo(a, r)); t.signum() > 0;) (n = t.getLowestSetBit()) > 0 && t.rShiftTo(n, t), (n = r.getLowestSetBit()) > 0 && r.rShiftTo(n, r), t.compareTo(r) >= 0 ? (t.subTo(r, t), t.rShiftTo(1, t)) : (r.subTo(t, r), r.rShiftTo(1, r));
            return a > 0 && r.lShiftTo(a, r), r
        }, a.prototype.isProbablePrime = function (e) {
            var t, r = this.abs();
            if (1 == r.t && r.data[0] <= T[T.length - 1]) {
                for (t = 0; t < T.length; ++t) if (r.data[0] == T[t]) return !0;
                return !1
            }
            if (r.isEven()) return !1;
            for (t = 1; t < T.length;) {
                for (var i = T[t], n = t + 1; n < T.length && i < B;) i *= T[n++];
                for (i = r.modInt(i); t < n;) if (i % T[t++] == 0) return !1
            }
            return r.millerRabin(e)
        }
    }, 96366: (e, t, r) => {
        var i = r(3832);
        r(97116), r(49563), r(15764), e.exports = i.kem = i.kem || {};
        var n = i.jsbn.BigInteger;

        function a(e, t, r, n) {
            e.generate = function (e, a) {
                for (var s = new i.util.ByteBuffer, o = Math.ceil(a / n) + r, c = new i.util.ByteBuffer, f = r; f < o; ++f) {
                    c.putInt32(f), t.start(), t.update(e + c.getBytes());
                    var d = t.digest();
                    s.putBytes(d.getBytes(n))
                }
                return s.truncate(s.length() - a), s.getBytes()
            }
        }

        i.kem.rsa = {}, i.kem.rsa.create = function (e, t) {
            var r = (t = t || {}).prng || i.random, a = {
                encrypt: function (t, a) {
                    var s, o = Math.ceil(t.n.bitLength() / 8);
                    do {
                        s = new n(i.util.bytesToHex(r.getBytesSync(o)), 16).mod(t.n)
                    } while (s.compareTo(n.ONE) <= 0);
                    var c = o - (s = i.util.hexToBytes(s.toString(16))).length;
                    return c > 0 && (s = i.util.fillString(String.fromCharCode(0), c) + s), {
                        encapsulation: t.encrypt(s, "NONE"),
                        key: e.generate(s, a)
                    }
                }, decrypt: function (t, r, i) {
                    var n = t.decrypt(r, "NONE");
                    return e.generate(n, i)
                }
            };
            return a
        }, i.kem.kdf1 = function (e, t) {
            a(this, e, 0, t || e.digestLength)
        }, i.kem.kdf2 = function (e, t) {
            a(this, e, 1, t || e.digestLength)
        }
    }, 84145: (e, t, r) => {
        var i = r(3832);
        r(97116), e.exports = i.log = i.log || {}, i.log.levels = ["none", "error", "warning", "info", "debug", "verbose", "max"];
        var n = {}, a = [], s = null;
        i.log.LEVEL_LOCKED = 2, i.log.NO_LEVEL_CHECK = 4, i.log.INTERPOLATE = 8;
        for (var o = 0; o < i.log.levels.length; ++o) {
            var c = i.log.levels[o];
            n[c] = {index: o, name: c.toUpperCase()}
        }
        i.log.logMessage = function (e) {
            for (var t = n[e.level].index, r = 0; r < a.length; ++r) {
                var s = a[r];
                if (s.flags & i.log.NO_LEVEL_CHECK) s.f(e); else t <= n[s.level].index && s.f(s, e)
            }
        }, i.log.prepareStandard = function (e) {
            "standard" in e || (e.standard = n[e.level].name + " [" + e.category + "] " + e.message)
        }, i.log.prepareFull = function (e) {
            if (!("full" in e)) {
                var t = [e.message];
                t = t.concat([] || 0), e.full = i.util.format.apply(this, t)
            }
        }, i.log.prepareStandardFull = function (e) {
            "standardFull" in e || (i.log.prepareStandard(e), e.standardFull = e.standard)
        };
        var f = ["error", "warning", "info", "debug", "verbose"];
        for (o = 0; o < f.length; ++o) !function (e) {
            i.log[e] = function (t, r) {
                var n = Array.prototype.slice.call(arguments).slice(2),
                    a = {timestamp: new Date, level: e, category: t, message: r, arguments: n};
                i.log.logMessage(a)
            }
        }(f[o]);
        if (i.log.makeLogger = function (e) {
            var t = {flags: 0, f: e};
            return i.log.setLevel(t, "none"), t
        }, i.log.setLevel = function (e, t) {
            var r = !1;
            if (e && !(e.flags & i.log.LEVEL_LOCKED)) for (var n = 0; n < i.log.levels.length; ++n) {
                if (t == i.log.levels[n]) {
                    e.level = t, r = !0;
                    break
                }
            }
            return r
        }, i.log.lock = function (e, t) {
            void 0 === t || t ? e.flags |= i.log.LEVEL_LOCKED : e.flags &= ~i.log.LEVEL_LOCKED
        }, i.log.addLogger = function (e) {
            a.push(e)
        }, "undefined" != typeof console && "log" in console) {
            var d;
            if (console.error && console.warn && console.info && console.debug) {
                var u = {
                    error: console.error,
                    warning: console.warn,
                    info: console.info,
                    debug: console.debug,
                    verbose: console.debug
                }, l = function (e, t) {
                    i.log.prepareStandard(t);
                    var r = u[t.level], n = [t.standard];
                    n = n.concat(t.arguments.slice()), r.apply(console, n)
                };
                d = i.log.makeLogger(l)
            } else {
                l = function (e, t) {
                    i.log.prepareStandardFull(t)
                };
                d = i.log.makeLogger(l)
            }
            i.log.setLevel(d, "debug"), i.log.addLogger(d), s = d
        } else console = {
            log: function () {
            }
        };
        if (null !== s && "undefined" != typeof window && window.location) {
            var h = new URL(window.location.href).searchParams;
            if (h.has("console.level") && i.log.setLevel(s, h.get("console.level").slice(-1)[0]), h.has("console.lock")) "true" == h.get("console.lock").slice(-1)[0] && i.log.lock(s)
        }
        i.log.consoleLogger = s
    }, 43389: (e, t, r) => {
        e.exports = r(28991), r(25063), r(137), r(41668), r(63219)
    }, 28991: (e, t, r) => {
        var i = r(3832);
        e.exports = i.md = i.md || {}, i.md.algorithms = i.md.algorithms || {}
    }, 25063: (e, t, r) => {
        var i = r(3832);
        r(28991), r(97116);
        var n = e.exports = i.md5 = i.md5 || {};
        i.md.md5 = i.md.algorithms.md5 = n, n.create = function () {
            f || function () {
                a = String.fromCharCode(128), a += i.util.fillString(String.fromCharCode(0), 64), s = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 6, 11, 0, 5, 10, 15, 4, 9, 14, 3, 8, 13, 2, 7, 12, 5, 8, 11, 14, 1, 4, 7, 10, 13, 0, 3, 6, 9, 12, 15, 2, 0, 7, 14, 5, 12, 3, 10, 1, 8, 15, 6, 13, 4, 11, 2, 9], o = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], c = new Array(64);
                for (var e = 0; e < 64; ++e) c[e] = Math.floor(4294967296 * Math.abs(Math.sin(e + 1)));
                f = !0
            }();
            var e = null, t = i.util.createBuffer(), r = new Array(16), n = {
                algorithm: "md5",
                blockLength: 64,
                digestLength: 16,
                messageLength: 0,
                fullMessageLength: null,
                messageLengthSize: 8,
                start: function () {
                    n.messageLength = 0, n.fullMessageLength = n.messageLength64 = [];
                    for (var r = n.messageLengthSize / 4, a = 0; a < r; ++a) n.fullMessageLength.push(0);
                    return t = i.util.createBuffer(), e = {
                        h0: 1732584193,
                        h1: 4023233417,
                        h2: 2562383102,
                        h3: 271733878
                    }, n
                }
            };
            return n.start(), n.update = function (a, s) {
                "utf8" === s && (a = i.util.encodeUtf8(a));
                var o = a.length;
                n.messageLength += o, o = [o / 4294967296 >>> 0, o >>> 0];
                for (var c = n.fullMessageLength.length - 1; c >= 0; --c) n.fullMessageLength[c] += o[1], o[1] = o[0] + (n.fullMessageLength[c] / 4294967296 >>> 0), n.fullMessageLength[c] = n.fullMessageLength[c] >>> 0, o[0] = o[1] / 4294967296 >>> 0;
                return t.putBytes(a), d(e, r, t), (t.read > 2048 || 0 === t.length()) && t.compact(), n
            }, n.digest = function () {
                var s = i.util.createBuffer();
                s.putBytes(t.bytes());
                var o = n.fullMessageLength[n.fullMessageLength.length - 1] + n.messageLengthSize & n.blockLength - 1;
                s.putBytes(a.substr(0, n.blockLength - o));
                for (var c, f = 0, u = n.fullMessageLength.length - 1; u >= 0; --u) f = (c = 8 * n.fullMessageLength[u] + f) / 4294967296 >>> 0, s.putInt32Le(c >>> 0);
                var l = {h0: e.h0, h1: e.h1, h2: e.h2, h3: e.h3};
                d(l, r, s);
                var h = i.util.createBuffer();
                return h.putInt32Le(l.h0), h.putInt32Le(l.h1), h.putInt32Le(l.h2), h.putInt32Le(l.h3), h
            }, n
        };
        var a = null, s = null, o = null, c = null, f = !1;

        function d(e, t, r) {
            for (var i, n, a, f, d, u, l, h = r.length(); h >= 64;) {
                for (n = e.h0, a = e.h1, f = e.h2, d = e.h3, l = 0; l < 16; ++l) t[l] = r.getInt32Le(), i = n + (d ^ a & (f ^ d)) + c[l] + t[l], n = d, d = f, f = a, a += i << (u = o[l]) | i >>> 32 - u;
                for (; l < 32; ++l) i = n + (f ^ d & (a ^ f)) + c[l] + t[s[l]], n = d, d = f, f = a, a += i << (u = o[l]) | i >>> 32 - u;
                for (; l < 48; ++l) i = n + (a ^ f ^ d) + c[l] + t[s[l]], n = d, d = f, f = a, a += i << (u = o[l]) | i >>> 32 - u;
                for (; l < 64; ++l) i = n + (f ^ (a | ~d)) + c[l] + t[s[l]], n = d, d = f, f = a, a += i << (u = o[l]) | i >>> 32 - u;
                e.h0 = e.h0 + n | 0, e.h1 = e.h1 + a | 0, e.h2 = e.h2 + f | 0, e.h3 = e.h3 + d | 0, h -= 64
            }
        }
    }, 86971: (e, t, r) => {
        var i = r(3832);
        r(83453), e.exports = i.mgf = i.mgf || {}, i.mgf.mgf1 = i.mgf1
    }, 83453: (e, t, r) => {
        var i = r(3832);
        r(97116), i.mgf = i.mgf || {}, (e.exports = i.mgf.mgf1 = i.mgf1 = i.mgf1 || {}).create = function (e) {
            return {
                generate: function (t, r) {
                    for (var n = new i.util.ByteBuffer, a = Math.ceil(r / e.digestLength), s = 0; s < a; s++) {
                        var o = new i.util.ByteBuffer;
                        o.putInt32(s), e.start(), e.update(t + o.getBytes()), n.putBuffer(e.digest())
                    }
                    return n.truncate(n.length() - r), n.getBytes()
                }
            }
        }
    }, 66270: (e, t, r) => {
        var i = r(3832);
        i.pki = i.pki || {};
        var n = e.exports = i.pki.oids = i.oids = i.oids || {};

        function a(e, t) {
            n[e] = t, n[t] = e
        }

        function s(e, t) {
            n[e] = t
        }

        a("1.2.840.113549.1.1.1", "rsaEncryption"), a("1.2.840.113549.1.1.4", "md5WithRSAEncryption"), a("1.2.840.113549.1.1.5", "sha1WithRSAEncryption"), a("1.2.840.113549.1.1.7", "RSAES-OAEP"), a("1.2.840.113549.1.1.8", "mgf1"), a("1.2.840.113549.1.1.9", "pSpecified"), a("1.2.840.113549.1.1.10", "RSASSA-PSS"), a("1.2.840.113549.1.1.11", "sha256WithRSAEncryption"), a("1.2.840.113549.1.1.12", "sha384WithRSAEncryption"), a("1.2.840.113549.1.1.13", "sha512WithRSAEncryption"), a("1.3.101.112", "EdDSA25519"), a("1.2.840.10040.4.3", "dsa-with-sha1"), a("1.3.14.3.2.7", "desCBC"), a("1.3.14.3.2.26", "sha1"), a("1.3.14.3.2.29", "sha1WithRSASignature"), a("2.16.840.1.101.3.4.2.1", "sha256"), a("2.16.840.1.101.3.4.2.2", "sha384"), a("2.16.840.1.101.3.4.2.3", "sha512"), a("2.16.840.1.101.3.4.2.4", "sha224"), a("2.16.840.1.101.3.4.2.5", "sha512-224"), a("2.16.840.1.101.3.4.2.6", "sha512-256"), a("1.2.840.113549.2.2", "md2"), a("1.2.840.113549.2.5", "md5"), a("1.2.840.113549.1.7.1", "data"), a("1.2.840.113549.1.7.2", "signedData"), a("1.2.840.113549.1.7.3", "envelopedData"), a("1.2.840.113549.1.7.4", "signedAndEnvelopedData"), a("1.2.840.113549.1.7.5", "digestedData"), a("1.2.840.113549.1.7.6", "encryptedData"), a("1.2.840.113549.1.9.1", "emailAddress"), a("1.2.840.113549.1.9.2", "unstructuredName"), a("1.2.840.113549.1.9.3", "contentType"), a("1.2.840.113549.1.9.4", "messageDigest"), a("1.2.840.113549.1.9.5", "signingTime"), a("1.2.840.113549.1.9.6", "counterSignature"), a("1.2.840.113549.1.9.7", "challengePassword"), a("1.2.840.113549.1.9.8", "unstructuredAddress"), a("1.2.840.113549.1.9.14", "extensionRequest"), a("1.2.840.113549.1.9.20", "friendlyName"), a("1.2.840.113549.1.9.21", "localKeyId"), a("1.2.840.113549.1.9.22.1", "x509Certificate"), a("1.2.840.113549.1.12.10.1.1", "keyBag"), a("1.2.840.113549.1.12.10.1.2", "pkcs8ShroudedKeyBag"), a("1.2.840.113549.1.12.10.1.3", "certBag"), a("1.2.840.113549.1.12.10.1.4", "crlBag"), a("1.2.840.113549.1.12.10.1.5", "secretBag"), a("1.2.840.113549.1.12.10.1.6", "safeContentsBag"), a("1.2.840.113549.1.5.13", "pkcs5PBES2"), a("1.2.840.113549.1.5.12", "pkcs5PBKDF2"), a("1.2.840.113549.1.12.1.1", "pbeWithSHAAnd128BitRC4"), a("1.2.840.113549.1.12.1.2", "pbeWithSHAAnd40BitRC4"), a("1.2.840.113549.1.12.1.3", "pbeWithSHAAnd3-KeyTripleDES-CBC"), a("1.2.840.113549.1.12.1.4", "pbeWithSHAAnd2-KeyTripleDES-CBC"), a("1.2.840.113549.1.12.1.5", "pbeWithSHAAnd128BitRC2-CBC"), a("1.2.840.113549.1.12.1.6", "pbewithSHAAnd40BitRC2-CBC"), a("1.2.840.113549.2.7", "hmacWithSHA1"), a("1.2.840.113549.2.8", "hmacWithSHA224"), a("1.2.840.113549.2.9", "hmacWithSHA256"), a("1.2.840.113549.2.10", "hmacWithSHA384"), a("1.2.840.113549.2.11", "hmacWithSHA512"), a("1.2.840.113549.3.7", "des-EDE3-CBC"), a("2.16.840.1.101.3.4.1.2", "aes128-CBC"), a("2.16.840.1.101.3.4.1.22", "aes192-CBC"), a("2.16.840.1.101.3.4.1.42", "aes256-CBC"), a("2.5.4.3", "commonName"), a("2.5.4.4", "surname"), a("2.5.4.5", "serialNumber"), a("2.5.4.6", "countryName"), a("2.5.4.7", "localityName"), a("2.5.4.8", "stateOrProvinceName"), a("2.5.4.9", "streetAddress"), a("2.5.4.10", "organizationName"), a("2.5.4.11", "organizationalUnitName"), a("2.5.4.12", "title"), a("2.5.4.13", "description"), a("2.5.4.15", "businessCategory"), a("2.5.4.17", "postalCode"), a("2.5.4.42", "givenName"), a("1.3.6.1.4.1.311.60.2.1.2", "jurisdictionOfIncorporationStateOrProvinceName"), a("1.3.6.1.4.1.311.60.2.1.3", "jurisdictionOfIncorporationCountryName"), a("2.16.840.1.113730.1.1", "nsCertType"), a("2.16.840.1.113730.1.13", "nsComment"), s("2.5.29.1", "authorityKeyIdentifier"), s("2.5.29.2", "keyAttributes"), s("2.5.29.3", "certificatePolicies"), s("2.5.29.4", "keyUsageRestriction"), s("2.5.29.5", "policyMapping"), s("2.5.29.6", "subtreesConstraint"), s("2.5.29.7", "subjectAltName"), s("2.5.29.8", "issuerAltName"), s("2.5.29.9", "subjectDirectoryAttributes"), s("2.5.29.10", "basicConstraints"), s("2.5.29.11", "nameConstraints"), s("2.5.29.12", "policyConstraints"), s("2.5.29.13", "basicConstraints"), a("2.5.29.14", "subjectKeyIdentifier"), a("2.5.29.15", "keyUsage"), s("2.5.29.16", "privateKeyUsagePeriod"), a("2.5.29.17", "subjectAltName"), a("2.5.29.18", "issuerAltName"), a("2.5.29.19", "basicConstraints"),s("2.5.29.20", "cRLNumber"),s("2.5.29.21", "cRLReason"),s("2.5.29.22", "expirationDate"),s("2.5.29.23", "instructionCode"),s("2.5.29.24", "invalidityDate"),s("2.5.29.25", "cRLDistributionPoints"),s("2.5.29.26", "issuingDistributionPoint"),s("2.5.29.27", "deltaCRLIndicator"),s("2.5.29.28", "issuingDistributionPoint"),s("2.5.29.29", "certificateIssuer"),s("2.5.29.30", "nameConstraints"),a("2.5.29.31", "cRLDistributionPoints"),a("2.5.29.32", "certificatePolicies"),s("2.5.29.33", "policyMappings"),s("2.5.29.34", "policyConstraints"),a("2.5.29.35", "authorityKeyIdentifier"),s("2.5.29.36", "policyConstraints"),a("2.5.29.37", "extKeyUsage"),s("2.5.29.46", "freshestCRL"),s("2.5.29.54", "inhibitAnyPolicy"),a("1.3.6.1.4.1.11129.2.4.2", "timestampList"),a("1.3.6.1.5.5.7.1.1", "authorityInfoAccess"),a("1.3.6.1.5.5.7.3.1", "serverAuth"),a("1.3.6.1.5.5.7.3.2", "clientAuth"),a("1.3.6.1.5.5.7.3.3", "codeSigning"),a("1.3.6.1.5.5.7.3.4", "emailProtection"),a("1.3.6.1.5.5.7.3.8", "timeStamping")
    }, 97450: (e, t, r) => {
        var i = r(3832);
        if (r(8925), r(3068), r(33480), r(28991), r(66270), r(98960), r(26953), r(49563), r(69372), r(28095), r(97116), void 0 === n) var n = i.jsbn.BigInteger;
        var a = i.asn1, s = i.pki = i.pki || {};
        e.exports = s.pbe = i.pbe = i.pbe || {};
        var o = s.oids, c = {
            name: "EncryptedPrivateKeyInfo",
            tagClass: a.Class.UNIVERSAL,
            type: a.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedPrivateKeyInfo.encryptionAlgorithm",
                tagClass: a.Class.UNIVERSAL,
                type: a.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: a.Class.UNIVERSAL,
                    type: a.Type.OID,
                    constructed: !1,
                    capture: "encryptionOid"
                }, {
                    name: "AlgorithmIdentifier.parameters",
                    tagClass: a.Class.UNIVERSAL,
                    type: a.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "encryptionParams"
                }]
            }, {
                name: "EncryptedPrivateKeyInfo.encryptedData",
                tagClass: a.Class.UNIVERSAL,
                type: a.Type.OCTETSTRING,
                constructed: !1,
                capture: "encryptedData"
            }]
        }, f = {
            name: "PBES2Algorithms",
            tagClass: a.Class.UNIVERSAL,
            type: a.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PBES2Algorithms.keyDerivationFunc",
                tagClass: a.Class.UNIVERSAL,
                type: a.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PBES2Algorithms.keyDerivationFunc.oid",
                    tagClass: a.Class.UNIVERSAL,
                    type: a.Type.OID,
                    constructed: !1,
                    capture: "kdfOid"
                }, {
                    name: "PBES2Algorithms.params",
                    tagClass: a.Class.UNIVERSAL,
                    type: a.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "PBES2Algorithms.params.salt",
                        tagClass: a.Class.UNIVERSAL,
                        type: a.Type.OCTETSTRING,
                        constructed: !1,
                        capture: "kdfSalt"
                    }, {
                        name: "PBES2Algorithms.params.iterationCount",
                        tagClass: a.Class.UNIVERSAL,
                        type: a.Type.INTEGER,
                        constructed: !1,
                        capture: "kdfIterationCount"
                    }, {
                        name: "PBES2Algorithms.params.keyLength",
                        tagClass: a.Class.UNIVERSAL,
                        type: a.Type.INTEGER,
                        constructed: !1,
                        optional: !0,
                        capture: "keyLength"
                    }, {
                        name: "PBES2Algorithms.params.prf",
                        tagClass: a.Class.UNIVERSAL,
                        type: a.Type.SEQUENCE,
                        constructed: !0,
                        optional: !0,
                        value: [{
                            name: "PBES2Algorithms.params.prf.algorithm",
                            tagClass: a.Class.UNIVERSAL,
                            type: a.Type.OID,
                            constructed: !1,
                            capture: "prfOid"
                        }]
                    }]
                }]
            }, {
                name: "PBES2Algorithms.encryptionScheme",
                tagClass: a.Class.UNIVERSAL,
                type: a.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "PBES2Algorithms.encryptionScheme.oid",
                    tagClass: a.Class.UNIVERSAL,
                    type: a.Type.OID,
                    constructed: !1,
                    capture: "encOid"
                }, {
                    name: "PBES2Algorithms.encryptionScheme.iv",
                    tagClass: a.Class.UNIVERSAL,
                    type: a.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "encIv"
                }]
            }]
        }, d = {
            name: "pkcs-12PbeParams",
            tagClass: a.Class.UNIVERSAL,
            type: a.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "pkcs-12PbeParams.salt",
                tagClass: a.Class.UNIVERSAL,
                type: a.Type.OCTETSTRING,
                constructed: !1,
                capture: "salt"
            }, {
                name: "pkcs-12PbeParams.iterations",
                tagClass: a.Class.UNIVERSAL,
                type: a.Type.INTEGER,
                constructed: !1,
                capture: "iterations"
            }]
        };

        function u(e, t) {
            return e.start().update(t).digest().getBytes()
        }

        function l(e) {
            var t;
            if (e) {
                if (!(t = s.oids[a.derToOid(e)])) {
                    var r = new Error("Unsupported PRF OID.");
                    throw r.oid = e, r.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"], r
                }
            } else t = "hmacWithSHA1";
            return h(t)
        }

        function h(e) {
            var t = i.md;
            switch (e) {
                case"hmacWithSHA224":
                    t = i.md.sha512;
                case"hmacWithSHA1":
                case"hmacWithSHA256":
                case"hmacWithSHA384":
                case"hmacWithSHA512":
                    e = e.substr(8).toLowerCase();
                    break;
                default:
                    var r = new Error("Unsupported PRF algorithm.");
                    throw r.algorithm = e, r.supported = ["hmacWithSHA1", "hmacWithSHA224", "hmacWithSHA256", "hmacWithSHA384", "hmacWithSHA512"], r
            }
            if (!t || !(e in t)) throw new Error("Unknown hash algorithm: " + e);
            return t[e].create()
        }

        s.encryptPrivateKeyInfo = function (e, t, r) {
            (r = r || {}).saltSize = r.saltSize || 8, r.count = r.count || 2048, r.algorithm = r.algorithm || "aes128", r.prfAlgorithm = r.prfAlgorithm || "sha1";
            var n, c, f, d = i.random.getBytesSync(r.saltSize), u = r.count, l = a.integerToDer(u);
            if (0 === r.algorithm.indexOf("aes") || "des" === r.algorithm) {
                var p, g, y;
                switch (r.algorithm) {
                    case"aes128":
                        n = 16, p = 16, g = o["aes128-CBC"], y = i.aes.createEncryptionCipher;
                        break;
                    case"aes192":
                        n = 24, p = 16, g = o["aes192-CBC"], y = i.aes.createEncryptionCipher;
                        break;
                    case"aes256":
                        n = 32, p = 16, g = o["aes256-CBC"], y = i.aes.createEncryptionCipher;
                        break;
                    case"des":
                        n = 8, p = 8, g = o.desCBC, y = i.des.createEncryptionCipher;
                        break;
                    default:
                        throw(C = new Error("Cannot encrypt private key. Unknown encryption algorithm.")).algorithm = r.algorithm, C
                }
                var m = "hmacWith" + r.prfAlgorithm.toUpperCase(), v = h(m), b = i.pkcs5.pbkdf2(t, d, u, n, v),
                    w = i.random.getBytesSync(p);
                (S = y(b)).start(w), S.update(a.toDer(e)), S.finish(), f = S.output.getBytes();
                var E = function (e, t, r, n) {
                    var o = a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [a.create(a.Class.UNIVERSAL, a.Type.OCTETSTRING, !1, e), a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, t.getBytes())]);
                    "hmacWithSHA1" !== n && o.value.push(a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, i.util.hexToBytes(r.toString(16))), a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [a.create(a.Class.UNIVERSAL, a.Type.OID, !1, a.oidToDer(s.oids[n]).getBytes()), a.create(a.Class.UNIVERSAL, a.Type.NULL, !1, "")]));
                    return o
                }(d, l, n, m);
                c = a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [a.create(a.Class.UNIVERSAL, a.Type.OID, !1, a.oidToDer(o.pkcs5PBES2).getBytes()), a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [a.create(a.Class.UNIVERSAL, a.Type.OID, !1, a.oidToDer(o.pkcs5PBKDF2).getBytes()), E]), a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [a.create(a.Class.UNIVERSAL, a.Type.OID, !1, a.oidToDer(g).getBytes()), a.create(a.Class.UNIVERSAL, a.Type.OCTETSTRING, !1, w)])])])
            } else {
                var C;
                if ("3des" !== r.algorithm) throw(C = new Error("Cannot encrypt private key. Unknown encryption algorithm.")).algorithm = r.algorithm, C;
                n = 24;
                var S, I = new i.util.ByteBuffer(d);
                b = s.pbe.generatePkcs12Key(t, I, 1, u, n), w = s.pbe.generatePkcs12Key(t, I, 2, u, n);
                (S = i.des.createEncryptionCipher(b)).start(w), S.update(a.toDer(e)), S.finish(), f = S.output.getBytes(), c = a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [a.create(a.Class.UNIVERSAL, a.Type.OID, !1, a.oidToDer(o["pbeWithSHAAnd3-KeyTripleDES-CBC"]).getBytes()), a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [a.create(a.Class.UNIVERSAL, a.Type.OCTETSTRING, !1, d), a.create(a.Class.UNIVERSAL, a.Type.INTEGER, !1, l.getBytes())])])
            }
            return a.create(a.Class.UNIVERSAL, a.Type.SEQUENCE, !0, [c, a.create(a.Class.UNIVERSAL, a.Type.OCTETSTRING, !1, f)])
        }, s.decryptPrivateKeyInfo = function (e, t) {
            var r = null, n = {}, o = [];
            if (!a.validate(e, c, n, o)) {
                var f = new Error("Cannot read encrypted private key. ASN.1 object is not a supported EncryptedPrivateKeyInfo.");
                throw f.errors = o, f
            }
            var d = a.derToOid(n.encryptionOid), u = s.pbe.getCipher(d, n.encryptionParams, t),
                l = i.util.createBuffer(n.encryptedData);
            return u.update(l), u.finish() && (r = a.fromDer(u.output)), r
        }, s.encryptedPrivateKeyToPem = function (e, t) {
            var r = {type: "ENCRYPTED PRIVATE KEY", body: a.toDer(e).getBytes()};
            return i.pem.encode(r, {maxline: t})
        }, s.encryptedPrivateKeyFromPem = function (e) {
            var t = i.pem.decode(e)[0];
            if ("ENCRYPTED PRIVATE KEY" !== t.type) {
                var r = new Error('Could not convert encrypted private key from PEM; PEM header type is "ENCRYPTED PRIVATE KEY".');
                throw r.headerType = t.type, r
            }
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert encrypted private key from PEM; PEM is encrypted.");
            return a.fromDer(t.body)
        }, s.encryptRsaPrivateKey = function (e, t, r) {
            if (!(r = r || {}).legacy) {
                var n = s.wrapRsaPrivateKey(s.privateKeyToAsn1(e));
                return n = s.encryptPrivateKeyInfo(n, t, r), s.encryptedPrivateKeyToPem(n)
            }
            var o, c, f, d;
            switch (r.algorithm) {
                case"aes128":
                    o = "AES-128-CBC", f = 16, c = i.random.getBytesSync(16), d = i.aes.createEncryptionCipher;
                    break;
                case"aes192":
                    o = "AES-192-CBC", f = 24, c = i.random.getBytesSync(16), d = i.aes.createEncryptionCipher;
                    break;
                case"aes256":
                    o = "AES-256-CBC", f = 32, c = i.random.getBytesSync(16), d = i.aes.createEncryptionCipher;
                    break;
                case"3des":
                    o = "DES-EDE3-CBC", f = 24, c = i.random.getBytesSync(8), d = i.des.createEncryptionCipher;
                    break;
                case"des":
                    o = "DES-CBC", f = 8, c = i.random.getBytesSync(8), d = i.des.createEncryptionCipher;
                    break;
                default:
                    var u = new Error('Could not encrypt RSA private key; unsupported encryption algorithm "' + r.algorithm + '".');
                    throw u.algorithm = r.algorithm, u
            }
            var l = d(i.pbe.opensslDeriveBytes(t, c.substr(0, 8), f));
            l.start(c), l.update(a.toDer(s.privateKeyToAsn1(e))), l.finish();
            var h = {
                type: "RSA PRIVATE KEY",
                procType: {version: "4", type: "ENCRYPTED"},
                dekInfo: {algorithm: o, parameters: i.util.bytesToHex(c).toUpperCase()},
                body: l.output.getBytes()
            };
            return i.pem.encode(h)
        }, s.decryptRsaPrivateKey = function (e, t) {
            var r = null, n = i.pem.decode(e)[0];
            if ("ENCRYPTED PRIVATE KEY" !== n.type && "PRIVATE KEY" !== n.type && "RSA PRIVATE KEY" !== n.type) throw(f = new Error('Could not convert private key from PEM; PEM header type is not "ENCRYPTED PRIVATE KEY", "PRIVATE KEY", or "RSA PRIVATE KEY".')).headerType = f, f;
            if (n.procType && "ENCRYPTED" === n.procType.type) {
                var o, c;
                switch (n.dekInfo.algorithm) {
                    case"DES-CBC":
                        o = 8, c = i.des.createDecryptionCipher;
                        break;
                    case"DES-EDE3-CBC":
                        o = 24, c = i.des.createDecryptionCipher;
                        break;
                    case"AES-128-CBC":
                        o = 16, c = i.aes.createDecryptionCipher;
                        break;
                    case"AES-192-CBC":
                        o = 24, c = i.aes.createDecryptionCipher;
                        break;
                    case"AES-256-CBC":
                        o = 32, c = i.aes.createDecryptionCipher;
                        break;
                    case"RC2-40-CBC":
                        o = 5, c = function (e) {
                            return i.rc2.createDecryptionCipher(e, 40)
                        };
                        break;
                    case"RC2-64-CBC":
                        o = 8, c = function (e) {
                            return i.rc2.createDecryptionCipher(e, 64)
                        };
                        break;
                    case"RC2-128-CBC":
                        o = 16, c = function (e) {
                            return i.rc2.createDecryptionCipher(e, 128)
                        };
                        break;
                    default:
                        var f;
                        throw(f = new Error('Could not decrypt private key; unsupported encryption algorithm "' + n.dekInfo.algorithm + '".')).algorithm = n.dekInfo.algorithm, f
                }
                var d = i.util.hexToBytes(n.dekInfo.parameters), u = c(i.pbe.opensslDeriveBytes(t, d.substr(0, 8), o));
                if (u.start(d), u.update(i.util.createBuffer(n.body)), !u.finish()) return r;
                r = u.output.getBytes()
            } else r = n.body;
            return null !== (r = "ENCRYPTED PRIVATE KEY" === n.type ? s.decryptPrivateKeyInfo(a.fromDer(r), t) : a.fromDer(r)) && (r = s.privateKeyFromAsn1(r)), r
        }, s.pbe.generatePkcs12Key = function (e, t, r, n, a, s) {
            var o, c;
            if (null == s) {
                if (!("sha1" in i.md)) throw new Error('"sha1" hash algorithm unavailable.');
                s = i.md.sha1.create()
            }
            var f = s.digestLength, d = s.blockLength, u = new i.util.ByteBuffer, l = new i.util.ByteBuffer;
            if (null != e) {
                for (c = 0; c < e.length; c++) l.putInt16(e.charCodeAt(c));
                l.putInt16(0)
            }
            var h = l.length(), p = t.length(), g = new i.util.ByteBuffer;
            g.fillWithByte(r, d);
            var y = d * Math.ceil(p / d), m = new i.util.ByteBuffer;
            for (c = 0; c < y; c++) m.putByte(t.at(c % p));
            var v = d * Math.ceil(h / d), b = new i.util.ByteBuffer;
            for (c = 0; c < v; c++) b.putByte(l.at(c % h));
            var w = m;
            w.putBuffer(b);
            for (var E = Math.ceil(a / f), C = 1; C <= E; C++) {
                var S = new i.util.ByteBuffer;
                S.putBytes(g.bytes()), S.putBytes(w.bytes());
                for (var I = 0; I < n; I++) s.start(), s.update(S.getBytes()), S = s.digest();
                var A = new i.util.ByteBuffer;
                for (c = 0; c < d; c++) A.putByte(S.at(c % f));
                var _ = Math.ceil(p / d) + Math.ceil(h / d), T = new i.util.ByteBuffer;
                for (o = 0; o < _; o++) {
                    var B = new i.util.ByteBuffer(w.getBytes(d)), N = 511;
                    for (c = A.length() - 1; c >= 0; c--) N >>= 8, N += A.at(c) + B.at(c), B.setAt(c, 255 & N);
                    T.putBuffer(B)
                }
                w = T, u.putBuffer(S)
            }
            return u.truncate(u.length() - a), u
        }, s.pbe.getCipher = function (e, t, r) {
            switch (e) {
                case s.oids.pkcs5PBES2:
                    return s.pbe.getCipherForPBES2(e, t, r);
                case s.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
                case s.oids["pbewithSHAAnd40BitRC2-CBC"]:
                    return s.pbe.getCipherForPKCS12PBE(e, t, r);
                default:
                    var i = new Error("Cannot read encrypted PBE data block. Unsupported OID.");
                    throw i.oid = e, i.supportedOids = ["pkcs5PBES2", "pbeWithSHAAnd3-KeyTripleDES-CBC", "pbewithSHAAnd40BitRC2-CBC"], i
            }
        }, s.pbe.getCipherForPBES2 = function (e, t, r) {
            var n, o = {}, c = [];
            if (!a.validate(t, f, o, c)) throw(n = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.")).errors = c, n;
            if ((e = a.derToOid(o.kdfOid)) !== s.oids.pkcs5PBKDF2) throw(n = new Error("Cannot read encrypted private key. Unsupported key derivation function OID.")).oid = e, n.supportedOids = ["pkcs5PBKDF2"], n;
            if ((e = a.derToOid(o.encOid)) !== s.oids["aes128-CBC"] && e !== s.oids["aes192-CBC"] && e !== s.oids["aes256-CBC"] && e !== s.oids["des-EDE3-CBC"] && e !== s.oids.desCBC) throw(n = new Error("Cannot read encrypted private key. Unsupported encryption scheme OID.")).oid = e, n.supportedOids = ["aes128-CBC", "aes192-CBC", "aes256-CBC", "des-EDE3-CBC", "desCBC"], n;
            var d, u, h = o.kdfSalt, p = i.util.createBuffer(o.kdfIterationCount);
            switch (p = p.getInt(p.length() << 3), s.oids[e]) {
                case"aes128-CBC":
                    d = 16, u = i.aes.createDecryptionCipher;
                    break;
                case"aes192-CBC":
                    d = 24, u = i.aes.createDecryptionCipher;
                    break;
                case"aes256-CBC":
                    d = 32, u = i.aes.createDecryptionCipher;
                    break;
                case"des-EDE3-CBC":
                    d = 24, u = i.des.createDecryptionCipher;
                    break;
                case"desCBC":
                    d = 8, u = i.des.createDecryptionCipher
            }
            var g = l(o.prfOid), y = i.pkcs5.pbkdf2(r, h, p, d, g), m = o.encIv, v = u(y);
            return v.start(m), v
        }, s.pbe.getCipherForPKCS12PBE = function (e, t, r) {
            var n = {}, o = [];
            if (!a.validate(t, d, n, o)) throw(g = new Error("Cannot read password-based-encryption algorithm parameters. ASN.1 object is not a supported EncryptedPrivateKeyInfo.")).errors = o, g;
            var c, f, u, h = i.util.createBuffer(n.salt), p = i.util.createBuffer(n.iterations);
            switch (p = p.getInt(p.length() << 3), e) {
                case s.oids["pbeWithSHAAnd3-KeyTripleDES-CBC"]:
                    c = 24, f = 8, u = i.des.startDecrypting;
                    break;
                case s.oids["pbewithSHAAnd40BitRC2-CBC"]:
                    c = 5, f = 8, u = function (e, t) {
                        var r = i.rc2.createDecryptionCipher(e, 40);
                        return r.start(t, null), r
                    };
                    break;
                default:
                    var g;
                    throw(g = new Error("Cannot read PKCS #12 PBE data block. Unsupported OID.")).oid = e, g
            }
            var y = l(n.prfOid), m = s.pbe.generatePkcs12Key(r, h, 1, p, c, y);
            return y.start(), u(m, s.pbe.generatePkcs12Key(r, h, 2, p, f, y))
        }, s.pbe.opensslDeriveBytes = function (e, t, r, n) {
            if (null == n) {
                if (!("md5" in i.md)) throw new Error('"md5" hash algorithm unavailable.');
                n = i.md.md5.create()
            }
            null === t && (t = "");
            for (var a = [u(n, e + t)], s = 16, o = 1; s < r; ++o, s += 16) a.push(u(n, a[o - 1] + e + t));
            return a.join("").substr(0, r)
        }
    }, 98960: (e, t, r) => {
        var i = r(3832);
        r(36607), r(28991), r(97116);
        var n, a = i.pkcs5 = i.pkcs5 || {};
        i.util.isNodejs && !i.options.usePureJavaScript && (n = r(25819)), e.exports = i.pbkdf2 = a.pbkdf2 = function (e, t, r, a, s, o) {
            if ("function" == typeof s && (o = s, s = null), i.util.isNodejs && !i.options.usePureJavaScript && n.pbkdf2 && (null === s || "object" != typeof s) && (n.pbkdf2Sync.length > 4 || !s || "sha1" === s)) return "string" != typeof s && (s = "sha1"), e = Buffer.from(e, "binary"), t = Buffer.from(t, "binary"), o ? 4 === n.pbkdf2Sync.length ? n.pbkdf2(e, t, r, a, (function (e, t) {
                if (e) return o(e);
                o(null, t.toString("binary"))
            })) : n.pbkdf2(e, t, r, a, s, (function (e, t) {
                if (e) return o(e);
                o(null, t.toString("binary"))
            })) : 4 === n.pbkdf2Sync.length ? n.pbkdf2Sync(e, t, r, a).toString("binary") : n.pbkdf2Sync(e, t, r, a, s).toString("binary");
            if (null == s && (s = "sha1"), "string" == typeof s) {
                if (!(s in i.md.algorithms)) throw new Error("Unknown hash algorithm: " + s);
                s = i.md[s].create()
            }
            var c = s.digestLength;
            if (a > 4294967295 * c) {
                var f = new Error("Derived key is too long.");
                if (o) return o(f);
                throw f
            }
            var d = Math.ceil(a / c), u = a - (d - 1) * c, l = i.hmac.create();
            l.start(s, e);
            var h, p, g, y = "";
            if (!o) {
                for (var m = 1; m <= d; ++m) {
                    l.start(null, null), l.update(t), l.update(i.util.int32ToBytes(m)), h = g = l.digest().getBytes();
                    for (var v = 2; v <= r; ++v) l.start(null, null), l.update(g), p = l.digest().getBytes(), h = i.util.xorBytes(h, p, c), g = p;
                    y += m < d ? h : h.substr(0, u)
                }
                return y
            }
            m = 1;

            function b() {
                if (m > d) return o(null, y);
                l.start(null, null), l.update(t), l.update(i.util.int32ToBytes(m)), h = g = l.digest().getBytes(), v = 2, w()
            }

            function w() {
                if (v <= r) return l.start(null, null), l.update(g), p = l.digest().getBytes(), h = i.util.xorBytes(h, p, c), g = p, ++v, i.util.setImmediate(w);
                y += m < d ? h : h.substr(0, u), ++m, b()
            }

            b()
        }
    }, 26953: (e, t, r) => {
        var i = r(3832);
        r(97116);
        var n = e.exports = i.pem = i.pem || {};

        function a(e) {
            for (var t = e.name + ": ", r = [], i = function (e, t) {
                return " " + t
            }, n = 0; n < e.values.length; ++n) r.push(e.values[n].replace(/^(\S+\r\n)/, i));
            t += r.join(",") + "\r\n";
            var a = 0, s = -1;
            for (n = 0; n < t.length; ++n, ++a) if (a > 65 && -1 !== s) {
                var o = t[s];
                "," === o ? (++s, t = t.substr(0, s) + "\r\n " + t.substr(s)) : t = t.substr(0, s) + "\r\n" + o + t.substr(s + 1), a = n - s - 1, s = -1, ++n
            } else " " !== t[n] && "\t" !== t[n] && "," !== t[n] || (s = n);
            return t
        }

        function s(e) {
            return e.replace(/^\s+/, "")
        }

        n.encode = function (e, t) {
            t = t || {};
            var r, n = "-----BEGIN " + e.type + "-----\r\n";
            if (e.procType && (n += a(r = {
                name: "Proc-Type",
                values: [String(e.procType.version), e.procType.type]
            })), e.contentDomain && (n += a(r = {
                name: "Content-Domain",
                values: [e.contentDomain]
            })), e.dekInfo && (r = {
                name: "DEK-Info",
                values: [e.dekInfo.algorithm]
            }, e.dekInfo.parameters && r.values.push(e.dekInfo.parameters), n += a(r)), e.headers) for (var s = 0; s < e.headers.length; ++s) n += a(e.headers[s]);
            return e.procType && (n += "\r\n"), n += i.util.encode64(e.body, t.maxline || 64) + "\r\n", n += "-----END " + e.type + "-----\r\n"
        }, n.decode = function (e) {
            for (var t, r = [], n = /\s*-----BEGIN ([A-Z0-9- ]+)-----\r?\n?([\x21-\x7e\s]+?(?:\r?\n\r?\n))?([:A-Za-z0-9+\/=\s]+?)-----END \1-----/g, a = /([\x21-\x7e]+):\s*([\x21-\x7e\s^:]+)/, o = /\r?\n/; t = n.exec(e);) {
                var c = t[1];
                "NEW CERTIFICATE REQUEST" === c && (c = "CERTIFICATE REQUEST");
                var f = {
                    type: c,
                    procType: null,
                    contentDomain: null,
                    dekInfo: null,
                    headers: [],
                    body: i.util.decode64(t[3])
                };
                if (r.push(f), t[2]) {
                    for (var d = t[2].split(o), u = 0; t && u < d.length;) {
                        for (var l = d[u].replace(/\s+$/, ""), h = u + 1; h < d.length; ++h) {
                            var p = d[h];
                            if (!/\s/.test(p[0])) break;
                            l += p, u = h
                        }
                        if (t = l.match(a)) {
                            for (var g = {
                                name: t[1],
                                values: []
                            }, y = t[2].split(","), m = 0; m < y.length; ++m) g.values.push(s(y[m]));
                            if (f.procType) if (f.contentDomain || "Content-Domain" !== g.name) if (f.dekInfo || "DEK-Info" !== g.name) f.headers.push(g); else {
                                if (0 === g.values.length) throw new Error('Invalid PEM formatted message. The "DEK-Info" header must have at least one subfield.');
                                f.dekInfo = {algorithm: y[0], parameters: y[1] || null}
                            } else f.contentDomain = y[0] || ""; else {
                                if ("Proc-Type" !== g.name) throw new Error('Invalid PEM formatted message. The first encapsulated header must be "Proc-Type".');
                                if (2 !== g.values.length) throw new Error('Invalid PEM formatted message. The "Proc-Type" header must have two subfields.');
                                f.procType = {version: y[0], type: y[1]}
                            }
                        }
                        ++u
                    }
                    if ("ENCRYPTED" === f.procType && !f.dekInfo) throw new Error('Invalid PEM formatted message. The "DEK-Info" header must be present if "Proc-Type" is "ENCRYPTED".')
                }
            }
            if (0 === r.length) throw new Error("Invalid PEM formatted message.");
            return r
        }
    }, 18936: (e, t, r) => {
        var i = r(3832);
        r(97116), r(49563), r(137);
        var n = e.exports = i.pkcs1 = i.pkcs1 || {};

        function a(e, t, r) {
            r || (r = i.md.sha1.create());
            for (var n = "", a = Math.ceil(t / r.digestLength), s = 0; s < a; ++s) {
                var o = String.fromCharCode(s >> 24 & 255, s >> 16 & 255, s >> 8 & 255, 255 & s);
                r.start(), r.update(e + o), n += r.digest().getBytes()
            }
            return n.substring(0, t)
        }

        n.encode_rsa_oaep = function (e, t, r) {
            var n, s, o, c;
            "string" == typeof r ? (n = r, s = arguments[3] || void 0, o = arguments[4] || void 0) : r && (n = r.label || void 0, s = r.seed || void 0, o = r.md || void 0, r.mgf1 && r.mgf1.md && (c = r.mgf1.md)), o ? o.start() : o = i.md.sha1.create(), c || (c = o);
            var f = Math.ceil(e.n.bitLength() / 8), d = f - 2 * o.digestLength - 2;
            if (t.length > d) throw(y = new Error("RSAES-OAEP input message length is too long.")).length = t.length, y.maxLength = d, y;
            n || (n = ""), o.update(n, "raw");
            for (var u = o.digest(), l = "", h = d - t.length, p = 0; p < h; p++) l += "\0";
            var g = u.getBytes() + l + "" + t;
            if (s) {
                if (s.length !== o.digestLength) {
                    var y;
                    throw(y = new Error("Invalid RSAES-OAEP seed. The seed length must match the digest length.")).seedLength = s.length, y.digestLength = o.digestLength, y
                }
            } else s = i.random.getBytes(o.digestLength);
            var m = a(s, f - o.digestLength - 1, c), v = i.util.xorBytes(g, m, g.length), b = a(v, o.digestLength, c);
            return "\0" + i.util.xorBytes(s, b, s.length) + v
        }, n.decode_rsa_oaep = function (e, t, r) {
            var n, s, o;
            "string" == typeof r ? (n = r, s = arguments[3] || void 0) : r && (n = r.label || void 0, s = r.md || void 0, r.mgf1 && r.mgf1.md && (o = r.mgf1.md));
            var c = Math.ceil(e.n.bitLength() / 8);
            if (t.length !== c) throw(m = new Error("RSAES-OAEP encoded message length is invalid.")).length = t.length, m.expectedLength = c, m;
            if (void 0 === s ? s = i.md.sha1.create() : s.start(), o || (o = s), c < 2 * s.digestLength + 2) throw new Error("RSAES-OAEP key is too short for the hash function.");
            n || (n = ""), s.update(n, "raw");
            for (var f = s.digest().getBytes(), d = t.charAt(0), u = t.substring(1, s.digestLength + 1), l = t.substring(1 + s.digestLength), h = a(l, s.digestLength, o), p = a(i.util.xorBytes(u, h, u.length), c - s.digestLength - 1, o), g = i.util.xorBytes(l, p, l.length), y = g.substring(0, s.digestLength), m = "\0" !== d, v = 0; v < s.digestLength; ++v) m |= f.charAt(v) !== y.charAt(v);
            for (var b = 1, w = s.digestLength, E = s.digestLength; E < g.length; E++) {
                var C = g.charCodeAt(E);
                m |= C & (b ? 65534 : 0), w += b &= 1 & C ^ 1
            }
            if (m || 1 !== g.charCodeAt(w)) throw new Error("Invalid RSAES-OAEP padding.");
            return g.substring(w + 1)
        }
    }, 55147: (e, t, r) => {
        var i = r(3832);
        r(3068), r(36607), r(66270), r(95496), r(97450), r(49563), r(28095), r(137), r(97116), r(25414);
        var n = i.asn1, a = i.pki, s = e.exports = i.pkcs12 = i.pkcs12 || {}, o = {
            name: "ContentInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "ContentInfo.contentType",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OID,
                constructed: !1,
                capture: "contentType"
            }, {
                name: "ContentInfo.content",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                constructed: !0,
                captureAsn1: "content"
            }]
        }, c = {
            name: "PFX",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PFX.version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, o, {
                name: "PFX.macData",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                optional: !0,
                captureAsn1: "mac",
                value: [{
                    name: "PFX.macData.mac",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "PFX.macData.mac.digestAlgorithm",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "PFX.macData.mac.digestAlgorithm.algorithm",
                            tagClass: n.Class.UNIVERSAL,
                            type: n.Type.OID,
                            constructed: !1,
                            capture: "macAlgorithm"
                        }, {
                            name: "PFX.macData.mac.digestAlgorithm.parameters",
                            tagClass: n.Class.UNIVERSAL,
                            captureAsn1: "macAlgorithmParameters"
                        }]
                    }, {
                        name: "PFX.macData.mac.digest",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.OCTETSTRING,
                        constructed: !1,
                        capture: "macDigest"
                    }]
                }, {
                    name: "PFX.macData.macSalt",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OCTETSTRING,
                    constructed: !1,
                    capture: "macSalt"
                }, {
                    name: "PFX.macData.iterations",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.INTEGER,
                    constructed: !1,
                    optional: !0,
                    capture: "macIterations"
                }]
            }]
        }, f = {
            name: "SafeBag",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SafeBag.bagId",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OID,
                constructed: !1,
                capture: "bagId"
            }, {
                name: "SafeBag.bagValue",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                constructed: !0,
                captureAsn1: "bagValue"
            }, {
                name: "SafeBag.bagAttributes",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SET,
                constructed: !0,
                optional: !0,
                capture: "bagAttributes"
            }]
        }, d = {
            name: "Attribute",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "Attribute.attrId",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OID,
                constructed: !1,
                capture: "oid"
            }, {
                name: "Attribute.attrValues",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SET,
                constructed: !0,
                capture: "values"
            }]
        }, u = {
            name: "CertBag",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "CertBag.certId",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OID,
                constructed: !1,
                capture: "certId"
            }, {
                name: "CertBag.certValue",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                constructed: !0,
                value: [{
                    name: "CertBag.certValue[0]",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Class.OCTETSTRING,
                    constructed: !1,
                    capture: "cert"
                }]
            }]
        };

        function l(e, t, r, i) {
            for (var n = [], a = 0; a < e.length; a++) for (var s = 0; s < e[a].safeBags.length; s++) {
                var o = e[a].safeBags[s];
                void 0 !== i && o.type !== i || (null !== t ? void 0 !== o.attributes[t] && o.attributes[t].indexOf(r) >= 0 && n.push(o) : n.push(o))
            }
            return n
        }

        function h(e) {
            if (e.composed || e.constructed) {
                for (var t = i.util.createBuffer(), r = 0; r < e.value.length; ++r) t.putBytes(e.value[r].value);
                e.composed = e.constructed = !1, e.value = t.getBytes()
            }
            return e
        }

        function p(e, t) {
            var r = {}, s = [];
            if (!n.validate(e, i.pkcs7.asn1.encryptedDataValidator, r, s)) throw(o = new Error("Cannot read EncryptedContentInfo.")).errors = s, o;
            var o, c = n.derToOid(r.contentType);
            if (c !== a.oids.data) throw(o = new Error("PKCS#12 EncryptedContentInfo ContentType is not Data.")).oid = c, o;
            c = n.derToOid(r.encAlgorithm);
            var f = a.pbe.getCipher(c, r.encParameter, t), d = h(r.encryptedContentAsn1),
                u = i.util.createBuffer(d.value);
            if (f.update(u), !f.finish()) throw new Error("Failed to decrypt PKCS#12 SafeContents.");
            return f.output.getBytes()
        }

        function g(e, t, r) {
            if (!t && 0 === e.length) return [];
            if ((e = n.fromDer(e, t)).tagClass !== n.Class.UNIVERSAL || e.type !== n.Type.SEQUENCE || !0 !== e.constructed) throw new Error("PKCS#12 SafeContents expected to be a SEQUENCE OF SafeBag.");
            for (var i = [], s = 0; s < e.value.length; s++) {
                var o = e.value[s], c = {}, d = [];
                if (!n.validate(o, f, c, d)) throw(m = new Error("Cannot read SafeBag.")).errors = d, m;
                var l, h, p = {type: n.derToOid(c.bagId), attributes: y(c.bagAttributes)};
                i.push(p);
                var g = c.bagValue.value[0];
                switch (p.type) {
                    case a.oids.pkcs8ShroudedKeyBag:
                        if (null === (g = a.decryptPrivateKeyInfo(g, r))) throw new Error("Unable to decrypt PKCS#8 ShroudedKeyBag, wrong password?");
                    case a.oids.keyBag:
                        try {
                            p.key = a.privateKeyFromAsn1(g)
                        } catch (v) {
                            p.key = null, p.asn1 = g
                        }
                        continue;
                    case a.oids.certBag:
                        l = u, h = function () {
                            if (n.derToOid(c.certId) !== a.oids.x509Certificate) {
                                var e = new Error("Unsupported certificate type, only X.509 supported.");
                                throw e.oid = n.derToOid(c.certId), e
                            }
                            var r = n.fromDer(c.cert, t);
                            try {
                                p.cert = a.certificateFromAsn1(r, !0)
                            } catch (v) {
                                p.cert = null, p.asn1 = r
                            }
                        };
                        break;
                    default:
                        var m;
                        throw(m = new Error("Unsupported PKCS#12 SafeBag type.")).oid = p.type, m
                }
                if (void 0 !== l && !n.validate(g, l, c, d)) throw(m = new Error("Cannot read PKCS#12 " + l.name)).errors = d, m;
                h()
            }
            return i
        }

        function y(e) {
            var t = {};
            if (void 0 !== e) for (var r = 0; r < e.length; ++r) {
                var i = {}, s = [];
                if (!n.validate(e[r], d, i, s)) {
                    var o = new Error("Cannot read PKCS#12 BagAttribute.");
                    throw o.errors = s, o
                }
                var c = n.derToOid(i.oid);
                if (void 0 !== a.oids[c]) {
                    t[a.oids[c]] = [];
                    for (var f = 0; f < i.values.length; ++f) t[a.oids[c]].push(i.values[f].value)
                }
            }
            return t
        }

        s.pkcs12FromAsn1 = function (e, t, r) {
            "string" == typeof t ? (r = t, t = !0) : void 0 === t && (t = !0);
            var f = {};
            if (!n.validate(e, c, f, [])) throw(d = new Error("Cannot read PKCS#12 PFX. ASN.1 object is not an PKCS#12 PFX.")).errors = d, d;
            var d, u = {
                version: f.version.charCodeAt(0), safeContents: [], getBags: function (e) {
                    var t, r = {};
                    return "localKeyId" in e ? t = e.localKeyId : "localKeyIdHex" in e && (t = i.util.hexToBytes(e.localKeyIdHex)), void 0 === t && !("friendlyName" in e) && "bagType" in e && (r[e.bagType] = l(u.safeContents, null, null, e.bagType)), void 0 !== t && (r.localKeyId = l(u.safeContents, "localKeyId", t, e.bagType)), "friendlyName" in e && (r.friendlyName = l(u.safeContents, "friendlyName", e.friendlyName, e.bagType)), r
                }, getBagsByFriendlyName: function (e, t) {
                    return l(u.safeContents, "friendlyName", e, t)
                }, getBagsByLocalKeyId: function (e, t) {
                    return l(u.safeContents, "localKeyId", e, t)
                }
            };
            if (3 !== f.version.charCodeAt(0)) throw(d = new Error("PKCS#12 PFX of version other than 3 not supported.")).version = f.version.charCodeAt(0), d;
            if (n.derToOid(f.contentType) !== a.oids.data) throw(d = new Error("Only PKCS#12 PFX in password integrity mode supported.")).oid = n.derToOid(f.contentType), d;
            var y = f.content.value[0];
            if (y.tagClass !== n.Class.UNIVERSAL || y.type !== n.Type.OCTETSTRING) throw new Error("PKCS#12 authSafe content data is not an OCTET STRING.");
            if (y = h(y), f.mac) {
                var m = null, v = 0, b = n.derToOid(f.macAlgorithm);
                switch (b) {
                    case a.oids.sha1:
                        m = i.md.sha1.create(), v = 20;
                        break;
                    case a.oids.sha256:
                        m = i.md.sha256.create(), v = 32;
                        break;
                    case a.oids.sha384:
                        m = i.md.sha384.create(), v = 48;
                        break;
                    case a.oids.sha512:
                        m = i.md.sha512.create(), v = 64;
                        break;
                    case a.oids.md5:
                        m = i.md.md5.create(), v = 16
                }
                if (null === m) throw new Error("PKCS#12 uses unsupported MAC algorithm: " + b);
                var w = new i.util.ByteBuffer(f.macSalt),
                    E = "macIterations" in f ? parseInt(i.util.bytesToHex(f.macIterations), 16) : 1,
                    C = s.generateKey(r, w, 3, E, v, m), S = i.hmac.create();
                if (S.start(m, C), S.update(y.value), S.getMac().getBytes() !== f.macDigest) throw new Error("PKCS#12 MAC could not be verified. Invalid password?")
            }
            return function (e, t, r, i) {
                if (t = n.fromDer(t, r), t.tagClass !== n.Class.UNIVERSAL || t.type !== n.Type.SEQUENCE || !0 !== t.constructed) throw new Error("PKCS#12 AuthenticatedSafe expected to be a SEQUENCE OF ContentInfo");
                for (var s = 0; s < t.value.length; s++) {
                    var c = t.value[s], f = {}, d = [];
                    if (!n.validate(c, o, f, d)) throw(m = new Error("Cannot read ContentInfo.")).errors = d, m;
                    var u = {encrypted: !1}, l = null, y = f.content.value[0];
                    switch (n.derToOid(f.contentType)) {
                        case a.oids.data:
                            if (y.tagClass !== n.Class.UNIVERSAL || y.type !== n.Type.OCTETSTRING) throw new Error("PKCS#12 SafeContents Data is not an OCTET STRING.");
                            l = h(y).value;
                            break;
                        case a.oids.encryptedData:
                            l = p(y, i), u.encrypted = !0;
                            break;
                        default:
                            var m;
                            throw(m = new Error("Unsupported PKCS#12 contentType.")).contentType = n.derToOid(f.contentType), m
                    }
                    u.safeBags = g(l, r, i), e.safeContents.push(u)
                }
            }(u, y.value, t, r), u
        }, s.toPkcs12Asn1 = function (e, t, r, o) {
            (o = o || {}).saltSize = o.saltSize || 8, o.count = o.count || 2048, o.algorithm = o.algorithm || o.encAlgorithm || "aes128", "useMac" in o || (o.useMac = !0), "localKeyId" in o || (o.localKeyId = null), "generateLocalKeyId" in o || (o.generateLocalKeyId = !0);
            var c, f = o.localKeyId;
            if (null !== f) f = i.util.hexToBytes(f); else if (o.generateLocalKeyId) if (t) {
                var d = i.util.isArray(t) ? t[0] : t;
                "string" == typeof d && (d = a.certificateFromPem(d)), (T = i.md.sha1.create()).update(n.toDer(a.certificateToAsn1(d)).getBytes()), f = T.digest().getBytes()
            } else f = i.random.getBytes(20);
            var u = [];
            null !== f && u.push(n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.localKeyId).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SET, !0, [n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, f)])])), "friendlyName" in o && u.push(n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.friendlyName).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SET, !0, [n.create(n.Class.UNIVERSAL, n.Type.BMPSTRING, !1, o.friendlyName)])])), u.length > 0 && (c = n.create(n.Class.UNIVERSAL, n.Type.SET, !0, u));
            var l = [], h = [];
            null !== t && (h = i.util.isArray(t) ? t : [t]);
            for (var p = [], g = 0; g < h.length; ++g) {
                "string" == typeof (t = h[g]) && (t = a.certificateFromPem(t));
                var y = 0 === g ? c : void 0, m = a.certificateToAsn1(t),
                    v = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.certBag).getBytes()), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.x509Certificate).getBytes()), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, n.toDer(m).getBytes())])])]), y]);
                p.push(v)
            }
            if (p.length > 0) {
                var b = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, p),
                    w = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.data).getBytes()), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, n.toDer(b).getBytes())])]);
                l.push(w)
            }
            var E = null;
            if (null !== e) {
                var C = a.wrapRsaPrivateKey(a.privateKeyToAsn1(e));
                E = null === r ? n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.keyBag).getBytes()), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [C]), c]) : n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.pkcs8ShroudedKeyBag).getBytes()), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [a.encryptPrivateKeyInfo(C, r, o)]), c]);
                var S = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [E]),
                    I = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.data).getBytes()), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, n.toDer(S).getBytes())])]);
                l.push(I)
            }
            var A, _ = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, l);
            if (o.useMac) {
                var T = i.md.sha1.create(), B = new i.util.ByteBuffer(i.random.getBytes(o.saltSize)), N = o.count,
                    k = (e = s.generateKey(r, B, 3, N, 20), i.hmac.create());
                k.start(T, e), k.update(n.toDer(_).getBytes());
                var R = k.getMac();
                A = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.sha1).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.NULL, !1, "")]), n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, R.getBytes())]), n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, B.getBytes()), n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(N).getBytes())])
            }
            return n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(3).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(a.oids.data).getBytes()), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, n.toDer(_).getBytes())])]), A])
        }, s.generateKey = i.pbe.generatePkcs12Key
    }, 79437: (e, t, r) => {
        var i = r(3832);
        r(8925), r(3068), r(33480), r(66270), r(26953), r(95496), r(49563), r(97116), r(25414);
        var n = i.asn1, a = e.exports = i.pkcs7 = i.pkcs7 || {};

        function s(e) {
            var t = {}, r = [];
            if (!n.validate(e, a.asn1.recipientInfoValidator, t, r)) {
                var s = new Error("Cannot read PKCS#7 RecipientInfo. ASN.1 object is not an PKCS#7 RecipientInfo.");
                throw s.errors = r, s
            }
            return {
                version: t.version.charCodeAt(0),
                issuer: i.pki.RDNAttributesAsArray(t.issuer),
                serialNumber: i.util.createBuffer(t.serial).toHex(),
                encryptedContent: {
                    algorithm: n.derToOid(t.encAlgorithm),
                    parameter: t.encParameter ? t.encParameter.value : void 0,
                    content: t.encKey
                }
            }
        }

        function o(e) {
            for (var t, r = [], a = 0; a < e.length; ++a) r.push((t = e[a], n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(t.version).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [i.pki.distinguishedNameToAsn1({attributes: t.issuer}), n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, i.util.hexToBytes(t.serialNumber))]), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(t.encryptedContent.algorithm).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.NULL, !1, "")]), n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, t.encryptedContent.content)])));
            return r
        }

        function c(e) {
            var t = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(e.version).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [i.pki.distinguishedNameToAsn1({attributes: e.issuer}), n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, i.util.hexToBytes(e.serialNumber))]), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.digestAlgorithm).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.NULL, !1, "")])]);
            if (e.authenticatedAttributesAsn1 && t.value.push(e.authenticatedAttributesAsn1), t.value.push(n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.signatureAlgorithm).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.NULL, !1, "")])), t.value.push(n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, e.signature)), e.unauthenticatedAttributes.length > 0) {
                for (var r = n.create(n.Class.CONTEXT_SPECIFIC, 1, !0, []), a = 0; a < e.unauthenticatedAttributes.length; ++a) {
                    var s = e.unauthenticatedAttributes[a];
                    r.values.push(f(s))
                }
                t.value.push(r)
            }
            return t
        }

        function f(e) {
            var t;
            if (e.type === i.pki.oids.contentType) t = n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.value).getBytes()); else if (e.type === i.pki.oids.messageDigest) t = n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, e.value.bytes()); else if (e.type === i.pki.oids.signingTime) {
                var r = new Date("1950-01-01T00:00:00Z"), a = new Date("2050-01-01T00:00:00Z"), s = e.value;
                if ("string" == typeof s) {
                    var o = Date.parse(s);
                    s = isNaN(o) ? 13 === s.length ? n.utcTimeToDate(s) : n.generalizedTimeToDate(s) : new Date(o)
                }
                t = s >= r && s < a ? n.create(n.Class.UNIVERSAL, n.Type.UTCTIME, !1, n.dateToUtcTime(s)) : n.create(n.Class.UNIVERSAL, n.Type.GENERALIZEDTIME, !1, n.dateToGeneralizedTime(s))
            }
            return n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.type).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SET, !0, [t])])
        }

        function d(e, t, r) {
            var a = {};
            if (!n.validate(t, r, a, [])) {
                var s = new Error("Cannot read PKCS#7 message. ASN.1 object is not a supported PKCS#7 message.");
                throw s.errors = s, s
            }
            if (n.derToOid(a.contentType) !== i.pki.oids.data) throw new Error("Unsupported PKCS#7 message. Only wrapped ContentType Data supported.");
            if (a.encryptedContent) {
                var o = "";
                if (i.util.isArray(a.encryptedContent)) for (var c = 0; c < a.encryptedContent.length; ++c) {
                    if (a.encryptedContent[c].type !== n.Type.OCTETSTRING) throw new Error("Malformed PKCS#7 message, expecting encrypted content constructed of only OCTET STRING objects.");
                    o += a.encryptedContent[c].value
                } else o = a.encryptedContent;
                e.encryptedContent = {
                    algorithm: n.derToOid(a.encAlgorithm),
                    parameter: i.util.createBuffer(a.encParameter.value),
                    content: i.util.createBuffer(o)
                }
            }
            if (a.content) {
                o = "";
                if (i.util.isArray(a.content)) for (c = 0; c < a.content.length; ++c) {
                    if (a.content[c].type !== n.Type.OCTETSTRING) throw new Error("Malformed PKCS#7 message, expecting content constructed of only OCTET STRING objects.");
                    o += a.content[c].value
                } else o = a.content;
                e.content = i.util.createBuffer(o)
            }
            return e.version = a.version.charCodeAt(0), e.rawCapture = a, a
        }

        function u(e) {
            if (void 0 === e.encryptedContent.key) throw new Error("Symmetric key not available.");
            if (void 0 === e.content) {
                var t;
                switch (e.encryptedContent.algorithm) {
                    case i.pki.oids["aes128-CBC"]:
                    case i.pki.oids["aes192-CBC"]:
                    case i.pki.oids["aes256-CBC"]:
                        t = i.aes.createDecryptionCipher(e.encryptedContent.key);
                        break;
                    case i.pki.oids.desCBC:
                    case i.pki.oids["des-EDE3-CBC"]:
                        t = i.des.createDecryptionCipher(e.encryptedContent.key);
                        break;
                    default:
                        throw new Error("Unsupported symmetric cipher, OID " + e.encryptedContent.algorithm)
                }
                if (t.start(e.encryptedContent.parameter), t.update(e.encryptedContent.content), !t.finish()) throw new Error("Symmetric decryption failed.");
                e.content = t.output
            }
        }

        a.messageFromPem = function (e) {
            var t = i.pem.decode(e)[0];
            if ("PKCS7" !== t.type) {
                var r = new Error('Could not convert PKCS#7 message from PEM; PEM header type is not "PKCS#7".');
                throw r.headerType = t.type, r
            }
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert PKCS#7 message from PEM; PEM is encrypted.");
            var s = n.fromDer(t.body);
            return a.messageFromAsn1(s)
        }, a.messageToPem = function (e, t) {
            var r = {type: "PKCS7", body: n.toDer(e.toAsn1()).getBytes()};
            return i.pem.encode(r, {maxline: t})
        }, a.messageFromAsn1 = function (e) {
            var t = {}, r = [];
            if (!n.validate(e, a.asn1.contentInfoValidator, t, r)) {
                var s = new Error("Cannot read PKCS#7 message. ASN.1 object is not an PKCS#7 ContentInfo.");
                throw s.errors = r, s
            }
            var o, c = n.derToOid(t.contentType);
            switch (c) {
                case i.pki.oids.envelopedData:
                    o = a.createEnvelopedData();
                    break;
                case i.pki.oids.encryptedData:
                    o = a.createEncryptedData();
                    break;
                case i.pki.oids.signedData:
                    o = a.createSignedData();
                    break;
                default:
                    throw new Error("Cannot read PKCS#7 message. ContentType with OID " + c + " is not (yet) supported.")
            }
            return o.fromAsn1(t.content.value[0]), o
        }, a.createSignedData = function () {
            var e = null;
            return e = {
                type: i.pki.oids.signedData,
                version: 1,
                certificates: [],
                crls: [],
                signers: [],
                digestAlgorithmIdentifiers: [],
                contentInfo: null,
                signerInfos: [],
                fromAsn1: function (t) {
                    if (d(e, t, a.asn1.signedDataValidator), e.certificates = [], e.crls = [], e.digestAlgorithmIdentifiers = [], e.contentInfo = null, e.signerInfos = [], e.rawCapture.certificates) for (var r = e.rawCapture.certificates.value, n = 0; n < r.length; ++n) e.certificates.push(i.pki.certificateFromAsn1(r[n]))
                },
                toAsn1: function () {
                    e.contentInfo || e.sign();
                    for (var t = [], r = 0; r < e.certificates.length; ++r) t.push(i.pki.certificateToAsn1(e.certificates[r]));
                    var a = [],
                        s = n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(e.version).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SET, !0, e.digestAlgorithmIdentifiers), e.contentInfo])]);
                    return t.length > 0 && s.value[0].value.push(n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, t)), a.length > 0 && s.value[0].value.push(n.create(n.Class.CONTEXT_SPECIFIC, 1, !0, a)), s.value[0].value.push(n.create(n.Class.UNIVERSAL, n.Type.SET, !0, e.signerInfos)), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.type).getBytes()), s])
                },
                addSigner: function (t) {
                    var r = t.issuer, n = t.serialNumber;
                    if (t.certificate) {
                        var a = t.certificate;
                        "string" == typeof a && (a = i.pki.certificateFromPem(a)), r = a.issuer.attributes, n = a.serialNumber
                    }
                    var s = t.key;
                    if (!s) throw new Error("Could not add PKCS#7 signer; no private key specified.");
                    "string" == typeof s && (s = i.pki.privateKeyFromPem(s));
                    var o = t.digestAlgorithm || i.pki.oids.sha1;
                    switch (o) {
                        case i.pki.oids.sha1:
                        case i.pki.oids.sha256:
                        case i.pki.oids.sha384:
                        case i.pki.oids.sha512:
                        case i.pki.oids.md5:
                            break;
                        default:
                            throw new Error("Could not add PKCS#7 signer; unknown message digest algorithm: " + o)
                    }
                    var c = t.authenticatedAttributes || [];
                    if (c.length > 0) {
                        for (var f = !1, d = !1, u = 0; u < c.length; ++u) {
                            var l = c[u];
                            if (f || l.type !== i.pki.oids.contentType) {
                                if (d || l.type !== i.pki.oids.messageDigest) ; else if (d = !0, f) break
                            } else if (f = !0, d) break
                        }
                        if (!f || !d) throw new Error("Invalid signer.authenticatedAttributes. If signer.authenticatedAttributes is specified, then it must contain at least two attributes, PKCS #9 content-type and PKCS #9 message-digest.")
                    }
                    e.signers.push({
                        key: s,
                        version: 1,
                        issuer: r,
                        serialNumber: n,
                        digestAlgorithm: o,
                        signatureAlgorithm: i.pki.oids.rsaEncryption,
                        signature: null,
                        authenticatedAttributes: c,
                        unauthenticatedAttributes: []
                    })
                },
                sign: function (t) {
                    var r;
                    (t = t || {}, "object" != typeof e.content || null === e.contentInfo) && (e.contentInfo = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(i.pki.oids.data).getBytes())]), "content" in e && (e.content instanceof i.util.ByteBuffer ? r = e.content.bytes() : "string" == typeof e.content && (r = i.util.encodeUtf8(e.content)), t.detached ? e.detachedContent = n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, r) : e.contentInfo.value.push(n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, r)]))));
                    0 !== e.signers.length && function (t) {
                        var r;
                        r = e.detachedContent ? e.detachedContent : (r = e.contentInfo.value[1]).value[0];
                        if (!r) throw new Error("Could not sign PKCS#7 message; there is no content to sign.");
                        var a = n.derToOid(e.contentInfo.value[0].value), s = n.toDer(r);
                        for (var o in s.getByte(), n.getBerValueLength(s), s = s.getBytes(), t) t[o].start().update(s);
                        for (var d = new Date, u = 0; u < e.signers.length; ++u) {
                            var l = e.signers[u];
                            if (0 === l.authenticatedAttributes.length) {
                                if (a !== i.pki.oids.data) throw new Error("Invalid signer; authenticatedAttributes must be present when the ContentInfo content type is not PKCS#7 Data.")
                            } else {
                                l.authenticatedAttributesAsn1 = n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, []);
                                for (var h = n.create(n.Class.UNIVERSAL, n.Type.SET, !0, []), p = 0; p < l.authenticatedAttributes.length; ++p) {
                                    var g = l.authenticatedAttributes[p];
                                    g.type === i.pki.oids.messageDigest ? g.value = t[l.digestAlgorithm].digest() : g.type === i.pki.oids.signingTime && (g.value || (g.value = d)), h.value.push(f(g)), l.authenticatedAttributesAsn1.value.push(f(g))
                                }
                                s = n.toDer(h).getBytes(), l.md.start().update(s)
                            }
                            l.signature = l.key.sign(l.md, "RSASSA-PKCS1-V1_5")
                        }
                        e.signerInfos = function (e) {
                            for (var t = [], r = 0; r < e.length; ++r) t.push(c(e[r]));
                            return t
                        }(e.signers)
                    }(function () {
                        for (var t = {}, r = 0; r < e.signers.length; ++r) {
                            var a = e.signers[r];
                            (s = a.digestAlgorithm) in t || (t[s] = i.md[i.pki.oids[s]].create()), 0 === a.authenticatedAttributes.length ? a.md = t[s] : a.md = i.md[i.pki.oids[s]].create()
                        }
                        for (var s in e.digestAlgorithmIdentifiers = [], t) e.digestAlgorithmIdentifiers.push(n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(s).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.NULL, !1, "")]));
                        return t
                    }())
                },
                verify: function () {
                    throw new Error("PKCS#7 signature verification not yet implemented.")
                },
                addCertificate: function (t) {
                    "string" == typeof t && (t = i.pki.certificateFromPem(t)), e.certificates.push(t)
                },
                addCertificateRevokationList: function (e) {
                    throw new Error("PKCS#7 CRL support not yet implemented.")
                }
            }
        }, a.createEncryptedData = function () {
            var e = null;
            return e = {
                type: i.pki.oids.encryptedData,
                version: 0,
                encryptedContent: {algorithm: i.pki.oids["aes256-CBC"]},
                fromAsn1: function (t) {
                    d(e, t, a.asn1.encryptedDataValidator)
                },
                decrypt: function (t) {
                    void 0 !== t && (e.encryptedContent.key = t), u(e)
                }
            }
        }, a.createEnvelopedData = function () {
            var e = null;
            return e = {
                type: i.pki.oids.envelopedData,
                version: 0,
                recipients: [],
                encryptedContent: {algorithm: i.pki.oids["aes256-CBC"]},
                fromAsn1: function (t) {
                    var r = d(e, t, a.asn1.envelopedDataValidator);
                    e.recipients = function (e) {
                        for (var t = [], r = 0; r < e.length; ++r) t.push(s(e[r]));
                        return t
                    }(r.recipientInfos.value)
                },
                toAsn1: function () {
                    return n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.type).getBytes()), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(e.version).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SET, !0, o(e.recipients)), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, (t = e.encryptedContent, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(i.pki.oids.data).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(t.algorithm).getBytes()), t.parameter ? n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, t.parameter.getBytes()) : void 0]), n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, t.content.getBytes())])]))])])]);
                    var t
                },
                findRecipient: function (t) {
                    for (var r = t.issuer.attributes, i = 0; i < e.recipients.length; ++i) {
                        var n = e.recipients[i], a = n.issuer;
                        if (n.serialNumber === t.serialNumber && a.length === r.length) {
                            for (var s = !0, o = 0; o < r.length; ++o) if (a[o].type !== r[o].type || a[o].value !== r[o].value) {
                                s = !1;
                                break
                            }
                            if (s) return n
                        }
                    }
                    return null
                },
                decrypt: function (t, r) {
                    if (void 0 === e.encryptedContent.key && void 0 !== t && void 0 !== r) switch (t.encryptedContent.algorithm) {
                        case i.pki.oids.rsaEncryption:
                        case i.pki.oids.desCBC:
                            var n = r.decrypt(t.encryptedContent.content);
                            e.encryptedContent.key = i.util.createBuffer(n);
                            break;
                        default:
                            throw new Error("Unsupported asymmetric cipher, OID " + t.encryptedContent.algorithm)
                    }
                    u(e)
                },
                addRecipient: function (t) {
                    e.recipients.push({
                        version: 0,
                        issuer: t.issuer.attributes,
                        serialNumber: t.serialNumber,
                        encryptedContent: {algorithm: i.pki.oids.rsaEncryption, key: t.publicKey}
                    })
                },
                encrypt: function (t, r) {
                    if (void 0 === e.encryptedContent.content) {
                        var n, a, s;
                        switch (r = r || e.encryptedContent.algorithm, t = t || e.encryptedContent.key, r) {
                            case i.pki.oids["aes128-CBC"]:
                                n = 16, a = 16, s = i.aes.createEncryptionCipher;
                                break;
                            case i.pki.oids["aes192-CBC"]:
                                n = 24, a = 16, s = i.aes.createEncryptionCipher;
                                break;
                            case i.pki.oids["aes256-CBC"]:
                                n = 32, a = 16, s = i.aes.createEncryptionCipher;
                                break;
                            case i.pki.oids["des-EDE3-CBC"]:
                                n = 24, a = 8, s = i.des.createEncryptionCipher;
                                break;
                            default:
                                throw new Error("Unsupported symmetric cipher, OID " + r)
                        }
                        if (void 0 === t) t = i.util.createBuffer(i.random.getBytes(n)); else if (t.length() != n) throw new Error("Symmetric key has wrong length; got " + t.length() + " bytes, expected " + n + ".");
                        e.encryptedContent.algorithm = r, e.encryptedContent.key = t, e.encryptedContent.parameter = i.util.createBuffer(i.random.getBytes(a));
                        var o = s(t);
                        if (o.start(e.encryptedContent.parameter.copy()), o.update(e.content), !o.finish()) throw new Error("Symmetric encryption failed.");
                        e.encryptedContent.content = o.output
                    }
                    for (var c = 0; c < e.recipients.length; ++c) {
                        var f = e.recipients[c];
                        if (void 0 === f.encryptedContent.content) {
                            if (f.encryptedContent.algorithm !== i.pki.oids.rsaEncryption) throw new Error("Unsupported asymmetric cipher, OID " + f.encryptedContent.algorithm);
                            f.encryptedContent.content = f.encryptedContent.key.encrypt(e.encryptedContent.key.data)
                        }
                    }
                }
            }
        }
    }, 95496: (e, t, r) => {
        var i = r(3832);
        r(3068), r(97116);
        var n = i.asn1, a = e.exports = i.pkcs7asn1 = i.pkcs7asn1 || {};
        i.pkcs7 = i.pkcs7 || {}, i.pkcs7.asn1 = a;
        var s = {
            name: "ContentInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "ContentInfo.ContentType",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OID,
                constructed: !1,
                capture: "contentType"
            }, {
                name: "ContentInfo.content",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                captureAsn1: "content"
            }]
        };
        a.contentInfoValidator = s;
        var o = {
            name: "EncryptedContentInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedContentInfo.contentType",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OID,
                constructed: !1,
                capture: "contentType"
            }, {
                name: "EncryptedContentInfo.contentEncryptionAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "EncryptedContentInfo.contentEncryptionAlgorithm.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "encAlgorithm"
                }, {
                    name: "EncryptedContentInfo.contentEncryptionAlgorithm.parameter",
                    tagClass: n.Class.UNIVERSAL,
                    captureAsn1: "encParameter"
                }]
            }, {
                name: "EncryptedContentInfo.encryptedContent",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                capture: "encryptedContent",
                captureAsn1: "encryptedContentAsn1"
            }]
        };
        a.envelopedDataValidator = {
            name: "EnvelopedData",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EnvelopedData.Version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "EnvelopedData.RecipientInfos",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SET,
                constructed: !0,
                captureAsn1: "recipientInfos"
            }].concat(o)
        }, a.encryptedDataValidator = {
            name: "EncryptedData",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "EncryptedData.Version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }].concat(o)
        };
        var c = {
            name: "SignerInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SignerInfo.version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1
            }, {
                name: "SignerInfo.issuerAndSerialNumber",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "SignerInfo.issuerAndSerialNumber.issuer",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "issuer"
                }, {
                    name: "SignerInfo.issuerAndSerialNumber.serialNumber",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.INTEGER,
                    constructed: !1,
                    capture: "serial"
                }]
            }, {
                name: "SignerInfo.digestAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "SignerInfo.digestAlgorithm.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "digestAlgorithm"
                }, {
                    name: "SignerInfo.digestAlgorithm.parameter",
                    tagClass: n.Class.UNIVERSAL,
                    constructed: !1,
                    captureAsn1: "digestParameter",
                    optional: !0
                }]
            }, {
                name: "SignerInfo.authenticatedAttributes",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                capture: "authenticatedAttributes"
            }, {
                name: "SignerInfo.digestEncryptionAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                capture: "signatureAlgorithm"
            }, {
                name: "SignerInfo.encryptedDigest",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OCTETSTRING,
                constructed: !1,
                capture: "signature"
            }, {
                name: "SignerInfo.unauthenticatedAttributes",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 1,
                constructed: !0,
                optional: !0,
                capture: "unauthenticatedAttributes"
            }]
        };
        a.signedDataValidator = {
            name: "SignedData",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "SignedData.Version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "SignedData.DigestAlgorithms",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SET,
                constructed: !0,
                captureAsn1: "digestAlgorithms"
            }, s, {
                name: "SignedData.Certificates",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                optional: !0,
                captureAsn1: "certificates"
            }, {
                name: "SignedData.CertificateRevocationLists",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 1,
                optional: !0,
                captureAsn1: "crls"
            }, {
                name: "SignedData.SignerInfos",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SET,
                capture: "signerInfos",
                optional: !0,
                value: [c]
            }]
        }, a.recipientInfoValidator = {
            name: "RecipientInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RecipientInfo.version",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "version"
            }, {
                name: "RecipientInfo.issuerAndSerial",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "RecipientInfo.issuerAndSerial.issuer",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "issuer"
                }, {
                    name: "RecipientInfo.issuerAndSerial.serialNumber",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.INTEGER,
                    constructed: !1,
                    capture: "serial"
                }]
            }, {
                name: "RecipientInfo.keyEncryptionAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "RecipientInfo.keyEncryptionAlgorithm.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "encAlgorithm"
                }, {
                    name: "RecipientInfo.keyEncryptionAlgorithm.parameter",
                    tagClass: n.Class.UNIVERSAL,
                    constructed: !1,
                    captureAsn1: "encParameter",
                    optional: !0
                }]
            }, {
                name: "RecipientInfo.encryptedKey",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.OCTETSTRING,
                constructed: !1,
                capture: "encKey"
            }]
        }
    }, 4742: (e, t, r) => {
        var i = r(3832);
        r(3068), r(66270), r(97450), r(26953), r(98960), r(55147), r(47629), r(28095), r(97116), r(25414);
        var n = i.asn1, a = e.exports = i.pki = i.pki || {};
        a.pemToDer = function (e) {
            var t = i.pem.decode(e)[0];
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert PEM to DER; PEM is encrypted.");
            return i.util.createBuffer(t.body)
        }, a.privateKeyFromPem = function (e) {
            var t = i.pem.decode(e)[0];
            if ("PRIVATE KEY" !== t.type && "RSA PRIVATE KEY" !== t.type) {
                var r = new Error('Could not convert private key from PEM; PEM header type is not "PRIVATE KEY" or "RSA PRIVATE KEY".');
                throw r.headerType = t.type, r
            }
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert private key from PEM; PEM is encrypted.");
            var s = n.fromDer(t.body);
            return a.privateKeyFromAsn1(s)
        }, a.privateKeyToPem = function (e, t) {
            var r = {type: "RSA PRIVATE KEY", body: n.toDer(a.privateKeyToAsn1(e)).getBytes()};
            return i.pem.encode(r, {maxline: t})
        }, a.privateKeyInfoToPem = function (e, t) {
            var r = {type: "PRIVATE KEY", body: n.toDer(e).getBytes()};
            return i.pem.encode(r, {maxline: t})
        }
    }, 29654: (e, t, r) => {
        var i = r(3832);
        r(97116), r(15764), r(49563), function () {
            if (i.prime) e.exports = i.prime; else {
                var t = e.exports = i.prime = i.prime || {}, r = i.jsbn.BigInteger, n = [6, 4, 2, 4, 2, 4, 6, 2],
                    a = new r(null);
                a.fromInt(30);
                var s = function (e, t) {
                    return e | t
                };
                t.generateProbablePrime = function (e, t, n) {
                    "function" == typeof t && (n = t, t = {});
                    var a = (t = t || {}).algorithm || "PRIMEINC";
                    "string" == typeof a && (a = {name: a}), a.options = a.options || {};
                    var s = t.prng || i.random, c = {
                        nextBytes: function (e) {
                            for (var t = s.getBytesSync(e.length), r = 0; r < e.length; ++r) e[r] = t.charCodeAt(r)
                        }
                    };
                    if ("PRIMEINC" === a.name) return function (e, t, n, a) {
                        if ("workers" in n) return function (e, t, n, a) {
                            if ("undefined" == typeof Worker) return o(e, t, n, a);
                            var s = f(e, t), c = n.workers, d = n.workLoad || 100, u = 30 * d / 8,
                                l = n.workerScript || "forge/prime.worker.js";
                            if (-1 === c) return i.util.estimateCores((function (e, t) {
                                e && (t = 2), c = t - 1, h()
                            }));

                            function h() {
                                c = Math.max(1, c);
                                for (var i = [], n = 0; n < c; ++n) i[n] = new Worker(l);
                                for (n = 0; n < c; ++n) i[n].addEventListener("message", h);
                                var o = !1;

                                function h(n) {
                                    if (!o) {
                                        0;
                                        var c = n.data;
                                        if (c.found) {
                                            for (var l = 0; l < i.length; ++l) i[l].terminate();
                                            return o = !0, a(null, new r(c.prime, 16))
                                        }
                                        s.bitLength() > e && (s = f(e, t));
                                        var h = s.toString(16);
                                        n.target.postMessage({hex: h, workLoad: d}), s.dAddOffset(u, 0)
                                    }
                                }
                            }

                            h()
                        }(e, t, n, a);
                        return o(e, t, n, a)
                    }(e, c, a.options, n);
                    throw new Error("Invalid prime generation algorithm: " + a.name)
                }
            }

            function o(e, t, r, i) {
                var n = f(e, t), a = function (e) {
                    return e <= 100 ? 27 : e <= 150 ? 18 : e <= 200 ? 15 : e <= 250 ? 12 : e <= 300 ? 9 : e <= 350 ? 8 : e <= 400 ? 7 : e <= 500 ? 6 : e <= 600 ? 5 : e <= 800 ? 4 : e <= 1250 ? 3 : 2
                }(n.bitLength());
                "millerRabinTests" in r && (a = r.millerRabinTests);
                var s = 10;
                "maxBlockTime" in r && (s = r.maxBlockTime), c(n, e, t, 0, a, s, i)
            }

            function c(e, t, r, a, s, o, d) {
                var u = +new Date;
                do {
                    if (e.bitLength() > t && (e = f(t, r)), e.isProbablePrime(s)) return d(null, e);
                    e.dAddOffset(n[a++ % 8], 0)
                } while (o < 0 || +new Date - u < o);
                i.util.setImmediate((function () {
                    c(e, t, r, a, s, o, d)
                }))
            }

            function f(e, t) {
                var i = new r(e, t), n = e - 1;
                return i.testBit(n) || i.bitwiseTo(r.ONE.shiftLeft(n), s, i), i.dAddOffset(31 - i.mod(a).byteValue(), 0), i
            }
        }()
    }, 74933: (e, t, r) => {
        var i = r(3832);
        r(97116);
        var n = null;
        !i.util.isNodejs || i.options.usePureJavaScript || process.versions["node-webkit"] || (n = r(25819)), (e.exports = i.prng = i.prng || {}).create = function (e) {
            for (var t = {
                plugin: e,
                key: null,
                seed: null,
                time: null,
                reseeds: 0,
                generated: 0,
                keyBytes: ""
            }, r = e.md, a = new Array(32), s = 0; s < 32; ++s) a[s] = r.create();

            function o() {
                if (t.pools[0].messageLength >= 32) return c();
                var e = 32 - t.pools[0].messageLength << 5;
                t.collect(t.seedFileSync(e)), c()
            }

            function c() {
                t.reseeds = 4294967295 === t.reseeds ? 0 : t.reseeds + 1;
                var e = t.plugin.md.create();
                e.update(t.keyBytes);
                for (var r = 1, i = 0; i < 32; ++i) t.reseeds % r == 0 && (e.update(t.pools[i].digest().getBytes()), t.pools[i].start()), r <<= 1;
                t.keyBytes = e.digest().getBytes(), e.start(), e.update(t.keyBytes);
                var n = e.digest().getBytes();
                t.key = t.plugin.formatKey(t.keyBytes), t.seed = t.plugin.formatSeed(n), t.generated = 0
            }

            function f(e) {
                var t = null, r = i.util.globalScope, n = r.crypto || r.msCrypto;
                n && n.getRandomValues && (t = function (e) {
                    return n.getRandomValues(e)
                });
                var a = i.util.createBuffer();
                if (t) for (; a.length() < e;) {
                    var s = Math.max(1, Math.min(e - a.length(), 65536) / 4), o = new Uint32Array(Math.floor(s));
                    try {
                        t(o);
                        for (var c = 0; c < o.length; ++c) a.putInt32(o[c])
                    } catch (h) {
                        if (!("undefined" != typeof QuotaExceededError && h instanceof QuotaExceededError)) throw h
                    }
                }
                if (a.length() < e) for (var f, d, u, l = Math.floor(65536 * Math.random()); a.length() < e;) {
                    d = 16807 * (65535 & l), d += (32767 & (f = 16807 * (l >> 16))) << 16, l = 4294967295 & (d = (2147483647 & (d += f >> 15)) + (d >> 31));
                    for (c = 0; c < 3; ++c) u = l >>> (c << 3), u ^= Math.floor(256 * Math.random()), a.putByte(255 & u)
                }
                return a.getBytes(e)
            }

            return t.pools = a, t.pool = 0, t.generate = function (e, r) {
                if (!r) return t.generateSync(e);
                var n = t.plugin.cipher, a = t.plugin.increment, s = t.plugin.formatKey, o = t.plugin.formatSeed,
                    f = i.util.createBuffer();
                t.key = null, function d(u) {
                    if (u) return r(u);
                    if (f.length() >= e) return r(null, f.getBytes(e));
                    t.generated > 1048575 && (t.key = null);
                    if (null === t.key) return i.util.nextTick((function () {
                        !function (e) {
                            if (t.pools[0].messageLength >= 32) return c(), e();
                            var r = 32 - t.pools[0].messageLength << 5;
                            t.seedFile(r, (function (r, i) {
                                if (r) return e(r);
                                t.collect(i), c(), e()
                            }))
                        }(d)
                    }));
                    var l = n(t.key, t.seed);
                    t.generated += l.length, f.putBytes(l), t.key = s(n(t.key, a(t.seed))), t.seed = o(n(t.key, t.seed)), i.util.setImmediate(d)
                }()
            }, t.generateSync = function (e) {
                var r = t.plugin.cipher, n = t.plugin.increment, a = t.plugin.formatKey, s = t.plugin.formatSeed;
                t.key = null;
                for (var c = i.util.createBuffer(); c.length() < e;) {
                    t.generated > 1048575 && (t.key = null), null === t.key && o();
                    var f = r(t.key, t.seed);
                    t.generated += f.length, c.putBytes(f), t.key = a(r(t.key, n(t.seed))), t.seed = s(r(t.key, t.seed))
                }
                return c.getBytes(e)
            }, n ? (t.seedFile = function (e, t) {
                n.randomBytes(e, (function (e, r) {
                    if (e) return t(e);
                    t(null, r.toString())
                }))
            }, t.seedFileSync = function (e) {
                return n.randomBytes(e).toString()
            }) : (t.seedFile = function (e, t) {
                try {
                    t(null, f(e))
                } catch (r) {
                    t(r)
                }
            }, t.seedFileSync = f), t.collect = function (e) {
                for (var r = e.length, i = 0; i < r; ++i) t.pools[t.pool].update(e.substr(i, 1)), t.pool = 31 === t.pool ? 0 : t.pool + 1
            }, t.collectInt = function (e, r) {
                for (var i = "", n = 0; n < r; n += 8) i += String.fromCharCode(e >> n & 255);
                t.collect(i)
            }, t.registerWorker = function (e) {
                if (e === self) t.seedFile = function (e, t) {
                    self.addEventListener("message", (function e(r) {
                        var i = r.data;
                        i.forge && i.forge.prng && (self.removeEventListener("message", e), t(i.forge.prng.err, i.forge.prng.bytes))
                    })), self.postMessage({forge: {prng: {needed: e}}})
                }; else {
                    e.addEventListener("message", (function (r) {
                        var i = r.data;
                        i.forge && i.forge.prng && t.seedFile(i.forge.prng.needed, (function (t, r) {
                            e.postMessage({forge: {prng: {err: t, bytes: r}}})
                        }))
                    }))
                }
            }, t
        }
    }, 47629: (e, t, r) => {
        var i = r(3832);
        r(49563), r(97116), (e.exports = i.pss = i.pss || {}).create = function (e) {
            3 === arguments.length && (e = {md: arguments[0], mgf: arguments[1], saltLength: arguments[2]});
            var t, r = e.md, n = e.mgf, a = r.digestLength, s = e.salt || null;
            if ("string" == typeof s && (s = i.util.createBuffer(s)), "saltLength" in e) t = e.saltLength; else {
                if (null === s) throw new Error("Salt length not specified or specific salt not given.");
                t = s.length()
            }
            if (null !== s && s.length() !== t) throw new Error("Given salt length does not match length of given salt.");
            var o = e.prng || i.random, c = {
                encode: function (e, c) {
                    var f, d, u = c - 1, l = Math.ceil(u / 8), h = e.digest().getBytes();
                    if (l < a + t + 2) throw new Error("Message is too long to encrypt.");
                    d = null === s ? o.getBytesSync(t) : s.bytes();
                    var p = new i.util.ByteBuffer;
                    p.fillWithByte(0, 8), p.putBytes(h), p.putBytes(d), r.start(), r.update(p.getBytes());
                    var g = r.digest().getBytes(), y = new i.util.ByteBuffer;
                    y.fillWithByte(0, l - t - a - 2), y.putByte(1), y.putBytes(d);
                    var m = y.getBytes(), v = l - a - 1, b = n.generate(g, v), w = "";
                    for (f = 0; f < v; f++) w += String.fromCharCode(m.charCodeAt(f) ^ b.charCodeAt(f));
                    var E = 65280 >> 8 * l - u & 255;
                    return (w = String.fromCharCode(w.charCodeAt(0) & ~E) + w.substr(1)) + g + String.fromCharCode(188)
                }, verify: function (e, s, o) {
                    var c, f = o - 1, d = Math.ceil(f / 8);
                    if (s = s.substr(-d), d < a + t + 2) throw new Error("Inconsistent parameters to PSS signature verification.");
                    if (188 !== s.charCodeAt(d - 1)) throw new Error("Encoded message does not end in 0xBC.");
                    var u = d - a - 1, l = s.substr(0, u), h = s.substr(u, a), p = 65280 >> 8 * d - f & 255;
                    if (0 != (l.charCodeAt(0) & p)) throw new Error("Bits beyond keysize not zero as expected.");
                    var g = n.generate(h, u), y = "";
                    for (c = 0; c < u; c++) y += String.fromCharCode(l.charCodeAt(c) ^ g.charCodeAt(c));
                    y = String.fromCharCode(y.charCodeAt(0) & ~p) + y.substr(1);
                    var m = d - a - t - 2;
                    for (c = 0; c < m; c++) if (0 !== y.charCodeAt(c)) throw new Error("Leftmost octets not zero as expected");
                    if (1 !== y.charCodeAt(m)) throw new Error("Inconsistent PSS signature, 0x01 marker not found");
                    var v = y.substr(-t), b = new i.util.ByteBuffer;
                    return b.fillWithByte(0, 8), b.putBytes(e), b.putBytes(v), r.start(), r.update(b.getBytes()), h === r.digest().getBytes()
                }
            };
            return c
        }
    }, 49563: (e, t, r) => {
        var i = r(3832);
        r(8925), r(41668), r(74933), r(97116), i.random && i.random.getBytes ? e.exports = i.random : function (t) {
            var r = {}, n = new Array(4), a = i.util.createBuffer();

            function s() {
                var e = i.prng.create(r);
                return e.getBytes = function (t, r) {
                    return e.generate(t, r)
                }, e.getBytesSync = function (t) {
                    return e.generate(t)
                }, e
            }

            r.formatKey = function (e) {
                var t = i.util.createBuffer(e);
                return (e = new Array(4))[0] = t.getInt32(), e[1] = t.getInt32(), e[2] = t.getInt32(), e[3] = t.getInt32(), i.aes._expandKey(e, !1)
            }, r.formatSeed = function (e) {
                var t = i.util.createBuffer(e);
                return (e = new Array(4))[0] = t.getInt32(), e[1] = t.getInt32(), e[2] = t.getInt32(), e[3] = t.getInt32(), e
            }, r.cipher = function (e, t) {
                return i.aes._updateBlock(e, t, n, !1), a.putInt32(n[0]), a.putInt32(n[1]), a.putInt32(n[2]), a.putInt32(n[3]), a.getBytes()
            }, r.increment = function (e) {
                return ++e[3], e
            }, r.md = i.md.sha256;
            var o = s(), c = null, f = i.util.globalScope, d = f.crypto || f.msCrypto;
            if (d && d.getRandomValues && (c = function (e) {
                return d.getRandomValues(e)
            }), i.options.usePureJavaScript || !i.util.isNodejs && !c) {
                if ("undefined" == typeof window || window.document, o.collectInt(+new Date, 32), "undefined" != typeof navigator) {
                    var u = "";
                    for (var l in navigator) try {
                        "string" == typeof navigator[l] && (u += navigator[l])
                    } catch (h) {
                    }
                    o.collect(u), u = null
                }
                t && (t().mousemove((function (e) {
                    o.collectInt(e.clientX, 16), o.collectInt(e.clientY, 16)
                })), t().keypress((function (e) {
                    o.collectInt(e.charCode, 8)
                })))
            }
            if (i.random) for (var l in o) i.random[l] = o[l]; else i.random = o;
            i.random.createInstance = s, e.exports = i.random
        }("undefined" != typeof jQuery ? jQuery : null)
    }, 69372: (e, t, r) => {
        var i = r(3832);
        r(97116);
        var n = [217, 120, 249, 196, 25, 221, 181, 237, 40, 233, 253, 121, 74, 160, 216, 157, 198, 126, 55, 131, 43, 118, 83, 142, 98, 76, 100, 136, 68, 139, 251, 162, 23, 154, 89, 245, 135, 179, 79, 19, 97, 69, 109, 141, 9, 129, 125, 50, 189, 143, 64, 235, 134, 183, 123, 11, 240, 149, 33, 34, 92, 107, 78, 130, 84, 214, 101, 147, 206, 96, 178, 28, 115, 86, 192, 20, 167, 140, 241, 220, 18, 117, 202, 31, 59, 190, 228, 209, 66, 61, 212, 48, 163, 60, 182, 38, 111, 191, 14, 218, 70, 105, 7, 87, 39, 242, 29, 155, 188, 148, 67, 3, 248, 17, 199, 246, 144, 239, 62, 231, 6, 195, 213, 47, 200, 102, 30, 215, 8, 232, 234, 222, 128, 82, 238, 247, 132, 170, 114, 172, 53, 77, 106, 42, 150, 26, 210, 113, 90, 21, 73, 116, 75, 159, 208, 94, 4, 24, 164, 236, 194, 224, 65, 110, 15, 81, 203, 204, 36, 145, 175, 80, 161, 244, 112, 57, 153, 124, 58, 133, 35, 184, 180, 122, 252, 2, 54, 91, 37, 85, 151, 49, 45, 93, 250, 152, 227, 138, 146, 174, 5, 223, 41, 16, 103, 108, 186, 201, 211, 0, 230, 207, 225, 158, 168, 44, 99, 22, 1, 63, 88, 226, 137, 169, 13, 56, 52, 27, 171, 51, 255, 176, 187, 72, 12, 95, 185, 177, 205, 46, 197, 243, 219, 71, 229, 165, 156, 119, 10, 166, 32, 104, 254, 127, 193, 173],
            a = [1, 2, 3, 5], s = function (e, t) {
                return e << t & 65535 | (65535 & e) >> 16 - t
            }, o = function (e, t) {
                return (65535 & e) >> t | e << 16 - t & 65535
            };
        e.exports = i.rc2 = i.rc2 || {}, i.rc2.expandKey = function (e, t) {
            "string" == typeof e && (e = i.util.createBuffer(e)), t = t || 128;
            var r, a = e, s = e.length(), o = t, c = Math.ceil(o / 8), f = 255 >> (7 & o);
            for (r = s; r < 128; r++) a.putByte(n[a.at(r - 1) + a.at(r - s) & 255]);
            for (a.setAt(128 - c, n[a.at(128 - c) & f]), r = 127 - c; r >= 0; r--) a.setAt(r, n[a.at(r + 1) ^ a.at(r + c)]);
            return a
        };
        var c = function (e, t, r) {
            var n, c, f, d, u = !1, l = null, h = null, p = null, g = [];
            for (e = i.rc2.expandKey(e, t), f = 0; f < 64; f++) g.push(e.getInt16Le());
            r ? (n = function (e) {
                for (f = 0; f < 4; f++) e[f] += g[d] + (e[(f + 3) % 4] & e[(f + 2) % 4]) + (~e[(f + 3) % 4] & e[(f + 1) % 4]), e[f] = s(e[f], a[f]), d++
            }, c = function (e) {
                for (f = 0; f < 4; f++) e[f] += g[63 & e[(f + 3) % 4]]
            }) : (n = function (e) {
                for (f = 3; f >= 0; f--) e[f] = o(e[f], a[f]), e[f] -= g[d] + (e[(f + 3) % 4] & e[(f + 2) % 4]) + (~e[(f + 3) % 4] & e[(f + 1) % 4]), d--
            }, c = function (e) {
                for (f = 3; f >= 0; f--) e[f] -= g[63 & e[(f + 3) % 4]]
            });
            var y = function (e) {
                var t = [];
                for (f = 0; f < 4; f++) {
                    var i = l.getInt16Le();
                    null !== p && (r ? i ^= p.getInt16Le() : p.putInt16Le(i)), t.push(65535 & i)
                }
                d = r ? 0 : 63;
                for (var n = 0; n < e.length; n++) for (var a = 0; a < e[n][0]; a++) e[n][1](t);
                for (f = 0; f < 4; f++) null !== p && (r ? p.putInt16Le(t[f]) : t[f] ^= p.getInt16Le()), h.putInt16Le(t[f])
            }, m = null;
            return m = {
                start: function (e, t) {
                    e && "string" == typeof e && (e = i.util.createBuffer(e)), u = !1, l = i.util.createBuffer(), h = t || new i.util.createBuffer, p = e, m.output = h
                }, update: function (e) {
                    for (u || l.putBuffer(e); l.length() >= 8;) y([[5, n], [1, c], [6, n], [1, c], [5, n]])
                }, finish: function (e) {
                    var t = !0;
                    if (r) if (e) t = e(8, l, !r); else {
                        var i = 8 === l.length() ? 8 : 8 - l.length();
                        l.fillWithByte(i, i)
                    }
                    if (t && (u = !0, m.update()), !r && (t = 0 === l.length())) if (e) t = e(8, h, !r); else {
                        var n = h.length(), a = h.at(n - 1);
                        a > n ? t = !1 : h.truncate(a)
                    }
                    return t
                }
            }
        };
        i.rc2.startEncrypting = function (e, t, r) {
            var n = i.rc2.createEncryptionCipher(e, 128);
            return n.start(t, r), n
        }, i.rc2.createEncryptionCipher = function (e, t) {
            return c(e, t, !0)
        }, i.rc2.startDecrypting = function (e, t, r) {
            var n = i.rc2.createDecryptionCipher(e, 128);
            return n.start(t, r), n
        }, i.rc2.createDecryptionCipher = function (e, t) {
            return c(e, t, !1)
        }
    }, 28095: (e, t, r) => {
        var i = r(3832);
        if (r(3068), r(15764), r(66270), r(18936), r(29654), r(49563), r(97116), void 0 === n) var n = i.jsbn.BigInteger;
        var a = i.util.isNodejs ? r(25819) : null, s = i.asn1, o = i.util;
        i.pki = i.pki || {}, e.exports = i.pki.rsa = i.rsa = i.rsa || {};
        var c = i.pki, f = [6, 4, 2, 4, 2, 4, 6, 2], d = {
            name: "PrivateKeyInfo",
            tagClass: s.Class.UNIVERSAL,
            type: s.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "PrivateKeyInfo.version",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyVersion"
            }, {
                name: "PrivateKeyInfo.privateKeyAlgorithm",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: s.Class.UNIVERSAL,
                    type: s.Type.OID,
                    constructed: !1,
                    capture: "privateKeyOid"
                }]
            }, {
                name: "PrivateKeyInfo",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.OCTETSTRING,
                constructed: !1,
                capture: "privateKey"
            }]
        }, u = {
            name: "RSAPrivateKey",
            tagClass: s.Class.UNIVERSAL,
            type: s.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RSAPrivateKey.version",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyVersion"
            }, {
                name: "RSAPrivateKey.modulus",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyModulus"
            }, {
                name: "RSAPrivateKey.publicExponent",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPublicExponent"
            }, {
                name: "RSAPrivateKey.privateExponent",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrivateExponent"
            }, {
                name: "RSAPrivateKey.prime1",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrime1"
            }, {
                name: "RSAPrivateKey.prime2",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyPrime2"
            }, {
                name: "RSAPrivateKey.exponent1",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyExponent1"
            }, {
                name: "RSAPrivateKey.exponent2",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyExponent2"
            }, {
                name: "RSAPrivateKey.coefficient",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "privateKeyCoefficient"
            }]
        }, l = {
            name: "RSAPublicKey",
            tagClass: s.Class.UNIVERSAL,
            type: s.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "RSAPublicKey.modulus",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "publicKeyModulus"
            }, {
                name: "RSAPublicKey.exponent",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.INTEGER,
                constructed: !1,
                capture: "publicKeyExponent"
            }]
        }, h = i.pki.rsa.publicKeyValidator = {
            name: "SubjectPublicKeyInfo",
            tagClass: s.Class.UNIVERSAL,
            type: s.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "subjectPublicKeyInfo",
            value: [{
                name: "SubjectPublicKeyInfo.AlgorithmIdentifier",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "AlgorithmIdentifier.algorithm",
                    tagClass: s.Class.UNIVERSAL,
                    type: s.Type.OID,
                    constructed: !1,
                    capture: "publicKeyOid"
                }]
            }, {
                name: "SubjectPublicKeyInfo.subjectPublicKey",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.BITSTRING,
                constructed: !1,
                value: [{
                    name: "SubjectPublicKeyInfo.subjectPublicKey.RSAPublicKey",
                    tagClass: s.Class.UNIVERSAL,
                    type: s.Type.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    captureAsn1: "rsaPublicKey"
                }]
            }]
        }, p = {
            name: "DigestInfo",
            tagClass: s.Class.UNIVERSAL,
            type: s.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "DigestInfo.DigestAlgorithm",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "DigestInfo.DigestAlgorithm.algorithmIdentifier",
                    tagClass: s.Class.UNIVERSAL,
                    type: s.Type.OID,
                    constructed: !1,
                    capture: "algorithmIdentifier"
                }, {
                    name: "DigestInfo.DigestAlgorithm.parameters",
                    tagClass: s.Class.UNIVERSAL,
                    type: s.Type.NULL,
                    capture: "parameters",
                    optional: !0,
                    constructed: !1
                }]
            }, {
                name: "DigestInfo.digest",
                tagClass: s.Class.UNIVERSAL,
                type: s.Type.OCTETSTRING,
                constructed: !1,
                capture: "digest"
            }]
        }, g = function (e) {
            var t;
            if (!(e.algorithm in c.oids)) {
                var r = new Error("Unknown message digest algorithm.");
                throw r.algorithm = e.algorithm, r
            }
            t = c.oids[e.algorithm];
            var i = s.oidToDer(t).getBytes(), n = s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, !0, []),
                a = s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, !0, []);
            a.value.push(s.create(s.Class.UNIVERSAL, s.Type.OID, !1, i)), a.value.push(s.create(s.Class.UNIVERSAL, s.Type.NULL, !1, ""));
            var o = s.create(s.Class.UNIVERSAL, s.Type.OCTETSTRING, !1, e.digest().getBytes());
            return n.value.push(a), n.value.push(o), s.toDer(n).getBytes()
        }, y = function (e, t, r) {
            if (r) return e.modPow(t.e, t.n);
            if (!t.p || !t.q) return e.modPow(t.d, t.n);
            var a;
            t.dP || (t.dP = t.d.mod(t.p.subtract(n.ONE))), t.dQ || (t.dQ = t.d.mod(t.q.subtract(n.ONE))), t.qInv || (t.qInv = t.q.modInverse(t.p));
            do {
                a = new n(i.util.bytesToHex(i.random.getBytes(t.n.bitLength() / 8)), 16)
            } while (a.compareTo(t.n) >= 0 || !a.gcd(t.n).equals(n.ONE));
            for (var s = (e = e.multiply(a.modPow(t.e, t.n)).mod(t.n)).mod(t.p).modPow(t.dP, t.p), o = e.mod(t.q).modPow(t.dQ, t.q); s.compareTo(o) < 0;) s = s.add(t.p);
            var c = s.subtract(o).multiply(t.qInv).mod(t.p).multiply(t.q).add(o);
            return c = c.multiply(a.modInverse(t.n)).mod(t.n)
        };

        function m(e, t, r) {
            var n = i.util.createBuffer(), a = Math.ceil(t.n.bitLength() / 8);
            if (e.length > a - 11) {
                var s = new Error("Message is too long for PKCS#1 v1.5 padding.");
                throw s.length = e.length, s.max = a - 11, s
            }
            n.putByte(0), n.putByte(r);
            var o, c = a - 3 - e.length;
            if (0 === r || 1 === r) {
                o = 0 === r ? 0 : 255;
                for (var f = 0; f < c; ++f) n.putByte(o)
            } else for (; c > 0;) {
                var d = 0, u = i.random.getBytes(c);
                for (f = 0; f < c; ++f) 0 === (o = u.charCodeAt(f)) ? ++d : n.putByte(o);
                c = d
            }
            return n.putByte(0), n.putBytes(e), n
        }

        function v(e, t, r, n) {
            var a = Math.ceil(t.n.bitLength() / 8), s = i.util.createBuffer(e), o = s.getByte(), c = s.getByte();
            if (0 !== o || r && 0 !== c && 1 !== c || !r && 2 != c || r && 0 === c && void 0 === n) throw new Error("Encryption block is invalid.");
            var f = 0;
            if (0 === c) {
                f = a - 3 - n;
                for (var d = 0; d < f; ++d) if (0 !== s.getByte()) throw new Error("Encryption block is invalid.")
            } else if (1 === c) for (f = 0; s.length() > 1;) {
                if (255 !== s.getByte()) {
                    --s.read;
                    break
                }
                ++f
            } else if (2 === c) for (f = 0; s.length() > 1;) {
                if (0 === s.getByte()) {
                    --s.read;
                    break
                }
                ++f
            }
            if (0 !== s.getByte() || f !== a - 3 - s.length()) throw new Error("Encryption block is invalid.");
            return s.getBytes()
        }

        function b(e) {
            var t = e.toString(16);
            t[0] >= "8" && (t = "00" + t);
            var r = i.util.hexToBytes(t);
            return r.length > 1 && (0 === r.charCodeAt(0) && 0 == (128 & r.charCodeAt(1)) || 255 === r.charCodeAt(0) && 128 == (128 & r.charCodeAt(1))) ? r.substr(1) : r
        }

        function w(e) {
            return e <= 100 ? 27 : e <= 150 ? 18 : e <= 200 ? 15 : e <= 250 ? 12 : e <= 300 ? 9 : e <= 350 ? 8 : e <= 400 ? 7 : e <= 500 ? 6 : e <= 600 ? 5 : e <= 800 ? 4 : e <= 1250 ? 3 : 2
        }

        function E(e) {
            return i.util.isNodejs && "function" == typeof a[e]
        }

        function C(e) {
            return void 0 !== o.globalScope && "object" == typeof o.globalScope.crypto && "object" == typeof o.globalScope.crypto.subtle && "function" == typeof o.globalScope.crypto.subtle[e]
        }

        function S(e) {
            return void 0 !== o.globalScope && "object" == typeof o.globalScope.msCrypto && "object" == typeof o.globalScope.msCrypto.subtle && "function" == typeof o.globalScope.msCrypto.subtle[e]
        }

        function I(e) {
            for (var t = i.util.hexToBytes(e.toString(16)), r = new Uint8Array(t.length), n = 0; n < t.length; ++n) r[n] = t.charCodeAt(n);
            return r
        }

        c.rsa.encrypt = function (e, t, r) {
            var a, s = r, o = Math.ceil(t.n.bitLength() / 8);
            !1 !== r && !0 !== r ? (s = 2 === r, a = m(e, t, r)) : (a = i.util.createBuffer()).putBytes(e);
            for (var c = new n(a.toHex(), 16), f = y(c, t, s).toString(16), d = i.util.createBuffer(), u = o - Math.ceil(f.length / 2); u > 0;) d.putByte(0), --u;
            return d.putBytes(i.util.hexToBytes(f)), d.getBytes()
        }, c.rsa.decrypt = function (e, t, r, a) {
            var s = Math.ceil(t.n.bitLength() / 8);
            if (e.length !== s) {
                var o = new Error("Encrypted message length is invalid.");
                throw o.length = e.length, o.expected = s, o
            }
            var c = new n(i.util.createBuffer(e).toHex(), 16);
            if (c.compareTo(t.n) >= 0) throw new Error("Encrypted message is invalid.");
            for (var f = y(c, t, r).toString(16), d = i.util.createBuffer(), u = s - Math.ceil(f.length / 2); u > 0;) d.putByte(0), --u;
            return d.putBytes(i.util.hexToBytes(f)), !1 !== a ? v(d.getBytes(), t, r) : d.getBytes()
        }, c.rsa.createKeyPairGenerationState = function (e, t, r) {
            "string" == typeof e && (e = parseInt(e, 10)), e = e || 2048;
            var a, s = (r = r || {}).prng || i.random, o = {
                nextBytes: function (e) {
                    for (var t = s.getBytesSync(e.length), r = 0; r < e.length; ++r) e[r] = t.charCodeAt(r)
                }
            }, c = r.algorithm || "PRIMEINC";
            if ("PRIMEINC" !== c) throw new Error("Invalid key generation algorithm: " + c);
            return (a = {
                algorithm: c,
                state: 0,
                bits: e,
                rng: o,
                eInt: t || 65537,
                e: new n(null),
                p: null,
                q: null,
                qBits: e >> 1,
                pBits: e - (e >> 1),
                pqState: 0,
                num: null,
                keys: null
            }).e.fromInt(a.eInt), a
        }, c.rsa.stepKeyPairGenerationState = function (e, t) {
            "algorithm" in e || (e.algorithm = "PRIMEINC");
            var r = new n(null);
            r.fromInt(30);
            for (var i, a = 0, s = function (e, t) {
                return e | t
            }, o = +new Date, d = 0; null === e.keys && (t <= 0 || d < t);) {
                if (0 === e.state) {
                    var u = null === e.p ? e.pBits : e.qBits, l = u - 1;
                    0 === e.pqState ? (e.num = new n(u, e.rng), e.num.testBit(l) || e.num.bitwiseTo(n.ONE.shiftLeft(l), s, e.num), e.num.dAddOffset(31 - e.num.mod(r).byteValue(), 0), a = 0, ++e.pqState) : 1 === e.pqState ? e.num.bitLength() > u ? e.pqState = 0 : e.num.isProbablePrime(w(e.num.bitLength())) ? ++e.pqState : e.num.dAddOffset(f[a++ % 8], 0) : 2 === e.pqState ? e.pqState = 0 === e.num.subtract(n.ONE).gcd(e.e).compareTo(n.ONE) ? 3 : 0 : 3 === e.pqState && (e.pqState = 0, null === e.p ? e.p = e.num : e.q = e.num, null !== e.p && null !== e.q && ++e.state, e.num = null)
                } else if (1 === e.state) e.p.compareTo(e.q) < 0 && (e.num = e.p, e.p = e.q, e.q = e.num), ++e.state; else if (2 === e.state) e.p1 = e.p.subtract(n.ONE), e.q1 = e.q.subtract(n.ONE), e.phi = e.p1.multiply(e.q1), ++e.state; else if (3 === e.state) 0 === e.phi.gcd(e.e).compareTo(n.ONE) ? ++e.state : (e.p = null, e.q = null, e.state = 0); else if (4 === e.state) e.n = e.p.multiply(e.q), e.n.bitLength() === e.bits ? ++e.state : (e.q = null, e.state = 0); else if (5 === e.state) {
                    var h = e.e.modInverse(e.phi);
                    e.keys = {
                        privateKey: c.rsa.setPrivateKey(e.n, e.e, h, e.p, e.q, h.mod(e.p1), h.mod(e.q1), e.q.modInverse(e.p)),
                        publicKey: c.rsa.setPublicKey(e.n, e.e)
                    }
                }
                d += (i = +new Date) - o, o = i
            }
            return null !== e.keys
        }, c.rsa.generateKeyPair = function (e, t, r, f) {
            if (1 === arguments.length ? "object" == typeof e ? (r = e, e = void 0) : "function" == typeof e && (f = e, e = void 0) : 2 === arguments.length ? "number" == typeof e ? "function" == typeof t ? (f = t, t = void 0) : "number" != typeof t && (r = t, t = void 0) : (r = e, f = t, e = void 0, t = void 0) : 3 === arguments.length && ("number" == typeof t ? "function" == typeof r && (f = r, r = void 0) : (f = r, r = t, t = void 0)), r = r || {}, void 0 === e && (e = r.bits || 2048), void 0 === t && (t = r.e || 65537), !i.options.usePureJavaScript && !r.prng && e >= 256 && e <= 16384 && (65537 === t || 3 === t)) if (f) {
                if (E("generateKeyPair")) return a.generateKeyPair("rsa", {
                    modulusLength: e,
                    publicExponent: t,
                    publicKeyEncoding: {type: "spki", format: "pem"},
                    privateKeyEncoding: {type: "pkcs8", format: "pem"}
                }, (function (e, t, r) {
                    if (e) return f(e);
                    f(null, {privateKey: c.privateKeyFromPem(r), publicKey: c.publicKeyFromPem(t)})
                }));
                if (C("generateKey") && C("exportKey")) return o.globalScope.crypto.subtle.generateKey({
                    name: "RSASSA-PKCS1-v1_5",
                    modulusLength: e,
                    publicExponent: I(t),
                    hash: {name: "SHA-256"}
                }, !0, ["sign", "verify"]).then((function (e) {
                    return o.globalScope.crypto.subtle.exportKey("pkcs8", e.privateKey)
                })).then(void 0, (function (e) {
                    f(e)
                })).then((function (e) {
                    if (e) {
                        var t = c.privateKeyFromAsn1(s.fromDer(i.util.createBuffer(e)));
                        f(null, {privateKey: t, publicKey: c.setRsaPublicKey(t.n, t.e)})
                    }
                }));
                if (S("generateKey") && S("exportKey")) {
                    var d = o.globalScope.msCrypto.subtle.generateKey({
                        name: "RSASSA-PKCS1-v1_5",
                        modulusLength: e,
                        publicExponent: I(t),
                        hash: {name: "SHA-256"}
                    }, !0, ["sign", "verify"]);
                    return d.oncomplete = function (e) {
                        var t = e.target.result, r = o.globalScope.msCrypto.subtle.exportKey("pkcs8", t.privateKey);
                        r.oncomplete = function (e) {
                            var t = e.target.result, r = c.privateKeyFromAsn1(s.fromDer(i.util.createBuffer(t)));
                            f(null, {privateKey: r, publicKey: c.setRsaPublicKey(r.n, r.e)})
                        }, r.onerror = function (e) {
                            f(e)
                        }
                    }, void (d.onerror = function (e) {
                        f(e)
                    })
                }
            } else if (E("generateKeyPairSync")) {
                var u = a.generateKeyPairSync("rsa", {
                    modulusLength: e,
                    publicExponent: t,
                    publicKeyEncoding: {type: "spki", format: "pem"},
                    privateKeyEncoding: {type: "pkcs8", format: "pem"}
                });
                return {privateKey: c.privateKeyFromPem(u.privateKey), publicKey: c.publicKeyFromPem(u.publicKey)}
            }
            var l = c.rsa.createKeyPairGenerationState(e, t, r);
            if (!f) return c.rsa.stepKeyPairGenerationState(l, 0), l.keys;
            !function (e, t, r) {
                "function" == typeof t && (r = t, t = {});
                t = t || {};
                var a = {
                    algorithm: {
                        name: t.algorithm || "PRIMEINC",
                        options: {workers: t.workers || 2, workLoad: t.workLoad || 100, workerScript: t.workerScript}
                    }
                };
                "prng" in t && (a.prng = t.prng);

                function s() {
                    o(e.pBits, (function (t, i) {
                        return t ? r(t) : (e.p = i, null !== e.q ? f(t, e.q) : void o(e.qBits, f))
                    }))
                }

                function o(e, t) {
                    i.prime.generateProbablePrime(e, a, t)
                }

                function f(t, i) {
                    if (t) return r(t);
                    if (e.q = i, e.p.compareTo(e.q) < 0) {
                        var a = e.p;
                        e.p = e.q, e.q = a
                    }
                    if (0 !== e.p.subtract(n.ONE).gcd(e.e).compareTo(n.ONE)) return e.p = null, void s();
                    if (0 !== e.q.subtract(n.ONE).gcd(e.e).compareTo(n.ONE)) return e.q = null, void o(e.qBits, f);
                    if (e.p1 = e.p.subtract(n.ONE), e.q1 = e.q.subtract(n.ONE), e.phi = e.p1.multiply(e.q1), 0 !== e.phi.gcd(e.e).compareTo(n.ONE)) return e.p = e.q = null, void s();
                    if (e.n = e.p.multiply(e.q), e.n.bitLength() !== e.bits) return e.q = null, void o(e.qBits, f);
                    var d = e.e.modInverse(e.phi);
                    e.keys = {
                        privateKey: c.rsa.setPrivateKey(e.n, e.e, d, e.p, e.q, d.mod(e.p1), d.mod(e.q1), e.q.modInverse(e.p)),
                        publicKey: c.rsa.setPublicKey(e.n, e.e)
                    }, r(null, e.keys)
                }

                s()
            }(l, r, f)
        }, c.setRsaPublicKey = c.rsa.setPublicKey = function (e, t) {
            var r = {
                n: e, e: t, encrypt: function (e, t, n) {
                    if ("string" == typeof t ? t = t.toUpperCase() : void 0 === t && (t = "RSAES-PKCS1-V1_5"), "RSAES-PKCS1-V1_5" === t) t = {
                        encode: function (e, t, r) {
                            return m(e, t, 2).getBytes()
                        }
                    }; else if ("RSA-OAEP" === t || "RSAES-OAEP" === t) t = {
                        encode: function (e, t) {
                            return i.pkcs1.encode_rsa_oaep(t, e, n)
                        }
                    }; else if (-1 !== ["RAW", "NONE", "NULL", null].indexOf(t)) t = {
                        encode: function (e) {
                            return e
                        }
                    }; else if ("string" == typeof t) throw new Error('Unsupported encryption scheme: "' + t + '".');
                    var a = t.encode(e, r, !0);
                    return c.rsa.encrypt(a, r, !0)
                }, verify: function (e, t, n, a) {
                    "string" == typeof n ? n = n.toUpperCase() : void 0 === n && (n = "RSASSA-PKCS1-V1_5"), void 0 === a && (a = {_parseAllDigestBytes: !0}), "_parseAllDigestBytes" in a || (a._parseAllDigestBytes = !0), "RSASSA-PKCS1-V1_5" === n ? n = {
                        verify: function (e, t) {
                            t = v(t, r, !0);
                            var n = s.fromDer(t, {parseAllBytes: a._parseAllDigestBytes}), o = {}, c = [];
                            if (!s.validate(n, p, o, c)) throw(f = new Error("ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value.")).errors = c, f;
                            var f, d = s.derToOid(o.algorithmIdentifier);
                            if (d !== i.oids.md2 && d !== i.oids.md5 && d !== i.oids.sha1 && d !== i.oids.sha224 && d !== i.oids.sha256 && d !== i.oids.sha384 && d !== i.oids.sha512 && d !== i.oids["sha512-224"] && d !== i.oids["sha512-256"]) throw(f = new Error("Unknown RSASSA-PKCS1-v1_5 DigestAlgorithm identifier.")).oid = d, f;
                            if ((d === i.oids.md2 || d === i.oids.md5) && !("parameters" in o)) throw new Error("ASN.1 object does not contain a valid RSASSA-PKCS1-v1_5 DigestInfo value. Missing algorithm identifer NULL parameters.");
                            return e === o.digest
                        }
                    } : "NONE" !== n && "NULL" !== n && null !== n || (n = {
                        verify: function (e, t) {
                            return e === (t = v(t, r, !0))
                        }
                    });
                    var o = c.rsa.decrypt(t, r, !0, !1);
                    return n.verify(e, o, r.n.bitLength())
                }
            };
            return r
        }, c.setRsaPrivateKey = c.rsa.setPrivateKey = function (e, t, r, n, a, s, o, f) {
            var d = {
                n: e, e: t, d: r, p: n, q: a, dP: s, dQ: o, qInv: f, decrypt: function (e, t, r) {
                    "string" == typeof t ? t = t.toUpperCase() : void 0 === t && (t = "RSAES-PKCS1-V1_5");
                    var n = c.rsa.decrypt(e, d, !1, !1);
                    if ("RSAES-PKCS1-V1_5" === t) t = {decode: v}; else if ("RSA-OAEP" === t || "RSAES-OAEP" === t) t = {
                        decode: function (e, t) {
                            return i.pkcs1.decode_rsa_oaep(t, e, r)
                        }
                    }; else {
                        if (-1 === ["RAW", "NONE", "NULL", null].indexOf(t)) throw new Error('Unsupported encryption scheme: "' + t + '".');
                        t = {
                            decode: function (e) {
                                return e
                            }
                        }
                    }
                    return t.decode(n, d, !1)
                }, sign: function (e, t) {
                    var r = !1;
                    "string" == typeof t && (t = t.toUpperCase()), void 0 === t || "RSASSA-PKCS1-V1_5" === t ? (t = {encode: g}, r = 1) : "NONE" !== t && "NULL" !== t && null !== t || (t = {
                        encode: function () {
                            return e
                        }
                    }, r = 1);
                    var i = t.encode(e, d.n.bitLength());
                    return c.rsa.encrypt(i, d, r)
                }
            };
            return d
        }, c.wrapRsaPrivateKey = function (e) {
            return s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, !0, [s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, s.integerToDer(0).getBytes()), s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, !0, [s.create(s.Class.UNIVERSAL, s.Type.OID, !1, s.oidToDer(c.oids.rsaEncryption).getBytes()), s.create(s.Class.UNIVERSAL, s.Type.NULL, !1, "")]), s.create(s.Class.UNIVERSAL, s.Type.OCTETSTRING, !1, s.toDer(e).getBytes())])
        }, c.privateKeyFromAsn1 = function (e) {
            var t, r, a, o, f, l, h, p, g = {}, y = [];
            if (s.validate(e, d, g, y) && (e = s.fromDer(i.util.createBuffer(g.privateKey))), g = {}, y = [], !s.validate(e, u, g, y)) {
                var m = new Error("Cannot read private key. ASN.1 object does not contain an RSAPrivateKey.");
                throw m.errors = y, m
            }
            return t = i.util.createBuffer(g.privateKeyModulus).toHex(), r = i.util.createBuffer(g.privateKeyPublicExponent).toHex(), a = i.util.createBuffer(g.privateKeyPrivateExponent).toHex(), o = i.util.createBuffer(g.privateKeyPrime1).toHex(), f = i.util.createBuffer(g.privateKeyPrime2).toHex(), l = i.util.createBuffer(g.privateKeyExponent1).toHex(), h = i.util.createBuffer(g.privateKeyExponent2).toHex(), p = i.util.createBuffer(g.privateKeyCoefficient).toHex(), c.setRsaPrivateKey(new n(t, 16), new n(r, 16), new n(a, 16), new n(o, 16), new n(f, 16), new n(l, 16), new n(h, 16), new n(p, 16))
        }, c.privateKeyToAsn1 = c.privateKeyToRSAPrivateKey = function (e) {
            return s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, !0, [s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, s.integerToDer(0).getBytes()), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.n)), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.e)), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.d)), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.p)), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.q)), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.dP)), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.dQ)), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.qInv))])
        }, c.publicKeyFromAsn1 = function (e) {
            var t = {}, r = [];
            if (s.validate(e, h, t, r)) {
                var a, o = s.derToOid(t.publicKeyOid);
                if (o !== c.oids.rsaEncryption) throw(a = new Error("Cannot read public key. Unknown OID.")).oid = o, a;
                e = t.rsaPublicKey
            }
            if (r = [], !s.validate(e, l, t, r)) throw(a = new Error("Cannot read public key. ASN.1 object does not contain an RSAPublicKey.")).errors = r, a;
            var f = i.util.createBuffer(t.publicKeyModulus).toHex(),
                d = i.util.createBuffer(t.publicKeyExponent).toHex();
            return c.setRsaPublicKey(new n(f, 16), new n(d, 16))
        }, c.publicKeyToAsn1 = c.publicKeyToSubjectPublicKeyInfo = function (e) {
            return s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, !0, [s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, !0, [s.create(s.Class.UNIVERSAL, s.Type.OID, !1, s.oidToDer(c.oids.rsaEncryption).getBytes()), s.create(s.Class.UNIVERSAL, s.Type.NULL, !1, "")]), s.create(s.Class.UNIVERSAL, s.Type.BITSTRING, !1, [c.publicKeyToRSAPublicKey(e)])])
        }, c.publicKeyToRSAPublicKey = function (e) {
            return s.create(s.Class.UNIVERSAL, s.Type.SEQUENCE, !0, [s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.n)), s.create(s.Class.UNIVERSAL, s.Type.INTEGER, !1, b(e.e))])
        }
    }, 137: (e, t, r) => {
        var i = r(3832);
        r(28991), r(97116);
        var n = e.exports = i.sha1 = i.sha1 || {};
        i.md.sha1 = i.md.algorithms.sha1 = n, n.create = function () {
            s || (a = String.fromCharCode(128), a += i.util.fillString(String.fromCharCode(0), 64), s = !0);
            var e = null, t = i.util.createBuffer(), r = new Array(80), n = {
                algorithm: "sha1",
                blockLength: 64,
                digestLength: 20,
                messageLength: 0,
                fullMessageLength: null,
                messageLengthSize: 8,
                start: function () {
                    n.messageLength = 0, n.fullMessageLength = n.messageLength64 = [];
                    for (var r = n.messageLengthSize / 4, a = 0; a < r; ++a) n.fullMessageLength.push(0);
                    return t = i.util.createBuffer(), e = {
                        h0: 1732584193,
                        h1: 4023233417,
                        h2: 2562383102,
                        h3: 271733878,
                        h4: 3285377520
                    }, n
                }
            };
            return n.start(), n.update = function (a, s) {
                "utf8" === s && (a = i.util.encodeUtf8(a));
                var c = a.length;
                n.messageLength += c, c = [c / 4294967296 >>> 0, c >>> 0];
                for (var f = n.fullMessageLength.length - 1; f >= 0; --f) n.fullMessageLength[f] += c[1], c[1] = c[0] + (n.fullMessageLength[f] / 4294967296 >>> 0), n.fullMessageLength[f] = n.fullMessageLength[f] >>> 0, c[0] = c[1] / 4294967296 >>> 0;
                return t.putBytes(a), o(e, r, t), (t.read > 2048 || 0 === t.length()) && t.compact(), n
            }, n.digest = function () {
                var s = i.util.createBuffer();
                s.putBytes(t.bytes());
                var c,
                    f = n.fullMessageLength[n.fullMessageLength.length - 1] + n.messageLengthSize & n.blockLength - 1;
                s.putBytes(a.substr(0, n.blockLength - f));
                for (var d = 8 * n.fullMessageLength[0], u = 0; u < n.fullMessageLength.length - 1; ++u) d += (c = 8 * n.fullMessageLength[u + 1]) / 4294967296 >>> 0, s.putInt32(d >>> 0), d = c >>> 0;
                s.putInt32(d);
                var l = {h0: e.h0, h1: e.h1, h2: e.h2, h3: e.h3, h4: e.h4};
                o(l, r, s);
                var h = i.util.createBuffer();
                return h.putInt32(l.h0), h.putInt32(l.h1), h.putInt32(l.h2), h.putInt32(l.h3), h.putInt32(l.h4), h
            }, n
        };
        var a = null, s = !1;

        function o(e, t, r) {
            for (var i, n, a, s, o, c, f, d = r.length(); d >= 64;) {
                for (n = e.h0, a = e.h1, s = e.h2, o = e.h3, c = e.h4, f = 0; f < 16; ++f) i = r.getInt32(), t[f] = i, i = (n << 5 | n >>> 27) + (o ^ a & (s ^ o)) + c + 1518500249 + i, c = o, o = s, s = (a << 30 | a >>> 2) >>> 0, a = n, n = i;
                for (; f < 20; ++f) i = (i = t[f - 3] ^ t[f - 8] ^ t[f - 14] ^ t[f - 16]) << 1 | i >>> 31, t[f] = i, i = (n << 5 | n >>> 27) + (o ^ a & (s ^ o)) + c + 1518500249 + i, c = o, o = s, s = (a << 30 | a >>> 2) >>> 0, a = n, n = i;
                for (; f < 32; ++f) i = (i = t[f - 3] ^ t[f - 8] ^ t[f - 14] ^ t[f - 16]) << 1 | i >>> 31, t[f] = i, i = (n << 5 | n >>> 27) + (a ^ s ^ o) + c + 1859775393 + i, c = o, o = s, s = (a << 30 | a >>> 2) >>> 0, a = n, n = i;
                for (; f < 40; ++f) i = (i = t[f - 6] ^ t[f - 16] ^ t[f - 28] ^ t[f - 32]) << 2 | i >>> 30, t[f] = i, i = (n << 5 | n >>> 27) + (a ^ s ^ o) + c + 1859775393 + i, c = o, o = s, s = (a << 30 | a >>> 2) >>> 0, a = n, n = i;
                for (; f < 60; ++f) i = (i = t[f - 6] ^ t[f - 16] ^ t[f - 28] ^ t[f - 32]) << 2 | i >>> 30, t[f] = i, i = (n << 5 | n >>> 27) + (a & s | o & (a ^ s)) + c + 2400959708 + i, c = o, o = s, s = (a << 30 | a >>> 2) >>> 0, a = n, n = i;
                for (; f < 80; ++f) i = (i = t[f - 6] ^ t[f - 16] ^ t[f - 28] ^ t[f - 32]) << 2 | i >>> 30, t[f] = i, i = (n << 5 | n >>> 27) + (a ^ s ^ o) + c + 3395469782 + i, c = o, o = s, s = (a << 30 | a >>> 2) >>> 0, a = n, n = i;
                e.h0 = e.h0 + n | 0, e.h1 = e.h1 + a | 0, e.h2 = e.h2 + s | 0, e.h3 = e.h3 + o | 0, e.h4 = e.h4 + c | 0, d -= 64
            }
        }
    }, 41668: (e, t, r) => {
        var i = r(3832);
        r(28991), r(97116);
        var n = e.exports = i.sha256 = i.sha256 || {};
        i.md.sha256 = i.md.algorithms.sha256 = n, n.create = function () {
            s || (a = String.fromCharCode(128), a += i.util.fillString(String.fromCharCode(0), 64), o = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], s = !0);
            var e = null, t = i.util.createBuffer(), r = new Array(64), n = {
                algorithm: "sha256",
                blockLength: 64,
                digestLength: 32,
                messageLength: 0,
                fullMessageLength: null,
                messageLengthSize: 8,
                start: function () {
                    n.messageLength = 0, n.fullMessageLength = n.messageLength64 = [];
                    for (var r = n.messageLengthSize / 4, a = 0; a < r; ++a) n.fullMessageLength.push(0);
                    return t = i.util.createBuffer(), e = {
                        h0: 1779033703,
                        h1: 3144134277,
                        h2: 1013904242,
                        h3: 2773480762,
                        h4: 1359893119,
                        h5: 2600822924,
                        h6: 528734635,
                        h7: 1541459225
                    }, n
                }
            };
            return n.start(), n.update = function (a, s) {
                "utf8" === s && (a = i.util.encodeUtf8(a));
                var o = a.length;
                n.messageLength += o, o = [o / 4294967296 >>> 0, o >>> 0];
                for (var f = n.fullMessageLength.length - 1; f >= 0; --f) n.fullMessageLength[f] += o[1], o[1] = o[0] + (n.fullMessageLength[f] / 4294967296 >>> 0), n.fullMessageLength[f] = n.fullMessageLength[f] >>> 0, o[0] = o[1] / 4294967296 >>> 0;
                return t.putBytes(a), c(e, r, t), (t.read > 2048 || 0 === t.length()) && t.compact(), n
            }, n.digest = function () {
                var s = i.util.createBuffer();
                s.putBytes(t.bytes());
                var o,
                    f = n.fullMessageLength[n.fullMessageLength.length - 1] + n.messageLengthSize & n.blockLength - 1;
                s.putBytes(a.substr(0, n.blockLength - f));
                for (var d = 8 * n.fullMessageLength[0], u = 0; u < n.fullMessageLength.length - 1; ++u) d += (o = 8 * n.fullMessageLength[u + 1]) / 4294967296 >>> 0, s.putInt32(d >>> 0), d = o >>> 0;
                s.putInt32(d);
                var l = {h0: e.h0, h1: e.h1, h2: e.h2, h3: e.h3, h4: e.h4, h5: e.h5, h6: e.h6, h7: e.h7};
                c(l, r, s);
                var h = i.util.createBuffer();
                return h.putInt32(l.h0), h.putInt32(l.h1), h.putInt32(l.h2), h.putInt32(l.h3), h.putInt32(l.h4), h.putInt32(l.h5), h.putInt32(l.h6), h.putInt32(l.h7), h
            }, n
        };
        var a = null, s = !1, o = null;

        function c(e, t, r) {
            for (var i, n, a, s, c, f, d, u, l, h, p, g, y, m = r.length(); m >= 64;) {
                for (c = 0; c < 16; ++c) t[c] = r.getInt32();
                for (; c < 64; ++c) i = ((i = t[c - 2]) >>> 17 | i << 15) ^ (i >>> 19 | i << 13) ^ i >>> 10, n = ((n = t[c - 15]) >>> 7 | n << 25) ^ (n >>> 18 | n << 14) ^ n >>> 3, t[c] = i + t[c - 7] + n + t[c - 16] | 0;
                for (f = e.h0, d = e.h1, u = e.h2, l = e.h3, h = e.h4, p = e.h5, g = e.h6, y = e.h7, c = 0; c < 64; ++c) a = (f >>> 2 | f << 30) ^ (f >>> 13 | f << 19) ^ (f >>> 22 | f << 10), s = f & d | u & (f ^ d), i = y + ((h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7)) + (g ^ h & (p ^ g)) + o[c] + t[c], y = g, g = p, p = h, h = l + i >>> 0, l = u, u = d, d = f, f = i + (n = a + s) >>> 0;
                e.h0 = e.h0 + f | 0, e.h1 = e.h1 + d | 0, e.h2 = e.h2 + u | 0, e.h3 = e.h3 + l | 0, e.h4 = e.h4 + h | 0, e.h5 = e.h5 + p | 0, e.h6 = e.h6 + g | 0, e.h7 = e.h7 + y | 0, m -= 64
            }
        }
    }, 63219: (e, t, r) => {
        var i = r(3832);
        r(28991), r(97116);
        var n = e.exports = i.sha512 = i.sha512 || {};
        i.md.sha512 = i.md.algorithms.sha512 = n;
        var a = i.sha384 = i.sha512.sha384 = i.sha512.sha384 || {};
        a.create = function () {
            return n.create("SHA-384")
        }, i.md.sha384 = i.md.algorithms.sha384 = a, i.sha512.sha256 = i.sha512.sha256 || {
            create: function () {
                return n.create("SHA-512/256")
            }
        }, i.md["sha512/256"] = i.md.algorithms["sha512/256"] = i.sha512.sha256, i.sha512.sha224 = i.sha512.sha224 || {
            create: function () {
                return n.create("SHA-512/224")
            }
        }, i.md["sha512/224"] = i.md.algorithms["sha512/224"] = i.sha512.sha224, n.create = function (e) {
            if (o || (s = String.fromCharCode(128), s += i.util.fillString(String.fromCharCode(0), 128), c = [[1116352408, 3609767458], [1899447441, 602891725], [3049323471, 3964484399], [3921009573, 2173295548], [961987163, 4081628472], [1508970993, 3053834265], [2453635748, 2937671579], [2870763221, 3664609560], [3624381080, 2734883394], [310598401, 1164996542], [607225278, 1323610764], [1426881987, 3590304994], [1925078388, 4068182383], [2162078206, 991336113], [2614888103, 633803317], [3248222580, 3479774868], [3835390401, 2666613458], [4022224774, 944711139], [264347078, 2341262773], [604807628, 2007800933], [770255983, 1495990901], [1249150122, 1856431235], [1555081692, 3175218132], [1996064986, 2198950837], [2554220882, 3999719339], [2821834349, 766784016], [2952996808, 2566594879], [3210313671, 3203337956], [3336571891, 1034457026], [3584528711, 2466948901], [113926993, 3758326383], [338241895, 168717936], [666307205, 1188179964], [773529912, 1546045734], [1294757372, 1522805485], [1396182291, 2643833823], [1695183700, 2343527390], [1986661051, 1014477480], [2177026350, 1206759142], [2456956037, 344077627], [2730485921, 1290863460], [2820302411, 3158454273], [3259730800, 3505952657], [3345764771, 106217008], [3516065817, 3606008344], [3600352804, 1432725776], [4094571909, 1467031594], [275423344, 851169720], [430227734, 3100823752], [506948616, 1363258195], [659060556, 3750685593], [883997877, 3785050280], [958139571, 3318307427], [1322822218, 3812723403], [1537002063, 2003034995], [1747873779, 3602036899], [1955562222, 1575990012], [2024104815, 1125592928], [2227730452, 2716904306], [2361852424, 442776044], [2428436474, 593698344], [2756734187, 3733110249], [3204031479, 2999351573], [3329325298, 3815920427], [3391569614, 3928383900], [3515267271, 566280711], [3940187606, 3454069534], [4118630271, 4000239992], [116418474, 1914138554], [174292421, 2731055270], [289380356, 3203993006], [460393269, 320620315], [685471733, 587496836], [852142971, 1086792851], [1017036298, 365543100], [1126000580, 2618297676], [1288033470, 3409855158], [1501505948, 4234509866], [1607167915, 987167468], [1816402316, 1246189591]], (f = {})["SHA-512"] = [[1779033703, 4089235720], [3144134277, 2227873595], [1013904242, 4271175723], [2773480762, 1595750129], [1359893119, 2917565137], [2600822924, 725511199], [528734635, 4215389547], [1541459225, 327033209]], f["SHA-384"] = [[3418070365, 3238371032], [1654270250, 914150663], [2438529370, 812702999], [355462360, 4144912697], [1731405415, 4290775857], [2394180231, 1750603025], [3675008525, 1694076839], [1203062813, 3204075428]], f["SHA-512/256"] = [[573645204, 4230739756], [2673172387, 3360449730], [596883563, 1867755857], [2520282905, 1497426621], [2519219938, 2827943907], [3193839141, 1401305490], [721525244, 746961066], [246885852, 2177182882]], f["SHA-512/224"] = [[2352822216, 424955298], [1944164710, 2312950998], [502970286, 855612546], [1738396948, 1479516111], [258812777, 2077511080], [2011393907, 79989058], [1067287976, 1780299464], [286451373, 2446758561]], o = !0), void 0 === e && (e = "SHA-512"), !(e in f)) throw new Error("Invalid SHA-512 algorithm: " + e);
            for (var t = f[e], r = null, n = i.util.createBuffer(), a = new Array(80), u = 0; u < 80; ++u) a[u] = new Array(2);
            var l = 64;
            switch (e) {
                case"SHA-384":
                    l = 48;
                    break;
                case"SHA-512/256":
                    l = 32;
                    break;
                case"SHA-512/224":
                    l = 28
            }
            var h = {
                algorithm: e.replace("-", "").toLowerCase(),
                blockLength: 128,
                digestLength: l,
                messageLength: 0,
                fullMessageLength: null,
                messageLengthSize: 16,
                start: function () {
                    h.messageLength = 0, h.fullMessageLength = h.messageLength128 = [];
                    for (var e = h.messageLengthSize / 4, a = 0; a < e; ++a) h.fullMessageLength.push(0);
                    n = i.util.createBuffer(), r = new Array(t.length);
                    for (a = 0; a < t.length; ++a) r[a] = t[a].slice(0);
                    return h
                }
            };
            return h.start(), h.update = function (e, t) {
                "utf8" === t && (e = i.util.encodeUtf8(e));
                var s = e.length;
                h.messageLength += s, s = [s / 4294967296 >>> 0, s >>> 0];
                for (var o = h.fullMessageLength.length - 1; o >= 0; --o) h.fullMessageLength[o] += s[1], s[1] = s[0] + (h.fullMessageLength[o] / 4294967296 >>> 0), h.fullMessageLength[o] = h.fullMessageLength[o] >>> 0, s[0] = s[1] / 4294967296 >>> 0;
                return n.putBytes(e), d(r, a, n), (n.read > 2048 || 0 === n.length()) && n.compact(), h
            }, h.digest = function () {
                var t = i.util.createBuffer();
                t.putBytes(n.bytes());
                var o,
                    c = h.fullMessageLength[h.fullMessageLength.length - 1] + h.messageLengthSize & h.blockLength - 1;
                t.putBytes(s.substr(0, h.blockLength - c));
                for (var f = 8 * h.fullMessageLength[0], u = 0; u < h.fullMessageLength.length - 1; ++u) f += (o = 8 * h.fullMessageLength[u + 1]) / 4294967296 >>> 0, t.putInt32(f >>> 0), f = o >>> 0;
                t.putInt32(f);
                var l = new Array(r.length);
                for (u = 0; u < r.length; ++u) l[u] = r[u].slice(0);
                d(l, a, t);
                var p, g = i.util.createBuffer();
                p = "SHA-512" === e ? l.length : "SHA-384" === e ? l.length - 2 : l.length - 4;
                for (u = 0; u < p; ++u) g.putInt32(l[u][0]), u === p - 1 && "SHA-512/224" === e || g.putInt32(l[u][1]);
                return g
            }, h
        };
        var s = null, o = !1, c = null, f = null;

        function d(e, t, r) {
            for (var i, n, a, s, o, f, d, u, l, h, p, g, y, m, v, b, w, E, C, S, I, A, _, T, B, N, k, R, L, M, U, P, D, x = r.length(); x >= 128;) {
                for (k = 0; k < 16; ++k) t[k][0] = r.getInt32() >>> 0, t[k][1] = r.getInt32() >>> 0;
                for (; k < 80; ++k) i = (((R = (M = t[k - 2])[0]) >>> 19 | (L = M[1]) << 13) ^ (L >>> 29 | R << 3) ^ R >>> 6) >>> 0, n = ((R << 13 | L >>> 19) ^ (L << 3 | R >>> 29) ^ (R << 26 | L >>> 6)) >>> 0, a = (((R = (P = t[k - 15])[0]) >>> 1 | (L = P[1]) << 31) ^ (R >>> 8 | L << 24) ^ R >>> 7) >>> 0, s = ((R << 31 | L >>> 1) ^ (R << 24 | L >>> 8) ^ (R << 25 | L >>> 7)) >>> 0, U = t[k - 7], D = t[k - 16], L = n + U[1] + s + D[1], t[k][0] = i + U[0] + a + D[0] + (L / 4294967296 >>> 0) >>> 0, t[k][1] = L >>> 0;
                for (p = e[0][0], g = e[0][1], y = e[1][0], m = e[1][1], v = e[2][0], b = e[2][1], w = e[3][0], E = e[3][1], C = e[4][0], S = e[4][1], I = e[5][0], A = e[5][1], _ = e[6][0], T = e[6][1], B = e[7][0], N = e[7][1], k = 0; k < 80; ++k) d = ((C >>> 14 | S << 18) ^ (C >>> 18 | S << 14) ^ (S >>> 9 | C << 23)) >>> 0, u = (_ ^ C & (I ^ _)) >>> 0, o = ((p >>> 28 | g << 4) ^ (g >>> 2 | p << 30) ^ (g >>> 7 | p << 25)) >>> 0, f = ((p << 4 | g >>> 28) ^ (g << 30 | p >>> 2) ^ (g << 25 | p >>> 7)) >>> 0, l = (p & y | v & (p ^ y)) >>> 0, h = (g & m | b & (g ^ m)) >>> 0, L = N + (((C << 18 | S >>> 14) ^ (C << 14 | S >>> 18) ^ (S << 23 | C >>> 9)) >>> 0) + ((T ^ S & (A ^ T)) >>> 0) + c[k][1] + t[k][1], i = B + d + u + c[k][0] + t[k][0] + (L / 4294967296 >>> 0) >>> 0, n = L >>> 0, a = o + l + ((L = f + h) / 4294967296 >>> 0) >>> 0, s = L >>> 0, B = _, N = T, _ = I, T = A, I = C, A = S, C = w + i + ((L = E + n) / 4294967296 >>> 0) >>> 0, S = L >>> 0, w = v, E = b, v = y, b = m, y = p, m = g, p = i + a + ((L = n + s) / 4294967296 >>> 0) >>> 0, g = L >>> 0;
                L = e[0][1] + g, e[0][0] = e[0][0] + p + (L / 4294967296 >>> 0) >>> 0, e[0][1] = L >>> 0, L = e[1][1] + m, e[1][0] = e[1][0] + y + (L / 4294967296 >>> 0) >>> 0, e[1][1] = L >>> 0, L = e[2][1] + b, e[2][0] = e[2][0] + v + (L / 4294967296 >>> 0) >>> 0, e[2][1] = L >>> 0, L = e[3][1] + E, e[3][0] = e[3][0] + w + (L / 4294967296 >>> 0) >>> 0, e[3][1] = L >>> 0, L = e[4][1] + S, e[4][0] = e[4][0] + C + (L / 4294967296 >>> 0) >>> 0, e[4][1] = L >>> 0, L = e[5][1] + A, e[5][0] = e[5][0] + I + (L / 4294967296 >>> 0) >>> 0, e[5][1] = L >>> 0, L = e[6][1] + T, e[6][0] = e[6][0] + _ + (L / 4294967296 >>> 0) >>> 0, e[6][1] = L >>> 0, L = e[7][1] + N, e[7][0] = e[7][0] + B + (L / 4294967296 >>> 0) >>> 0, e[7][1] = L >>> 0, x -= 128
            }
        }
    }, 77173: (e, t, r) => {
        var i = r(3832);
        r(8925), r(36607), r(25063), r(137), r(97116);
        var n = e.exports = i.ssh = i.ssh || {};

        function a(e, t) {
            var r = t.toString(16);
            r[0] >= "8" && (r = "00" + r);
            var n = i.util.hexToBytes(r);
            e.putInt32(n.length), e.putBytes(n)
        }

        function s(e, t) {
            e.putInt32(t.length), e.putString(t)
        }

        function o() {
            for (var e = i.md.sha1.create(), t = arguments.length, r = 0; r < t; ++r) e.update(arguments[r]);
            return e.digest()
        }

        n.privateKeyToPutty = function (e, t, r) {
            var n = "ssh-rsa", c = "" === (t = t || "") ? "none" : "aes256-cbc",
                f = "PuTTY-User-Key-File-2: " + n + "\r\n";
            f += "Encryption: " + c + "\r\n", f += "Comment: " + (r = r || "") + "\r\n";
            var d = i.util.createBuffer();
            s(d, n), a(d, e.e), a(d, e.n);
            var u = i.util.encode64(d.bytes(), 64), l = Math.floor(u.length / 66) + 1;
            f += "Public-Lines: " + l + "\r\n", f += u;
            var h, p = i.util.createBuffer();
            if (a(p, e.d), a(p, e.p), a(p, e.q), a(p, e.qInv), t) {
                var g = p.length() + 16 - 1;
                g -= g % 16;
                var y = o(p.bytes());
                y.truncate(y.length() - g + p.length()), p.putBuffer(y);
                var m = i.util.createBuffer();
                m.putBuffer(o("\0\0\0\0", t)), m.putBuffer(o("\0\0\0", t));
                var v = i.aes.createEncryptionCipher(m.truncate(8), "CBC");
                v.start(i.util.createBuffer().fillWithByte(0, 16)), v.update(p.copy()), v.finish();
                var b = v.output;
                b.truncate(16), h = i.util.encode64(b.bytes(), 64)
            } else h = i.util.encode64(p.bytes(), 64);
            f += "\r\nPrivate-Lines: " + (l = Math.floor(h.length / 66) + 1) + "\r\n", f += h;
            var w = o("putty-private-key-file-mac-key", t), E = i.util.createBuffer();
            s(E, n), s(E, c), s(E, r), E.putInt32(d.length()), E.putBuffer(d), E.putInt32(p.length()), E.putBuffer(p);
            var C = i.hmac.create();
            return C.start("sha1", w), C.update(E.bytes()), f += "\r\nPrivate-MAC: " + C.digest().toHex() + "\r\n"
        }, n.publicKeyToOpenSSH = function (e, t) {
            var r = "ssh-rsa";
            t = t || "";
            var n = i.util.createBuffer();
            return s(n, r), a(n, e.e), a(n, e.n), r + " " + i.util.encode64(n.bytes()) + " " + t
        }, n.privateKeyToOpenSSH = function (e, t) {
            return t ? i.pki.encryptRsaPrivateKey(e, t, {legacy: !0, algorithm: "aes128"}) : i.pki.privateKeyToPem(e)
        }, n.getPublicKeyFingerprint = function (e, t) {
            var r = (t = t || {}).md || i.md.md5.create(), n = i.util.createBuffer();
            s(n, "ssh-rsa"), a(n, e.e), a(n, e.n), r.start(), r.update(n.getBytes());
            var o = r.digest();
            if ("hex" === t.encoding) {
                var c = o.toHex();
                return t.delimiter ? c.match(/.{2}/g).join(t.delimiter) : c
            }
            if ("binary" === t.encoding) return o.getBytes();
            if (t.encoding) throw new Error('Unknown encoding "' + t.encoding + '".');
            return o
        }
    }, 84311: (e, t, r) => {
        var i = r(3832);
        r(3068), r(36607), r(25063), r(26953), r(4742), r(49563), r(137), r(97116);
        var n = function (e, t, r, n) {
            var a = i.util.createBuffer(), s = e.length >> 1, o = s + (1 & e.length), c = e.substr(0, o),
                f = e.substr(s, o), d = i.util.createBuffer(), u = i.hmac.create();
            r = t + r;
            var l = Math.ceil(n / 16), h = Math.ceil(n / 20);
            u.start("MD5", c);
            var p = i.util.createBuffer();
            d.putBytes(r);
            for (var g = 0; g < l; ++g) u.start(null, null), u.update(d.getBytes()), d.putBuffer(u.digest()), u.start(null, null), u.update(d.bytes() + r), p.putBuffer(u.digest());
            u.start("SHA1", f);
            var y = i.util.createBuffer();
            d.clear(), d.putBytes(r);
            for (g = 0; g < h; ++g) u.start(null, null), u.update(d.getBytes()), d.putBuffer(u.digest()), u.start(null, null), u.update(d.bytes() + r), y.putBuffer(u.digest());
            return a.putBytes(i.util.xorBytes(p.getBytes(), y.getBytes(), n)), a
        }, a = function (e, t, r) {
            var n = !1;
            try {
                var a = e.deflate(t.fragment.getBytes());
                t.fragment = i.util.createBuffer(a), t.length = a.length, n = !0
            } catch (s) {
            }
            return n
        }, s = function (e, t, r) {
            var n = !1;
            try {
                var a = e.inflate(t.fragment.getBytes());
                t.fragment = i.util.createBuffer(a), t.length = a.length, n = !0
            } catch (s) {
            }
            return n
        }, o = function (e, t) {
            var r = 0;
            switch (t) {
                case 1:
                    r = e.getByte();
                    break;
                case 2:
                    r = e.getInt16();
                    break;
                case 3:
                    r = e.getInt24();
                    break;
                case 4:
                    r = e.getInt32()
            }
            return i.util.createBuffer(e.getBytes(r))
        }, c = function (e, t, r) {
            e.putInt(r.length(), t << 3), e.putBuffer(r)
        }, f = {
            Versions: {
                TLS_1_0: {major: 3, minor: 1},
                TLS_1_1: {major: 3, minor: 2},
                TLS_1_2: {major: 3, minor: 3}
            }
        };
        f.SupportedVersions = [f.Versions.TLS_1_1, f.Versions.TLS_1_0], f.Version = f.SupportedVersions[0], f.MaxFragment = 15360, f.ConnectionEnd = {
            server: 0,
            client: 1
        }, f.PRFAlgorithm = {tls_prf_sha256: 0}, f.BulkCipherAlgorithm = {
            none: null,
            rc4: 0,
            des3: 1,
            aes: 2
        }, f.CipherType = {stream: 0, block: 1, aead: 2}, f.MACAlgorithm = {
            none: null,
            hmac_md5: 0,
            hmac_sha1: 1,
            hmac_sha256: 2,
            hmac_sha384: 3,
            hmac_sha512: 4
        }, f.CompressionMethod = {none: 0, deflate: 1}, f.ContentType = {
            change_cipher_spec: 20,
            alert: 21,
            handshake: 22,
            application_data: 23,
            heartbeat: 24
        }, f.HandshakeType = {
            hello_request: 0,
            client_hello: 1,
            server_hello: 2,
            certificate: 11,
            server_key_exchange: 12,
            certificate_request: 13,
            server_hello_done: 14,
            certificate_verify: 15,
            client_key_exchange: 16,
            finished: 20
        }, f.Alert = {}, f.Alert.Level = {warning: 1, fatal: 2}, f.Alert.Description = {
            close_notify: 0,
            unexpected_message: 10,
            bad_record_mac: 20,
            decryption_failed: 21,
            record_overflow: 22,
            decompression_failure: 30,
            handshake_failure: 40,
            bad_certificate: 42,
            unsupported_certificate: 43,
            certificate_revoked: 44,
            certificate_expired: 45,
            certificate_unknown: 46,
            illegal_parameter: 47,
            unknown_ca: 48,
            access_denied: 49,
            decode_error: 50,
            decrypt_error: 51,
            export_restriction: 60,
            protocol_version: 70,
            insufficient_security: 71,
            internal_error: 80,
            user_canceled: 90,
            no_renegotiation: 100
        }, f.HeartbeatMessageType = {
            heartbeat_request: 1,
            heartbeat_response: 2
        }, f.CipherSuites = {}, f.getCipherSuite = function (e) {
            var t = null;
            for (var r in f.CipherSuites) {
                var i = f.CipherSuites[r];
                if (i.id[0] === e.charCodeAt(0) && i.id[1] === e.charCodeAt(1)) {
                    t = i;
                    break
                }
            }
            return t
        }, f.handleUnexpected = function (e, t) {
            !e.open && e.entity === f.ConnectionEnd.client || e.error(e, {
                message: "Unexpected message. Received TLS record out of order.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.unexpected_message}
            })
        }, f.handleHelloRequest = function (e, t, r) {
            !e.handshaking && e.handshakes > 0 && (f.queue(e, f.createAlert(e, {
                level: f.Alert.Level.warning,
                description: f.Alert.Description.no_renegotiation
            })), f.flush(e)), e.process()
        }, f.parseHelloMessage = function (e, t, r) {
            var n = null, a = e.entity === f.ConnectionEnd.client;
            if (r < 38) e.error(e, {
                message: a ? "Invalid ServerHello message. Message too short." : "Invalid ClientHello message. Message too short.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.illegal_parameter}
            }); else {
                var s = t.fragment, c = s.length();
                if (n = {
                    version: {major: s.getByte(), minor: s.getByte()},
                    random: i.util.createBuffer(s.getBytes(32)),
                    session_id: o(s, 1),
                    extensions: []
                }, a ? (n.cipher_suite = s.getBytes(2), n.compression_method = s.getByte()) : (n.cipher_suites = o(s, 2), n.compression_methods = o(s, 1)), (c = r - (c - s.length())) > 0) {
                    for (var d = o(s, 2); d.length() > 0;) n.extensions.push({
                        type: [d.getByte(), d.getByte()],
                        data: o(d, 2)
                    });
                    if (!a) for (var u = 0; u < n.extensions.length; ++u) {
                        var l = n.extensions[u];
                        if (0 === l.type[0] && 0 === l.type[1]) for (var h = o(l.data, 2); h.length() > 0;) {
                            if (0 !== h.getByte()) break;
                            e.session.extensions.server_name.serverNameList.push(o(h, 2).getBytes())
                        }
                    }
                }
                if (e.session.version && (n.version.major !== e.session.version.major || n.version.minor !== e.session.version.minor)) return e.error(e, {
                    message: "TLS version change is disallowed during renegotiation.",
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.protocol_version}
                });
                if (a) e.session.cipherSuite = f.getCipherSuite(n.cipher_suite); else for (var p = i.util.createBuffer(n.cipher_suites.bytes()); p.length() > 0 && (e.session.cipherSuite = f.getCipherSuite(p.getBytes(2)), null === e.session.cipherSuite);) ;
                if (null === e.session.cipherSuite) return e.error(e, {
                    message: "No cipher suites in common.",
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.handshake_failure},
                    cipherSuite: i.util.bytesToHex(n.cipher_suite)
                });
                e.session.compressionMethod = a ? n.compression_method : f.CompressionMethod.none
            }
            return n
        }, f.createSecurityParameters = function (e, t) {
            var r = e.entity === f.ConnectionEnd.client, i = t.random.bytes(), n = r ? e.session.sp.client_random : i,
                a = r ? i : f.createRandom().getBytes();
            e.session.sp = {
                entity: e.entity,
                prf_algorithm: f.PRFAlgorithm.tls_prf_sha256,
                bulk_cipher_algorithm: null,
                cipher_type: null,
                enc_key_length: null,
                block_length: null,
                fixed_iv_length: null,
                record_iv_length: null,
                mac_algorithm: null,
                mac_length: null,
                mac_key_length: null,
                compression_algorithm: e.session.compressionMethod,
                pre_master_secret: null,
                master_secret: null,
                client_random: n,
                server_random: a
            }
        }, f.handleServerHello = function (e, t, r) {
            var i = f.parseHelloMessage(e, t, r);
            if (!e.fail) {
                if (!(i.version.minor <= e.version.minor)) return e.error(e, {
                    message: "Incompatible TLS version.",
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.protocol_version}
                });
                e.version.minor = i.version.minor, e.session.version = e.version;
                var n = i.session_id.bytes();
                n.length > 0 && n === e.session.id ? (e.expect = p, e.session.resuming = !0, e.session.sp.server_random = i.random.bytes()) : (e.expect = d, e.session.resuming = !1, f.createSecurityParameters(e, i)), e.session.id = n, e.process()
            }
        }, f.handleClientHello = function (e, t, r) {
            var n = f.parseHelloMessage(e, t, r);
            if (!e.fail) {
                var a = n.session_id.bytes(), s = null;
                if (e.sessionCache && (null === (s = e.sessionCache.getSession(a)) ? a = "" : (s.version.major !== n.version.major || s.version.minor > n.version.minor) && (s = null, a = "")), 0 === a.length && (a = i.random.getBytes(32)), e.session.id = a, e.session.clientHelloVersion = n.version, e.session.sp = {}, s) e.version = e.session.version = s.version, e.session.sp = s.sp; else {
                    for (var o, c = 1; c < f.SupportedVersions.length && !((o = f.SupportedVersions[c]).minor <= n.version.minor); ++c) ;
                    e.version = {major: o.major, minor: o.minor}, e.session.version = e.version
                }
                null !== s ? (e.expect = E, e.session.resuming = !0, e.session.sp.client_random = n.random.bytes()) : (e.expect = !1 !== e.verifyClient ? v : b, e.session.resuming = !1, f.createSecurityParameters(e, n)), e.open = !0, f.queue(e, f.createRecord(e, {
                    type: f.ContentType.handshake,
                    data: f.createServerHello(e)
                })), e.session.resuming ? (f.queue(e, f.createRecord(e, {
                    type: f.ContentType.change_cipher_spec,
                    data: f.createChangeCipherSpec()
                })), e.state.pending = f.createConnectionState(e), e.state.current.write = e.state.pending.write, f.queue(e, f.createRecord(e, {
                    type: f.ContentType.handshake,
                    data: f.createFinished(e)
                }))) : (f.queue(e, f.createRecord(e, {
                    type: f.ContentType.handshake,
                    data: f.createCertificate(e)
                })), e.fail || (f.queue(e, f.createRecord(e, {
                    type: f.ContentType.handshake,
                    data: f.createServerKeyExchange(e)
                })), !1 !== e.verifyClient && f.queue(e, f.createRecord(e, {
                    type: f.ContentType.handshake,
                    data: f.createCertificateRequest(e)
                })), f.queue(e, f.createRecord(e, {
                    type: f.ContentType.handshake,
                    data: f.createServerHelloDone(e)
                })))), f.flush(e), e.process()
            }
        }, f.handleCertificate = function (e, t, r) {
            if (r < 3) return e.error(e, {
                message: "Invalid Certificate message. Message too short.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.illegal_parameter}
            });
            var n, a, s = t.fragment, c = {certificate_list: o(s, 3)}, d = [];
            try {
                for (; c.certificate_list.length() > 0;) n = o(c.certificate_list, 3), a = i.asn1.fromDer(n), n = i.pki.certificateFromAsn1(a, !0), d.push(n)
            } catch (h) {
                return e.error(e, {
                    message: "Could not parse certificate list.",
                    cause: h,
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.bad_certificate}
                })
            }
            var l = e.entity === f.ConnectionEnd.client;
            !l && !0 !== e.verifyClient || 0 !== d.length ? 0 === d.length ? e.expect = l ? u : b : (l ? e.session.serverCertificate = d[0] : e.session.clientCertificate = d[0], f.verifyCertificateChain(e, d) && (e.expect = l ? u : b)) : e.error(e, {
                message: l ? "No server certificate provided." : "No client certificate provided.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.illegal_parameter}
            }), e.process()
        }, f.handleServerKeyExchange = function (e, t, r) {
            if (r > 0) return e.error(e, {
                message: "Invalid key parameters. Only RSA is supported.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.unsupported_certificate}
            });
            e.expect = l, e.process()
        }, f.handleClientKeyExchange = function (e, t, r) {
            if (r < 48) return e.error(e, {
                message: "Invalid key parameters. Only RSA is supported.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.unsupported_certificate}
            });
            var n = t.fragment, a = {enc_pre_master_secret: o(n, 2).getBytes()}, s = null;
            if (e.getPrivateKey) try {
                s = e.getPrivateKey(e, e.session.serverCertificate), s = i.pki.privateKeyFromPem(s)
            } catch (u) {
                e.error(e, {
                    message: "Could not get private key.",
                    cause: u,
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.internal_error}
                })
            }
            if (null === s) return e.error(e, {
                message: "No private key set.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.internal_error}
            });
            try {
                var c = e.session.sp;
                c.pre_master_secret = s.decrypt(a.enc_pre_master_secret);
                var d = e.session.clientHelloVersion;
                if (d.major !== c.pre_master_secret.charCodeAt(0) || d.minor !== c.pre_master_secret.charCodeAt(1)) throw new Error("TLS version rollback attack detected.")
            } catch (u) {
                c.pre_master_secret = i.random.getBytes(48)
            }
            e.expect = E, null !== e.session.clientCertificate && (e.expect = w), e.process()
        }, f.handleCertificateRequest = function (e, t, r) {
            if (r < 3) return e.error(e, {
                message: "Invalid CertificateRequest. Message too short.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.illegal_parameter}
            });
            var i = t.fragment, n = {certificate_types: o(i, 1), certificate_authorities: o(i, 2)};
            e.session.certificateRequest = n, e.expect = h, e.process()
        }, f.handleCertificateVerify = function (e, t, r) {
            if (r < 2) return e.error(e, {
                message: "Invalid CertificateVerify. Message too short.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.illegal_parameter}
            });
            var n = t.fragment;
            n.read -= 4;
            var a = n.bytes();
            n.read += 4;
            var s = {signature: o(n, 2).getBytes()}, c = i.util.createBuffer();
            c.putBuffer(e.session.md5.digest()), c.putBuffer(e.session.sha1.digest()), c = c.getBytes();
            try {
                if (!e.session.clientCertificate.publicKey.verify(c, s.signature, "NONE")) throw new Error("CertificateVerify signature does not match.");
                e.session.md5.update(a), e.session.sha1.update(a)
            } catch (d) {
                return e.error(e, {
                    message: "Bad signature in CertificateVerify.",
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.handshake_failure}
                })
            }
            e.expect = E, e.process()
        }, f.handleServerHelloDone = function (e, t, r) {
            if (r > 0) return e.error(e, {
                message: "Invalid ServerHelloDone message. Invalid length.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.record_overflow}
            });
            if (null === e.serverCertificate) {
                var n = {
                    message: "No server certificate provided. Not enough security.",
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.insufficient_security}
                }, a = e.verify(e, n.alert.description, 0, []);
                if (!0 !== a) return (a || 0 === a) && ("object" != typeof a || i.util.isArray(a) ? "number" == typeof a && (n.alert.description = a) : (a.message && (n.message = a.message), a.alert && (n.alert.description = a.alert))), e.error(e, n)
            }
            null !== e.session.certificateRequest && (t = f.createRecord(e, {
                type: f.ContentType.handshake,
                data: f.createCertificate(e)
            }), f.queue(e, t)), t = f.createRecord(e, {
                type: f.ContentType.handshake,
                data: f.createClientKeyExchange(e)
            }), f.queue(e, t), e.expect = m;
            var s = function (e, t) {
                null !== e.session.certificateRequest && null !== e.session.clientCertificate && f.queue(e, f.createRecord(e, {
                    type: f.ContentType.handshake,
                    data: f.createCertificateVerify(e, t)
                })), f.queue(e, f.createRecord(e, {
                    type: f.ContentType.change_cipher_spec,
                    data: f.createChangeCipherSpec()
                })), e.state.pending = f.createConnectionState(e), e.state.current.write = e.state.pending.write, f.queue(e, f.createRecord(e, {
                    type: f.ContentType.handshake,
                    data: f.createFinished(e)
                })), e.expect = p, f.flush(e), e.process()
            };
            if (null === e.session.certificateRequest || null === e.session.clientCertificate) return s(e, null);
            f.getClientSignature(e, s)
        }, f.handleChangeCipherSpec = function (e, t) {
            if (1 !== t.fragment.getByte()) return e.error(e, {
                message: "Invalid ChangeCipherSpec message received.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.illegal_parameter}
            });
            var r = e.entity === f.ConnectionEnd.client;
            (e.session.resuming && r || !e.session.resuming && !r) && (e.state.pending = f.createConnectionState(e)), e.state.current.read = e.state.pending.read, (!e.session.resuming && r || e.session.resuming && !r) && (e.state.pending = null), e.expect = r ? g : C, e.process()
        }, f.handleFinished = function (e, t, r) {
            var a = t.fragment;
            a.read -= 4;
            var s = a.bytes();
            a.read += 4;
            var o = t.fragment.getBytes();
            (a = i.util.createBuffer()).putBuffer(e.session.md5.digest()), a.putBuffer(e.session.sha1.digest());
            var c = e.entity === f.ConnectionEnd.client, d = c ? "server finished" : "client finished",
                u = e.session.sp;
            if ((a = n(u.master_secret, d, a.getBytes(), 12)).getBytes() !== o) return e.error(e, {
                message: "Invalid verify_data in Finished message.",
                send: !0,
                alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.decrypt_error}
            });
            e.session.md5.update(s), e.session.sha1.update(s), (e.session.resuming && c || !e.session.resuming && !c) && (f.queue(e, f.createRecord(e, {
                type: f.ContentType.change_cipher_spec,
                data: f.createChangeCipherSpec()
            })), e.state.current.write = e.state.pending.write, e.state.pending = null, f.queue(e, f.createRecord(e, {
                type: f.ContentType.handshake,
                data: f.createFinished(e)
            }))), e.expect = c ? y : S, e.handshaking = !1, ++e.handshakes, e.peerCertificate = c ? e.session.serverCertificate : e.session.clientCertificate, f.flush(e), e.isConnected = !0, e.connected(e), e.process()
        }, f.handleAlert = function (e, t) {
            var r, i = t.fragment, n = {level: i.getByte(), description: i.getByte()};
            switch (n.description) {
                case f.Alert.Description.close_notify:
                    r = "Connection closed.";
                    break;
                case f.Alert.Description.unexpected_message:
                    r = "Unexpected message.";
                    break;
                case f.Alert.Description.bad_record_mac:
                    r = "Bad record MAC.";
                    break;
                case f.Alert.Description.decryption_failed:
                    r = "Decryption failed.";
                    break;
                case f.Alert.Description.record_overflow:
                    r = "Record overflow.";
                    break;
                case f.Alert.Description.decompression_failure:
                    r = "Decompression failed.";
                    break;
                case f.Alert.Description.handshake_failure:
                    r = "Handshake failure.";
                    break;
                case f.Alert.Description.bad_certificate:
                    r = "Bad certificate.";
                    break;
                case f.Alert.Description.unsupported_certificate:
                    r = "Unsupported certificate.";
                    break;
                case f.Alert.Description.certificate_revoked:
                    r = "Certificate revoked.";
                    break;
                case f.Alert.Description.certificate_expired:
                    r = "Certificate expired.";
                    break;
                case f.Alert.Description.certificate_unknown:
                    r = "Certificate unknown.";
                    break;
                case f.Alert.Description.illegal_parameter:
                    r = "Illegal parameter.";
                    break;
                case f.Alert.Description.unknown_ca:
                    r = "Unknown certificate authority.";
                    break;
                case f.Alert.Description.access_denied:
                    r = "Access denied.";
                    break;
                case f.Alert.Description.decode_error:
                    r = "Decode error.";
                    break;
                case f.Alert.Description.decrypt_error:
                    r = "Decrypt error.";
                    break;
                case f.Alert.Description.export_restriction:
                    r = "Export restriction.";
                    break;
                case f.Alert.Description.protocol_version:
                    r = "Unsupported protocol version.";
                    break;
                case f.Alert.Description.insufficient_security:
                    r = "Insufficient security.";
                    break;
                case f.Alert.Description.internal_error:
                    r = "Internal error.";
                    break;
                case f.Alert.Description.user_canceled:
                    r = "User canceled.";
                    break;
                case f.Alert.Description.no_renegotiation:
                    r = "Renegotiation not supported.";
                    break;
                default:
                    r = "Unknown error."
            }
            if (n.description === f.Alert.Description.close_notify) return e.close();
            e.error(e, {
                message: r,
                send: !1,
                origin: e.entity === f.ConnectionEnd.client ? "server" : "client",
                alert: n
            }), e.process()
        }, f.handleHandshake = function (e, t) {
            var r = t.fragment, n = r.getByte(), a = r.getInt24();
            if (a > r.length()) return e.fragmented = t, t.fragment = i.util.createBuffer(), r.read -= 4, e.process();
            e.fragmented = null, r.read -= 4;
            var s = r.bytes(a + 4);
            r.read += 4, n in O[e.entity][e.expect] ? (e.entity !== f.ConnectionEnd.server || e.open || e.fail || (e.handshaking = !0, e.session = {
                version: null,
                extensions: {server_name: {serverNameList: []}},
                cipherSuite: null,
                compressionMethod: null,
                serverCertificate: null,
                clientCertificate: null,
                md5: i.md.md5.create(),
                sha1: i.md.sha1.create()
            }), n !== f.HandshakeType.hello_request && n !== f.HandshakeType.certificate_verify && n !== f.HandshakeType.finished && (e.session.md5.update(s), e.session.sha1.update(s)), O[e.entity][e.expect][n](e, t, a)) : f.handleUnexpected(e, t)
        }, f.handleApplicationData = function (e, t) {
            e.data.putBuffer(t.fragment), e.dataReady(e), e.process()
        }, f.handleHeartbeat = function (e, t) {
            var r = t.fragment, n = r.getByte(), a = r.getInt16(), s = r.getBytes(a);
            if (n === f.HeartbeatMessageType.heartbeat_request) {
                if (e.handshaking || a > s.length) return e.process();
                f.queue(e, f.createRecord(e, {
                    type: f.ContentType.heartbeat,
                    data: f.createHeartbeat(f.HeartbeatMessageType.heartbeat_response, s)
                })), f.flush(e)
            } else if (n === f.HeartbeatMessageType.heartbeat_response) {
                if (s !== e.expectedHeartbeatPayload) return e.process();
                e.heartbeatReceived && e.heartbeatReceived(e, i.util.createBuffer(s))
            }
            e.process()
        };
        var d = 1, u = 2, l = 3, h = 4, p = 5, g = 6, y = 7, m = 8, v = 1, b = 2, w = 3, E = 4, C = 5, S = 6,
            I = f.handleUnexpected, A = f.handleChangeCipherSpec, _ = f.handleAlert, T = f.handleHandshake,
            B = f.handleApplicationData, N = f.handleHeartbeat, k = [];
        k[f.ConnectionEnd.client] = [[I, _, T, I, N], [I, _, T, I, N], [I, _, T, I, N], [I, _, T, I, N], [I, _, T, I, N], [A, _, I, I, N], [I, _, T, I, N], [I, _, T, B, N], [I, _, T, I, N]], k[f.ConnectionEnd.server] = [[I, _, T, I, N], [I, _, T, I, N], [I, _, T, I, N], [I, _, T, I, N], [A, _, I, I, N], [I, _, T, I, N], [I, _, T, B, N], [I, _, T, I, N]];
        var R = f.handleHelloRequest, L = f.handleServerHello, M = f.handleCertificate, U = f.handleServerKeyExchange,
            P = f.handleCertificateRequest, D = f.handleServerHelloDone, x = f.handleFinished, O = [];
        O[f.ConnectionEnd.client] = [[I, I, L, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I], [R, I, I, I, I, I, I, I, I, I, I, M, U, P, D, I, I, I, I, I, I], [R, I, I, I, I, I, I, I, I, I, I, I, U, P, D, I, I, I, I, I, I], [R, I, I, I, I, I, I, I, I, I, I, I, I, P, D, I, I, I, I, I, I], [R, I, I, I, I, I, I, I, I, I, I, I, I, I, D, I, I, I, I, I, I], [R, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I], [R, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, x], [R, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I], [R, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I]];
        var V = f.handleClientHello, K = f.handleClientKeyExchange, z = f.handleCertificateVerify;
        O[f.ConnectionEnd.server] = [[I, V, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I], [I, I, I, I, I, I, I, I, I, I, I, M, I, I, I, I, I, I, I, I, I], [I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, K, I, I, I, I], [I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, z, I, I, I, I, I], [I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I], [I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, x], [I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I], [I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I, I]], f.generateKeys = function (e, t) {
            var r = n, i = t.client_random + t.server_random;
            e.session.resuming || (t.master_secret = r(t.pre_master_secret, "master secret", i, 48).bytes(), t.pre_master_secret = null), i = t.server_random + t.client_random;
            var a = 2 * t.mac_key_length + 2 * t.enc_key_length,
                s = e.version.major === f.Versions.TLS_1_0.major && e.version.minor === f.Versions.TLS_1_0.minor;
            s && (a += 2 * t.fixed_iv_length);
            var o = r(t.master_secret, "key expansion", i, a), c = {
                client_write_MAC_key: o.getBytes(t.mac_key_length),
                server_write_MAC_key: o.getBytes(t.mac_key_length),
                client_write_key: o.getBytes(t.enc_key_length),
                server_write_key: o.getBytes(t.enc_key_length)
            };
            return s && (c.client_write_IV = o.getBytes(t.fixed_iv_length), c.server_write_IV = o.getBytes(t.fixed_iv_length)), c
        }, f.createConnectionState = function (e) {
            var t = e.entity === f.ConnectionEnd.client, r = function () {
                var e = {
                    sequenceNumber: [0, 0],
                    macKey: null,
                    macLength: 0,
                    macFunction: null,
                    cipherState: null,
                    cipherFunction: function (e) {
                        return !0
                    },
                    compressionState: null,
                    compressFunction: function (e) {
                        return !0
                    },
                    updateSequenceNumber: function () {
                        4294967295 === e.sequenceNumber[1] ? (e.sequenceNumber[1] = 0, ++e.sequenceNumber[0]) : ++e.sequenceNumber[1]
                    }
                };
                return e
            }, i = {read: r(), write: r()};
            if (i.read.update = function (e, t) {
                return i.read.cipherFunction(t, i.read) ? i.read.compressFunction(e, t, i.read) || e.error(e, {
                    message: "Could not decompress record.",
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.decompression_failure}
                }) : e.error(e, {
                    message: "Could not decrypt record or bad MAC.",
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.bad_record_mac}
                }), !e.fail
            }, i.write.update = function (e, t) {
                return i.write.compressFunction(e, t, i.write) ? i.write.cipherFunction(t, i.write) || e.error(e, {
                    message: "Could not encrypt record.",
                    send: !1,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.internal_error}
                }) : e.error(e, {
                    message: "Could not compress record.",
                    send: !1,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.internal_error}
                }), !e.fail
            }, e.session) {
                var n = e.session.sp;
                switch (e.session.cipherSuite.initSecurityParameters(n), n.keys = f.generateKeys(e, n), i.read.macKey = t ? n.keys.server_write_MAC_key : n.keys.client_write_MAC_key, i.write.macKey = t ? n.keys.client_write_MAC_key : n.keys.server_write_MAC_key, e.session.cipherSuite.initConnectionState(i, e, n), n.compression_algorithm) {
                    case f.CompressionMethod.none:
                        break;
                    case f.CompressionMethod.deflate:
                        i.read.compressFunction = s, i.write.compressFunction = a;
                        break;
                    default:
                        throw new Error("Unsupported compression algorithm.")
                }
            }
            return i
        }, f.createRandom = function () {
            var e = new Date, t = +e + 6e4 * e.getTimezoneOffset(), r = i.util.createBuffer();
            return r.putInt32(t), r.putBytes(i.random.getBytes(28)), r
        }, f.createRecord = function (e, t) {
            return t.data ? {
                type: t.type,
                version: {major: e.version.major, minor: e.version.minor},
                length: t.data.length(),
                fragment: t.data
            } : null
        }, f.createAlert = function (e, t) {
            var r = i.util.createBuffer();
            return r.putByte(t.level), r.putByte(t.description), f.createRecord(e, {type: f.ContentType.alert, data: r})
        }, f.createClientHello = function (e) {
            e.session.clientHelloVersion = {major: e.version.major, minor: e.version.minor};
            for (var t = i.util.createBuffer(), r = 0; r < e.cipherSuites.length; ++r) {
                var n = e.cipherSuites[r];
                t.putByte(n.id[0]), t.putByte(n.id[1])
            }
            var a = t.length(), s = i.util.createBuffer();
            s.putByte(f.CompressionMethod.none);
            var o = s.length(), d = i.util.createBuffer();
            if (e.virtualHost) {
                var u = i.util.createBuffer();
                u.putByte(0), u.putByte(0);
                var l = i.util.createBuffer();
                l.putByte(0), c(l, 2, i.util.createBuffer(e.virtualHost));
                var h = i.util.createBuffer();
                c(h, 2, l), c(u, 2, h), d.putBuffer(u)
            }
            var p = d.length();
            p > 0 && (p += 2);
            var g = e.session.id, y = g.length + 1 + 2 + 4 + 28 + 2 + a + 1 + o + p, m = i.util.createBuffer();
            return m.putByte(f.HandshakeType.client_hello), m.putInt24(y), m.putByte(e.version.major), m.putByte(e.version.minor), m.putBytes(e.session.sp.client_random), c(m, 1, i.util.createBuffer(g)), c(m, 2, t), c(m, 1, s), p > 0 && c(m, 2, d), m
        }, f.createServerHello = function (e) {
            var t = e.session.id, r = t.length + 1 + 2 + 4 + 28 + 2 + 1, n = i.util.createBuffer();
            return n.putByte(f.HandshakeType.server_hello), n.putInt24(r), n.putByte(e.version.major), n.putByte(e.version.minor), n.putBytes(e.session.sp.server_random), c(n, 1, i.util.createBuffer(t)), n.putByte(e.session.cipherSuite.id[0]), n.putByte(e.session.cipherSuite.id[1]), n.putByte(e.session.compressionMethod), n
        }, f.createCertificate = function (e) {
            var t, r = e.entity === f.ConnectionEnd.client, n = null;
            e.getCertificate && (t = r ? e.session.certificateRequest : e.session.extensions.server_name.serverNameList, n = e.getCertificate(e, t));
            var a = i.util.createBuffer();
            if (null !== n) try {
                i.util.isArray(n) || (n = [n]);
                for (var s = null, o = 0; o < n.length; ++o) {
                    var d = i.pem.decode(n[o])[0];
                    if ("CERTIFICATE" !== d.type && "X509 CERTIFICATE" !== d.type && "TRUSTED CERTIFICATE" !== d.type) {
                        var u = new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');
                        throw u.headerType = d.type, u
                    }
                    if (d.procType && "ENCRYPTED" === d.procType.type) throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
                    var l = i.util.createBuffer(d.body);
                    null === s && (s = i.asn1.fromDer(l.bytes(), !1));
                    var h = i.util.createBuffer();
                    c(h, 3, l), a.putBuffer(h)
                }
                n = i.pki.certificateFromAsn1(s), r ? e.session.clientCertificate = n : e.session.serverCertificate = n
            } catch (y) {
                return e.error(e, {
                    message: "Could not send certificate list.",
                    cause: y,
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.bad_certificate}
                })
            }
            var p = 3 + a.length(), g = i.util.createBuffer();
            return g.putByte(f.HandshakeType.certificate), g.putInt24(p), c(g, 3, a), g
        }, f.createClientKeyExchange = function (e) {
            var t = i.util.createBuffer();
            t.putByte(e.session.clientHelloVersion.major), t.putByte(e.session.clientHelloVersion.minor), t.putBytes(i.random.getBytes(46));
            var r = e.session.sp;
            r.pre_master_secret = t.getBytes();
            var n = (t = e.session.serverCertificate.publicKey.encrypt(r.pre_master_secret)).length + 2,
                a = i.util.createBuffer();
            return a.putByte(f.HandshakeType.client_key_exchange), a.putInt24(n), a.putInt16(t.length), a.putBytes(t), a
        }, f.createServerKeyExchange = function (e) {
            var t = i.util.createBuffer();
            return t
        }, f.getClientSignature = function (e, t) {
            var r = i.util.createBuffer();
            r.putBuffer(e.session.md5.digest()), r.putBuffer(e.session.sha1.digest()), r = r.getBytes(), e.getSignature = e.getSignature || function (e, t, r) {
                var n = null;
                if (e.getPrivateKey) try {
                    n = e.getPrivateKey(e, e.session.clientCertificate), n = i.pki.privateKeyFromPem(n)
                } catch (a) {
                    e.error(e, {
                        message: "Could not get private key.",
                        cause: a,
                        send: !0,
                        alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.internal_error}
                    })
                }
                null === n ? e.error(e, {
                    message: "No private key set.",
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.internal_error}
                }) : t = n.sign(t, null), r(e, t)
            }, e.getSignature(e, r, t)
        }, f.createCertificateVerify = function (e, t) {
            var r = t.length + 2, n = i.util.createBuffer();
            return n.putByte(f.HandshakeType.certificate_verify), n.putInt24(r), n.putInt16(t.length), n.putBytes(t), n
        }, f.createCertificateRequest = function (e) {
            var t = i.util.createBuffer();
            t.putByte(1);
            var r = i.util.createBuffer();
            for (var n in e.caStore.certs) {
                var a = e.caStore.certs[n], s = i.pki.distinguishedNameToAsn1(a.subject), o = i.asn1.toDer(s);
                r.putInt16(o.length()), r.putBuffer(o)
            }
            var d = 1 + t.length() + 2 + r.length(), u = i.util.createBuffer();
            return u.putByte(f.HandshakeType.certificate_request), u.putInt24(d), c(u, 1, t), c(u, 2, r), u
        }, f.createServerHelloDone = function (e) {
            var t = i.util.createBuffer();
            return t.putByte(f.HandshakeType.server_hello_done), t.putInt24(0), t
        }, f.createChangeCipherSpec = function () {
            var e = i.util.createBuffer();
            return e.putByte(1), e
        }, f.createFinished = function (e) {
            var t = i.util.createBuffer();
            t.putBuffer(e.session.md5.digest()), t.putBuffer(e.session.sha1.digest());
            var r = e.entity === f.ConnectionEnd.client, a = e.session.sp,
                s = r ? "client finished" : "server finished";
            t = n(a.master_secret, s, t.getBytes(), 12);
            var o = i.util.createBuffer();
            return o.putByte(f.HandshakeType.finished), o.putInt24(t.length()), o.putBuffer(t), o
        }, f.createHeartbeat = function (e, t, r) {
            void 0 === r && (r = t.length);
            var n = i.util.createBuffer();
            n.putByte(e), n.putInt16(r), n.putBytes(t);
            var a = n.length(), s = Math.max(16, a - r - 3);
            return n.putBytes(i.random.getBytes(s)), n
        }, f.queue = function (e, t) {
            if (t && (0 !== t.fragment.length() || t.type !== f.ContentType.handshake && t.type !== f.ContentType.alert && t.type !== f.ContentType.change_cipher_spec)) {
                if (t.type === f.ContentType.handshake) {
                    var r = t.fragment.bytes();
                    e.session.md5.update(r), e.session.sha1.update(r), r = null
                }
                var n;
                if (t.fragment.length() <= f.MaxFragment) n = [t]; else {
                    n = [];
                    for (var a = t.fragment.bytes(); a.length > f.MaxFragment;) n.push(f.createRecord(e, {
                        type: t.type,
                        data: i.util.createBuffer(a.slice(0, f.MaxFragment))
                    })), a = a.slice(f.MaxFragment);
                    a.length > 0 && n.push(f.createRecord(e, {type: t.type, data: i.util.createBuffer(a)}))
                }
                for (var s = 0; s < n.length && !e.fail; ++s) {
                    var o = n[s];
                    e.state.current.write.update(e, o) && e.records.push(o)
                }
            }
        }, f.flush = function (e) {
            for (var t = 0; t < e.records.length; ++t) {
                var r = e.records[t];
                e.tlsData.putByte(r.type), e.tlsData.putByte(r.version.major), e.tlsData.putByte(r.version.minor), e.tlsData.putInt16(r.fragment.length()), e.tlsData.putBuffer(e.records[t].fragment)
            }
            return e.records = [], e.tlsDataReady(e)
        };
        var q = function (e) {
            switch (e) {
                case!0:
                    return !0;
                case i.pki.certificateError.bad_certificate:
                    return f.Alert.Description.bad_certificate;
                case i.pki.certificateError.unsupported_certificate:
                    return f.Alert.Description.unsupported_certificate;
                case i.pki.certificateError.certificate_revoked:
                    return f.Alert.Description.certificate_revoked;
                case i.pki.certificateError.certificate_expired:
                    return f.Alert.Description.certificate_expired;
                case i.pki.certificateError.certificate_unknown:
                    return f.Alert.Description.certificate_unknown;
                case i.pki.certificateError.unknown_ca:
                    return f.Alert.Description.unknown_ca;
                default:
                    return f.Alert.Description.bad_certificate
            }
        };
        for (var F in f.verifyCertificateChain = function (e, t) {
            try {
                var r = {};
                for (var n in e.verifyOptions) r[n] = e.verifyOptions[n];
                r.verify = function (t, r, n) {
                    q(t);
                    var a = e.verify(e, t, r, n);
                    if (!0 !== a) {
                        if ("object" == typeof a && !i.util.isArray(a)) {
                            var s = new Error("The application rejected the certificate.");
                            throw s.send = !0, s.alert = {
                                level: f.Alert.Level.fatal,
                                description: f.Alert.Description.bad_certificate
                            }, a.message && (s.message = a.message), a.alert && (s.alert.description = a.alert), s
                        }
                        a !== t && (a = function (e) {
                            switch (e) {
                                case!0:
                                    return !0;
                                case f.Alert.Description.bad_certificate:
                                    return i.pki.certificateError.bad_certificate;
                                case f.Alert.Description.unsupported_certificate:
                                    return i.pki.certificateError.unsupported_certificate;
                                case f.Alert.Description.certificate_revoked:
                                    return i.pki.certificateError.certificate_revoked;
                                case f.Alert.Description.certificate_expired:
                                    return i.pki.certificateError.certificate_expired;
                                case f.Alert.Description.certificate_unknown:
                                    return i.pki.certificateError.certificate_unknown;
                                case f.Alert.Description.unknown_ca:
                                    return i.pki.certificateError.unknown_ca;
                                default:
                                    return i.pki.certificateError.bad_certificate
                            }
                        }(a))
                    }
                    return a
                }, i.pki.verifyCertificateChain(e.caStore, t, r)
            } catch (s) {
                var a = s;
                ("object" != typeof a || i.util.isArray(a)) && (a = {
                    send: !0,
                    alert: {level: f.Alert.Level.fatal, description: q(s)}
                }), "send" in a || (a.send = !0), "alert" in a || (a.alert = {
                    level: f.Alert.Level.fatal,
                    description: q(a.error)
                }), e.error(e, a)
            }
            return !e.fail
        }, f.createSessionCache = function (e, t) {
            var r = null;
            if (e && e.getSession && e.setSession && e.order) r = e; else {
                for (var n in (r = {}).cache = e || {}, r.capacity = Math.max(t || 100, 1), r.order = [], e) r.order.length <= t ? r.order.push(n) : delete e[n];
                r.getSession = function (e) {
                    var t = null, n = null;
                    if (e ? n = i.util.bytesToHex(e) : r.order.length > 0 && (n = r.order[0]), null !== n && n in r.cache) for (var a in t = r.cache[n], delete r.cache[n], r.order) if (r.order[a] === n) {
                        r.order.splice(a, 1);
                        break
                    }
                    return t
                }, r.setSession = function (e, t) {
                    if (r.order.length === r.capacity) {
                        var n = r.order.shift();
                        delete r.cache[n]
                    }
                    n = i.util.bytesToHex(e);
                    r.order.push(n), r.cache[n] = t
                }
            }
            return r
        }, f.createConnection = function (e) {
            var t = null;
            t = e.caStore ? i.util.isArray(e.caStore) ? i.pki.createCaStore(e.caStore) : e.caStore : i.pki.createCaStore();
            var r = e.cipherSuites || null;
            if (null === r) for (var n in r = [], f.CipherSuites) r.push(f.CipherSuites[n]);
            var a = e.server ? f.ConnectionEnd.server : f.ConnectionEnd.client,
                s = e.sessionCache ? f.createSessionCache(e.sessionCache) : null, o = {
                    version: {major: f.Version.major, minor: f.Version.minor},
                    entity: a,
                    sessionId: e.sessionId,
                    caStore: t,
                    sessionCache: s,
                    cipherSuites: r,
                    connected: e.connected,
                    virtualHost: e.virtualHost || null,
                    verifyClient: e.verifyClient || !1,
                    verify: e.verify || function (e, t, r, i) {
                        return t
                    },
                    verifyOptions: e.verifyOptions || {},
                    getCertificate: e.getCertificate || null,
                    getPrivateKey: e.getPrivateKey || null,
                    getSignature: e.getSignature || null,
                    input: i.util.createBuffer(),
                    tlsData: i.util.createBuffer(),
                    data: i.util.createBuffer(),
                    tlsDataReady: e.tlsDataReady,
                    dataReady: e.dataReady,
                    heartbeatReceived: e.heartbeatReceived,
                    closed: e.closed,
                    error: function (t, r) {
                        r.origin = r.origin || (t.entity === f.ConnectionEnd.client ? "client" : "server"), r.send && (f.queue(t, f.createAlert(t, r.alert)), f.flush(t));
                        var i = !1 !== r.fatal;
                        i && (t.fail = !0), e.error(t, r), i && t.close(!1)
                    },
                    deflate: e.deflate || null,
                    inflate: e.inflate || null,
                    reset: function (e) {
                        o.version = {
                            major: f.Version.major,
                            minor: f.Version.minor
                        }, o.record = null, o.session = null, o.peerCertificate = null, o.state = {
                            pending: null,
                            current: null
                        }, o.expect = (o.entity, f.ConnectionEnd.client, 0), o.fragmented = null, o.records = [], o.open = !1, o.handshakes = 0, o.handshaking = !1, o.isConnected = !1, o.fail = !(e || void 0 === e), o.input.clear(), o.tlsData.clear(), o.data.clear(), o.state.current = f.createConnectionState(o)
                    }
                };
            o.reset();
            return o.handshake = function (e) {
                if (o.entity !== f.ConnectionEnd.client) o.error(o, {
                    message: "Cannot initiate handshake as a server.",
                    fatal: !1
                }); else if (o.handshaking) o.error(o, {message: "Handshake already in progress.", fatal: !1}); else {
                    o.fail && !o.open && 0 === o.handshakes && (o.fail = !1), o.handshaking = !0;
                    var t = null;
                    (e = e || "").length > 0 && (o.sessionCache && (t = o.sessionCache.getSession(e)), null === t && (e = "")), 0 === e.length && o.sessionCache && null !== (t = o.sessionCache.getSession()) && (e = t.id), o.session = {
                        id: e,
                        version: null,
                        cipherSuite: null,
                        compressionMethod: null,
                        serverCertificate: null,
                        certificateRequest: null,
                        clientCertificate: null,
                        sp: {},
                        md5: i.md.md5.create(),
                        sha1: i.md.sha1.create()
                    }, t && (o.version = t.version, o.session.sp = t.sp), o.session.sp.client_random = f.createRandom().getBytes(), o.open = !0, f.queue(o, f.createRecord(o, {
                        type: f.ContentType.handshake,
                        data: f.createClientHello(o)
                    })), f.flush(o)
                }
            }, o.process = function (e) {
                var t = 0;
                return e && o.input.putBytes(e), o.fail || (null !== o.record && o.record.ready && o.record.fragment.isEmpty() && (o.record = null), null === o.record && (t = function (e) {
                    var t = 0, r = e.input, n = r.length();
                    if (n < 5) t = 5 - n; else {
                        e.record = {
                            type: r.getByte(),
                            version: {major: r.getByte(), minor: r.getByte()},
                            length: r.getInt16(),
                            fragment: i.util.createBuffer(),
                            ready: !1
                        };
                        var a = e.record.version.major === e.version.major;
                        a && e.session && e.session.version && (a = e.record.version.minor === e.version.minor), a || e.error(e, {
                            message: "Incompatible TLS version.",
                            send: !0,
                            alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.protocol_version}
                        })
                    }
                    return t
                }(o)), o.fail || null === o.record || o.record.ready || (t = function (e) {
                    var t = 0, r = e.input, i = r.length();
                    return i < e.record.length ? t = e.record.length - i : (e.record.fragment.putBytes(r.getBytes(e.record.length)), r.compact(), e.state.current.read.update(e, e.record) && (null !== e.fragmented && (e.fragmented.type === e.record.type ? (e.fragmented.fragment.putBuffer(e.record.fragment), e.record = e.fragmented) : e.error(e, {
                        message: "Invalid fragmented record.",
                        send: !0,
                        alert: {level: f.Alert.Level.fatal, description: f.Alert.Description.unexpected_message}
                    })), e.record.ready = !0)), t
                }(o)), !o.fail && null !== o.record && o.record.ready && function (e, t) {
                    var r = t.type - f.ContentType.change_cipher_spec, i = k[e.entity][e.expect];
                    r in i ? i[r](e, t) : f.handleUnexpected(e, t)
                }(o, o.record)), t
            }, o.prepare = function (e) {
                return f.queue(o, f.createRecord(o, {
                    type: f.ContentType.application_data,
                    data: i.util.createBuffer(e)
                })), f.flush(o)
            }, o.prepareHeartbeatRequest = function (e, t) {
                return e instanceof i.util.ByteBuffer && (e = e.bytes()), void 0 === t && (t = e.length), o.expectedHeartbeatPayload = e, f.queue(o, f.createRecord(o, {
                    type: f.ContentType.heartbeat,
                    data: f.createHeartbeat(f.HeartbeatMessageType.heartbeat_request, e, t)
                })), f.flush(o)
            }, o.close = function (e) {
                if (!o.fail && o.sessionCache && o.session) {
                    var t = {id: o.session.id, version: o.session.version, sp: o.session.sp};
                    t.sp.keys = null, o.sessionCache.setSession(t.id, t)
                }
                o.open && (o.open = !1, o.input.clear(), (o.isConnected || o.handshaking) && (o.isConnected = o.handshaking = !1, f.queue(o, f.createAlert(o, {
                    level: f.Alert.Level.warning,
                    description: f.Alert.Description.close_notify
                })), f.flush(o)), o.closed(o)), o.reset(e)
            }, o
        }, e.exports = i.tls = i.tls || {}, f) "function" != typeof f[F] && (i.tls[F] = f[F]);
        i.tls.prf_tls1 = n, i.tls.hmac_sha1 = function (e, t, r) {
            var n = i.hmac.create();
            n.start("SHA1", e);
            var a = i.util.createBuffer();
            return a.putInt32(t[0]), a.putInt32(t[1]), a.putByte(r.type), a.putByte(r.version.major), a.putByte(r.version.minor), a.putInt16(r.length), a.putBytes(r.fragment.bytes()), n.update(a.getBytes()), n.digest().getBytes()
        }, i.tls.createSessionCache = f.createSessionCache, i.tls.createConnection = f.createConnection
    }, 97116: (e, t, r) => {
        var i = r(3832), n = r(78807), a = e.exports = i.util = i.util || {};

        function s(e) {
            if (8 !== e && 16 !== e && 24 !== e && 32 !== e) throw new Error("Only 8, 16, 24, or 32 bits supported: " + e)
        }

        function o(e) {
            if (this.data = "", this.read = 0, "string" == typeof e) this.data = e; else if (a.isArrayBuffer(e) || a.isArrayBufferView(e)) if ("undefined" != typeof Buffer && e instanceof Buffer) this.data = e.toString("binary"); else {
                var t = new Uint8Array(e);
                try {
                    this.data = String.fromCharCode.apply(null, t)
                } catch (i) {
                    for (var r = 0; r < t.length; ++r) this.putByte(t[r])
                }
            } else (e instanceof o || "object" == typeof e && "string" == typeof e.data && "number" == typeof e.read) && (this.data = e.data, this.read = e.read);
            this._constructedStringLength = 0
        }

        !function () {
            if ("undefined" != typeof process && process.nextTick && !process.browser) return a.nextTick = process.nextTick, void ("function" == typeof setImmediate ? a.setImmediate = setImmediate : a.setImmediate = a.nextTick);
            if ("function" == typeof setImmediate) return a.setImmediate = function () {
                return setImmediate.apply(void 0, arguments)
            }, void (a.nextTick = function (e) {
                return setImmediate(e)
            });
            if (a.setImmediate = function (e) {
                setTimeout(e, 0)
            }, "undefined" != typeof window && "function" == typeof window.postMessage) {
                var e = "forge.setImmediate", t = [];
                a.setImmediate = function (r) {
                    t.push(r), 1 === t.length && window.postMessage(e, "*")
                }, window.addEventListener("message", (function (r) {
                    if (r.source === window && r.data === e) {
                        r.stopPropagation();
                        var i = t.slice();
                        t.length = 0, i.forEach((function (e) {
                            e()
                        }))
                    }
                }), !0)
            }
            if ("undefined" != typeof MutationObserver) {
                var r = Date.now(), i = !0, n = document.createElement("div");
                t = [];
                new MutationObserver((function () {
                    var e = t.slice();
                    t.length = 0, e.forEach((function (e) {
                        e()
                    }))
                })).observe(n, {attributes: !0});
                var s = a.setImmediate;
                a.setImmediate = function (e) {
                    Date.now() - r > 15 ? (r = Date.now(), s(e)) : (t.push(e), 1 === t.length && n.setAttribute("a", i = !i))
                }
            }
            a.nextTick = a.setImmediate
        }(), a.isNodejs = "undefined" != typeof process && process.versions && process.versions.node, a.globalScope = a.isNodejs ? r.g : "undefined" == typeof self ? window : self, a.isArray = Array.isArray || function (e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }, a.isArrayBuffer = function (e) {
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
        }, a.isArrayBufferView = function (e) {
            return e && a.isArrayBuffer(e.buffer) && void 0 !== e.byteLength
        }, a.ByteBuffer = o, a.ByteStringBuffer = o;
        a.ByteStringBuffer.prototype._optimizeConstructedString = function (e) {
            this._constructedStringLength += e, this._constructedStringLength > 4096 && (this.data.substr(0, 1), this._constructedStringLength = 0)
        }, a.ByteStringBuffer.prototype.length = function () {
            return this.data.length - this.read
        }, a.ByteStringBuffer.prototype.isEmpty = function () {
            return this.length() <= 0
        }, a.ByteStringBuffer.prototype.putByte = function (e) {
            return this.putBytes(String.fromCharCode(e))
        }, a.ByteStringBuffer.prototype.fillWithByte = function (e, t) {
            e = String.fromCharCode(e);
            for (var r = this.data; t > 0;) 1 & t && (r += e), (t >>>= 1) > 0 && (e += e);
            return this.data = r, this._optimizeConstructedString(t), this
        }, a.ByteStringBuffer.prototype.putBytes = function (e) {
            return this.data += e, this._optimizeConstructedString(e.length), this
        }, a.ByteStringBuffer.prototype.putString = function (e) {
            return this.putBytes(a.encodeUtf8(e))
        }, a.ByteStringBuffer.prototype.putInt16 = function (e) {
            return this.putBytes(String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e))
        }, a.ByteStringBuffer.prototype.putInt24 = function (e) {
            return this.putBytes(String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e))
        }, a.ByteStringBuffer.prototype.putInt32 = function (e) {
            return this.putBytes(String.fromCharCode(e >> 24 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e))
        }, a.ByteStringBuffer.prototype.putInt16Le = function (e) {
            return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255))
        }, a.ByteStringBuffer.prototype.putInt24Le = function (e) {
            return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(e >> 16 & 255))
        }, a.ByteStringBuffer.prototype.putInt32Le = function (e) {
            return this.putBytes(String.fromCharCode(255 & e) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 24 & 255))
        }, a.ByteStringBuffer.prototype.putInt = function (e, t) {
            s(t);
            var r = "";
            do {
                t -= 8, r += String.fromCharCode(e >> t & 255)
            } while (t > 0);
            return this.putBytes(r)
        }, a.ByteStringBuffer.prototype.putSignedInt = function (e, t) {
            return e < 0 && (e += 2 << t - 1), this.putInt(e, t)
        }, a.ByteStringBuffer.prototype.putBuffer = function (e) {
            return this.putBytes(e.getBytes())
        }, a.ByteStringBuffer.prototype.getByte = function () {
            return this.data.charCodeAt(this.read++)
        }, a.ByteStringBuffer.prototype.getInt16 = function () {
            var e = this.data.charCodeAt(this.read) << 8 ^ this.data.charCodeAt(this.read + 1);
            return this.read += 2, e
        }, a.ByteStringBuffer.prototype.getInt24 = function () {
            var e = this.data.charCodeAt(this.read) << 16 ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2);
            return this.read += 3, e
        }, a.ByteStringBuffer.prototype.getInt32 = function () {
            var e = this.data.charCodeAt(this.read) << 24 ^ this.data.charCodeAt(this.read + 1) << 16 ^ this.data.charCodeAt(this.read + 2) << 8 ^ this.data.charCodeAt(this.read + 3);
            return this.read += 4, e
        }, a.ByteStringBuffer.prototype.getInt16Le = function () {
            var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8;
            return this.read += 2, e
        }, a.ByteStringBuffer.prototype.getInt24Le = function () {
            var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16;
            return this.read += 3, e
        }, a.ByteStringBuffer.prototype.getInt32Le = function () {
            var e = this.data.charCodeAt(this.read) ^ this.data.charCodeAt(this.read + 1) << 8 ^ this.data.charCodeAt(this.read + 2) << 16 ^ this.data.charCodeAt(this.read + 3) << 24;
            return this.read += 4, e
        }, a.ByteStringBuffer.prototype.getInt = function (e) {
            s(e);
            var t = 0;
            do {
                t = (t << 8) + this.data.charCodeAt(this.read++), e -= 8
            } while (e > 0);
            return t
        }, a.ByteStringBuffer.prototype.getSignedInt = function (e) {
            var t = this.getInt(e), r = 2 << e - 2;
            return t >= r && (t -= r << 1), t
        }, a.ByteStringBuffer.prototype.getBytes = function (e) {
            var t;
            return e ? (e = Math.min(this.length(), e), t = this.data.slice(this.read, this.read + e), this.read += e) : 0 === e ? t = "" : (t = 0 === this.read ? this.data : this.data.slice(this.read), this.clear()), t
        }, a.ByteStringBuffer.prototype.bytes = function (e) {
            return void 0 === e ? this.data.slice(this.read) : this.data.slice(this.read, this.read + e)
        }, a.ByteStringBuffer.prototype.at = function (e) {
            return this.data.charCodeAt(this.read + e)
        }, a.ByteStringBuffer.prototype.setAt = function (e, t) {
            return this.data = this.data.substr(0, this.read + e) + String.fromCharCode(t) + this.data.substr(this.read + e + 1), this
        }, a.ByteStringBuffer.prototype.last = function () {
            return this.data.charCodeAt(this.data.length - 1)
        }, a.ByteStringBuffer.prototype.copy = function () {
            var e = a.createBuffer(this.data);
            return e.read = this.read, e
        }, a.ByteStringBuffer.prototype.compact = function () {
            return this.read > 0 && (this.data = this.data.slice(this.read), this.read = 0), this
        }, a.ByteStringBuffer.prototype.clear = function () {
            return this.data = "", this.read = 0, this
        }, a.ByteStringBuffer.prototype.truncate = function (e) {
            var t = Math.max(0, this.length() - e);
            return this.data = this.data.substr(this.read, t), this.read = 0, this
        }, a.ByteStringBuffer.prototype.toHex = function () {
            for (var e = "", t = this.read; t < this.data.length; ++t) {
                var r = this.data.charCodeAt(t);
                r < 16 && (e += "0"), e += r.toString(16)
            }
            return e
        }, a.ByteStringBuffer.prototype.toString = function () {
            return a.decodeUtf8(this.bytes())
        }, a.DataBuffer = function (e, t) {
            t = t || {}, this.read = t.readOffset || 0, this.growSize = t.growSize || 1024;
            var r = a.isArrayBuffer(e), i = a.isArrayBufferView(e);
            if (r || i) return this.data = r ? new DataView(e) : new DataView(e.buffer, e.byteOffset, e.byteLength), void (this.write = "writeOffset" in t ? t.writeOffset : this.data.byteLength);
            this.data = new DataView(new ArrayBuffer(0)), this.write = 0, null != e && this.putBytes(e), "writeOffset" in t && (this.write = t.writeOffset)
        }, a.DataBuffer.prototype.length = function () {
            return this.write - this.read
        }, a.DataBuffer.prototype.isEmpty = function () {
            return this.length() <= 0
        }, a.DataBuffer.prototype.accommodate = function (e, t) {
            if (this.length() >= e) return this;
            t = Math.max(t || this.growSize, e);
            var r = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength),
                i = new Uint8Array(this.length() + t);
            return i.set(r), this.data = new DataView(i.buffer), this
        }, a.DataBuffer.prototype.putByte = function (e) {
            return this.accommodate(1), this.data.setUint8(this.write++, e), this
        }, a.DataBuffer.prototype.fillWithByte = function (e, t) {
            this.accommodate(t);
            for (var r = 0; r < t; ++r) this.data.setUint8(e);
            return this
        }, a.DataBuffer.prototype.putBytes = function (e, t) {
            if (a.isArrayBufferView(e)) {
                var r = (i = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)).byteLength - i.byteOffset;
                return this.accommodate(r), new Uint8Array(this.data.buffer, this.write).set(i), this.write += r, this
            }
            if (a.isArrayBuffer(e)) {
                var i = new Uint8Array(e);
                return this.accommodate(i.byteLength), new Uint8Array(this.data.buffer).set(i, this.write), this.write += i.byteLength, this
            }
            if (e instanceof a.DataBuffer || "object" == typeof e && "number" == typeof e.read && "number" == typeof e.write && a.isArrayBufferView(e.data)) {
                i = new Uint8Array(e.data.byteLength, e.read, e.length());
                return this.accommodate(i.byteLength), new Uint8Array(e.data.byteLength, this.write).set(i), this.write += i.byteLength, this
            }
            if (e instanceof a.ByteStringBuffer && (e = e.data, t = "binary"), t = t || "binary", "string" == typeof e) {
                var n;
                if ("hex" === t) return this.accommodate(Math.ceil(e.length / 2)), n = new Uint8Array(this.data.buffer, this.write), this.write += a.binary.hex.decode(e, n, this.write), this;
                if ("base64" === t) return this.accommodate(3 * Math.ceil(e.length / 4)), n = new Uint8Array(this.data.buffer, this.write), this.write += a.binary.base64.decode(e, n, this.write), this;
                if ("utf8" === t && (e = a.encodeUtf8(e), t = "binary"), "binary" === t || "raw" === t) return this.accommodate(e.length), n = new Uint8Array(this.data.buffer, this.write), this.write += a.binary.raw.decode(n), this;
                if ("utf16" === t) return this.accommodate(2 * e.length), n = new Uint16Array(this.data.buffer, this.write), this.write += a.text.utf16.encode(n), this;
                throw new Error("Invalid encoding: " + t)
            }
            throw Error("Invalid parameter: " + e)
        }, a.DataBuffer.prototype.putBuffer = function (e) {
            return this.putBytes(e), e.clear(), this
        }, a.DataBuffer.prototype.putString = function (e) {
            return this.putBytes(e, "utf16")
        }, a.DataBuffer.prototype.putInt16 = function (e) {
            return this.accommodate(2), this.data.setInt16(this.write, e), this.write += 2, this
        }, a.DataBuffer.prototype.putInt24 = function (e) {
            return this.accommodate(3), this.data.setInt16(this.write, e >> 8 & 65535), this.data.setInt8(this.write, e >> 16 & 255), this.write += 3, this
        }, a.DataBuffer.prototype.putInt32 = function (e) {
            return this.accommodate(4), this.data.setInt32(this.write, e), this.write += 4, this
        }, a.DataBuffer.prototype.putInt16Le = function (e) {
            return this.accommodate(2), this.data.setInt16(this.write, e, !0), this.write += 2, this
        }, a.DataBuffer.prototype.putInt24Le = function (e) {
            return this.accommodate(3), this.data.setInt8(this.write, e >> 16 & 255), this.data.setInt16(this.write, e >> 8 & 65535, !0), this.write += 3, this
        }, a.DataBuffer.prototype.putInt32Le = function (e) {
            return this.accommodate(4), this.data.setInt32(this.write, e, !0), this.write += 4, this
        }, a.DataBuffer.prototype.putInt = function (e, t) {
            s(t), this.accommodate(t / 8);
            do {
                t -= 8, this.data.setInt8(this.write++, e >> t & 255)
            } while (t > 0);
            return this
        }, a.DataBuffer.prototype.putSignedInt = function (e, t) {
            return s(t), this.accommodate(t / 8), e < 0 && (e += 2 << t - 1), this.putInt(e, t)
        }, a.DataBuffer.prototype.getByte = function () {
            return this.data.getInt8(this.read++)
        }, a.DataBuffer.prototype.getInt16 = function () {
            var e = this.data.getInt16(this.read);
            return this.read += 2, e
        }, a.DataBuffer.prototype.getInt24 = function () {
            var e = this.data.getInt16(this.read) << 8 ^ this.data.getInt8(this.read + 2);
            return this.read += 3, e
        }, a.DataBuffer.prototype.getInt32 = function () {
            var e = this.data.getInt32(this.read);
            return this.read += 4, e
        }, a.DataBuffer.prototype.getInt16Le = function () {
            var e = this.data.getInt16(this.read, !0);
            return this.read += 2, e
        }, a.DataBuffer.prototype.getInt24Le = function () {
            var e = this.data.getInt8(this.read) ^ this.data.getInt16(this.read + 1, !0) << 8;
            return this.read += 3, e
        }, a.DataBuffer.prototype.getInt32Le = function () {
            var e = this.data.getInt32(this.read, !0);
            return this.read += 4, e
        }, a.DataBuffer.prototype.getInt = function (e) {
            s(e);
            var t = 0;
            do {
                t = (t << 8) + this.data.getInt8(this.read++), e -= 8
            } while (e > 0);
            return t
        }, a.DataBuffer.prototype.getSignedInt = function (e) {
            var t = this.getInt(e), r = 2 << e - 2;
            return t >= r && (t -= r << 1), t
        }, a.DataBuffer.prototype.getBytes = function (e) {
            var t;
            return e ? (e = Math.min(this.length(), e), t = this.data.slice(this.read, this.read + e), this.read += e) : 0 === e ? t = "" : (t = 0 === this.read ? this.data : this.data.slice(this.read), this.clear()), t
        }, a.DataBuffer.prototype.bytes = function (e) {
            return void 0 === e ? this.data.slice(this.read) : this.data.slice(this.read, this.read + e)
        }, a.DataBuffer.prototype.at = function (e) {
            return this.data.getUint8(this.read + e)
        }, a.DataBuffer.prototype.setAt = function (e, t) {
            return this.data.setUint8(e, t), this
        }, a.DataBuffer.prototype.last = function () {
            return this.data.getUint8(this.write - 1)
        }, a.DataBuffer.prototype.copy = function () {
            return new a.DataBuffer(this)
        }, a.DataBuffer.prototype.compact = function () {
            if (this.read > 0) {
                var e = new Uint8Array(this.data.buffer, this.read), t = new Uint8Array(e.byteLength);
                t.set(e), this.data = new DataView(t), this.write -= this.read, this.read = 0
            }
            return this
        }, a.DataBuffer.prototype.clear = function () {
            return this.data = new DataView(new ArrayBuffer(0)), this.read = this.write = 0, this
        }, a.DataBuffer.prototype.truncate = function (e) {
            return this.write = Math.max(0, this.length() - e), this.read = Math.min(this.read, this.write), this
        }, a.DataBuffer.prototype.toHex = function () {
            for (var e = "", t = this.read; t < this.data.byteLength; ++t) {
                var r = this.data.getUint8(t);
                r < 16 && (e += "0"), e += r.toString(16)
            }
            return e
        }, a.DataBuffer.prototype.toString = function (e) {
            var t = new Uint8Array(this.data, this.read, this.length());
            if ("binary" === (e = e || "utf8") || "raw" === e) return a.binary.raw.encode(t);
            if ("hex" === e) return a.binary.hex.encode(t);
            if ("base64" === e) return a.binary.base64.encode(t);
            if ("utf8" === e) return a.text.utf8.decode(t);
            if ("utf16" === e) return a.text.utf16.decode(t);
            throw new Error("Invalid encoding: " + e)
        }, a.createBuffer = function (e, t) {
            return t = t || "raw", void 0 !== e && "utf8" === t && (e = a.encodeUtf8(e)), new a.ByteBuffer(e)
        }, a.fillString = function (e, t) {
            for (var r = ""; t > 0;) 1 & t && (r += e), (t >>>= 1) > 0 && (e += e);
            return r
        }, a.xorBytes = function (e, t, r) {
            for (var i = "", n = "", a = "", s = 0, o = 0; r > 0; --r, ++s) n = e.charCodeAt(s) ^ t.charCodeAt(s), o >= 10 && (i += a, a = "", o = 0), a += String.fromCharCode(n), ++o;
            return i += a
        }, a.hexToBytes = function (e) {
            var t = "", r = 0;
            for (!0 & e.length && (r = 1, t += String.fromCharCode(parseInt(e[0], 16))); r < e.length; r += 2) t += String.fromCharCode(parseInt(e.substr(r, 2), 16));
            return t
        }, a.bytesToHex = function (e) {
            return a.createBuffer(e).toHex()
        }, a.int32ToBytes = function (e) {
            return String.fromCharCode(e >> 24 & 255) + String.fromCharCode(e >> 16 & 255) + String.fromCharCode(e >> 8 & 255) + String.fromCharCode(255 & e)
        };
        var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            f = [62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 64, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51],
            d = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        a.encode64 = function (e, t) {
            for (var r, i, n, a = "", s = "", o = 0; o < e.length;) r = e.charCodeAt(o++), i = e.charCodeAt(o++), n = e.charCodeAt(o++), a += c.charAt(r >> 2), a += c.charAt((3 & r) << 4 | i >> 4), isNaN(i) ? a += "==" : (a += c.charAt((15 & i) << 2 | n >> 6), a += isNaN(n) ? "=" : c.charAt(63 & n)), t && a.length > t && (s += a.substr(0, t) + "\r\n", a = a.substr(t));
            return s += a
        }, a.decode64 = function (e) {
            e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            for (var t, r, i, n, a = "", s = 0; s < e.length;) t = f[e.charCodeAt(s++) - 43], r = f[e.charCodeAt(s++) - 43], i = f[e.charCodeAt(s++) - 43], n = f[e.charCodeAt(s++) - 43], a += String.fromCharCode(t << 2 | r >> 4), 64 !== i && (a += String.fromCharCode((15 & r) << 4 | i >> 2), 64 !== n && (a += String.fromCharCode((3 & i) << 6 | n)));
            return a
        }, a.encodeUtf8 = function (e) {
            return unescape(encodeURIComponent(e))
        }, a.decodeUtf8 = function (e) {
            return decodeURIComponent(escape(e))
        }, a.binary = {
            raw: {},
            hex: {},
            base64: {},
            base58: {},
            baseN: {encode: n.encode, decode: n.decode}
        }, a.binary.raw.encode = function (e) {
            return String.fromCharCode.apply(null, e)
        }, a.binary.raw.decode = function (e, t, r) {
            var i = t;
            i || (i = new Uint8Array(e.length));
            for (var n = r = r || 0, a = 0; a < e.length; ++a) i[n++] = e.charCodeAt(a);
            return t ? n - r : i
        }, a.binary.hex.encode = a.bytesToHex, a.binary.hex.decode = function (e, t, r) {
            var i = t;
            i || (i = new Uint8Array(Math.ceil(e.length / 2)));
            var n = 0, a = r = r || 0;
            for (1 & e.length && (n = 1, i[a++] = parseInt(e[0], 16)); n < e.length; n += 2) i[a++] = parseInt(e.substr(n, 2), 16);
            return t ? a - r : i
        }, a.binary.base64.encode = function (e, t) {
            for (var r, i, n, a = "", s = "", o = 0; o < e.byteLength;) r = e[o++], i = e[o++], n = e[o++], a += c.charAt(r >> 2), a += c.charAt((3 & r) << 4 | i >> 4), isNaN(i) ? a += "==" : (a += c.charAt((15 & i) << 2 | n >> 6), a += isNaN(n) ? "=" : c.charAt(63 & n)), t && a.length > t && (s += a.substr(0, t) + "\r\n", a = a.substr(t));
            return s += a
        }, a.binary.base64.decode = function (e, t, r) {
            var i, n, a, s, o = t;
            o || (o = new Uint8Array(3 * Math.ceil(e.length / 4))), e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            for (var c = 0, d = r = r || 0; c < e.length;) i = f[e.charCodeAt(c++) - 43], n = f[e.charCodeAt(c++) - 43], a = f[e.charCodeAt(c++) - 43], s = f[e.charCodeAt(c++) - 43], o[d++] = i << 2 | n >> 4, 64 !== a && (o[d++] = (15 & n) << 4 | a >> 2, 64 !== s && (o[d++] = (3 & a) << 6 | s));
            return t ? d - r : o.subarray(0, d)
        }, a.binary.base58.encode = function (e, t) {
            return a.binary.baseN.encode(e, d, t)
        }, a.binary.base58.decode = function (e, t) {
            return a.binary.baseN.decode(e, d, t)
        }, a.text = {utf8: {}, utf16: {}}, a.text.utf8.encode = function (e, t, r) {
            e = a.encodeUtf8(e);
            var i = t;
            i || (i = new Uint8Array(e.length));
            for (var n = r = r || 0, s = 0; s < e.length; ++s) i[n++] = e.charCodeAt(s);
            return t ? n - r : i
        }, a.text.utf8.decode = function (e) {
            return a.decodeUtf8(String.fromCharCode.apply(null, e))
        }, a.text.utf16.encode = function (e, t, r) {
            var i = t;
            i || (i = new Uint8Array(2 * e.length));
            for (var n = new Uint16Array(i.buffer), a = r = r || 0, s = r, o = 0; o < e.length; ++o) n[s++] = e.charCodeAt(o), a += 2;
            return t ? a - r : i
        }, a.text.utf16.decode = function (e) {
            return String.fromCharCode.apply(null, new Uint16Array(e.buffer))
        }, a.deflate = function (e, t, r) {
            if (t = a.decode64(e.deflate(a.encode64(t)).rval), r) {
                var i = 2;
                32 & t.charCodeAt(1) && (i = 6), t = t.substring(i, t.length - 4)
            }
            return t
        }, a.inflate = function (e, t, r) {
            var i = e.inflate(a.encode64(t)).rval;
            return null === i ? null : a.decode64(i)
        };
        var u = function (e, t, r) {
            if (!e) throw new Error("WebStorage not available.");
            var i;
            if (null === r ? i = e.removeItem(t) : (r = a.encode64(JSON.stringify(r)), i = e.setItem(t, r)), void 0 !== i && !0 !== i.rval) {
                var n = new Error(i.error.message);
                throw n.id = i.error.id, n.name = i.error.name, n
            }
        }, l = function (e, t) {
            if (!e) throw new Error("WebStorage not available.");
            var r = e.getItem(t);
            if (e.init) if (null === r.rval) {
                if (r.error) {
                    var i = new Error(r.error.message);
                    throw i.id = r.error.id, i.name = r.error.name, i
                }
                r = null
            } else r = r.rval;
            return null !== r && (r = JSON.parse(a.decode64(r))), r
        }, h = function (e, t, r, i) {
            var n = l(e, t);
            null === n && (n = {}), n[r] = i, u(e, t, n)
        }, p = function (e, t, r) {
            var i = l(e, t);
            return null !== i && (i = r in i ? i[r] : null), i
        }, g = function (e, t, r) {
            var i = l(e, t);
            if (null !== i && r in i) {
                delete i[r];
                var n = !0;
                for (var a in i) {
                    n = !1;
                    break
                }
                n && (i = null), u(e, t, i)
            }
        }, y = function (e, t) {
            u(e, t, null)
        }, m = function (e, t, r) {
            var i, n = null;
            void 0 === r && (r = ["web", "flash"]);
            var a = !1, s = null;
            for (var o in r) {
                i = r[o];
                try {
                    if ("flash" === i || "both" === i) {
                        if (null === t[0]) throw new Error("Flash local storage not available.");
                        n = e.apply(this, t), a = "flash" === i
                    }
                    "web" !== i && "both" !== i || (t[0] = localStorage, n = e.apply(this, t), a = !0)
                } catch (c) {
                    s = c
                }
                if (a) break
            }
            if (!a) throw s;
            return n
        };
        a.setItem = function (e, t, r, i, n) {
            m(h, arguments, n)
        }, a.getItem = function (e, t, r, i) {
            return m(p, arguments, i)
        }, a.removeItem = function (e, t, r, i) {
            m(g, arguments, i)
        }, a.clearItems = function (e, t, r) {
            m(y, arguments, r)
        }, a.isEmpty = function (e) {
            for (var t in e) if (e.hasOwnProperty(t)) return !1;
            return !0
        }, a.format = function (e) {
            for (var t, r, i = /%./g, n = 0, a = [], s = 0; t = i.exec(e);) {
                (r = e.substring(s, i.lastIndex - 2)).length > 0 && a.push(r), s = i.lastIndex;
                var o = t[0][1];
                switch (o) {
                    case"s":
                    case"o":
                        n < arguments.length ? a.push(arguments[1 + n++]) : a.push("<?>");
                        break;
                    case"%":
                        a.push("%");
                        break;
                    default:
                        a.push("<%" + o + "?>")
                }
            }
            return a.push(e.substring(s)), a.join("")
        }, a.formatNumber = function (e, t, r, i) {
            var n = e, a = isNaN(t = Math.abs(t)) ? 2 : t, s = void 0 === r ? "," : r, o = void 0 === i ? "." : i,
                c = n < 0 ? "-" : "", f = parseInt(n = Math.abs(+n || 0).toFixed(a), 10) + "",
                d = f.length > 3 ? f.length % 3 : 0;
            return c + (d ? f.substr(0, d) + o : "") + f.substr(d).replace(/(\d{3})(?=\d)/g, "$1" + o) + (a ? s + Math.abs(n - f).toFixed(a).slice(2) : "")
        }, a.formatSize = function (e) {
            return e = e >= 1073741824 ? a.formatNumber(e / 1073741824, 2, ".", "") + " GiB" : e >= 1048576 ? a.formatNumber(e / 1048576, 2, ".", "") + " MiB" : e >= 1024 ? a.formatNumber(e / 1024, 0) + " KiB" : a.formatNumber(e, 0) + " bytes"
        }, a.bytesFromIP = function (e) {
            return -1 !== e.indexOf(".") ? a.bytesFromIPv4(e) : -1 !== e.indexOf(":") ? a.bytesFromIPv6(e) : null
        }, a.bytesFromIPv4 = function (e) {
            if (4 !== (e = e.split(".")).length) return null;
            for (var t = a.createBuffer(), r = 0; r < e.length; ++r) {
                var i = parseInt(e[r], 10);
                if (isNaN(i)) return null;
                t.putByte(i)
            }
            return t.getBytes()
        }, a.bytesFromIPv6 = function (e) {
            for (var t = 0, r = 2 * (8 - (e = e.split(":").filter((function (e) {
                return 0 === e.length && ++t, !0
            }))).length + t), i = a.createBuffer(), n = 0; n < 8; ++n) if (e[n] && 0 !== e[n].length) {
                var s = a.hexToBytes(e[n]);
                s.length < 2 && i.putByte(0), i.putBytes(s)
            } else i.fillWithByte(0, r), r = 0;
            return i.getBytes()
        }, a.bytesToIP = function (e) {
            return 4 === e.length ? a.bytesToIPv4(e) : 16 === e.length ? a.bytesToIPv6(e) : null
        }, a.bytesToIPv4 = function (e) {
            if (4 !== e.length) return null;
            for (var t = [], r = 0; r < e.length; ++r) t.push(e.charCodeAt(r));
            return t.join(".")
        }, a.bytesToIPv6 = function (e) {
            if (16 !== e.length) return null;
            for (var t = [], r = [], i = 0, n = 0; n < e.length; n += 2) {
                for (var s = a.bytesToHex(e[n] + e[n + 1]); "0" === s[0] && "0" !== s;) s = s.substr(1);
                if ("0" === s) {
                    var o = r[r.length - 1], c = t.length;
                    o && c === o.end + 1 ? (o.end = c, o.end - o.start > r[i].end - r[i].start && (i = r.length - 1)) : r.push({
                        start: c,
                        end: c
                    })
                }
                t.push(s)
            }
            if (r.length > 0) {
                var f = r[i];
                f.end - f.start > 0 && (t.splice(f.start, f.end - f.start + 1, ""), 0 === f.start && t.unshift(""), 7 === f.end && t.push(""))
            }
            return t.join(":")
        }, a.estimateCores = function (e, t) {
            if ("function" == typeof e && (t = e, e = {}), e = e || {}, "cores" in a && !e.update) return t(null, a.cores);
            if ("undefined" != typeof navigator && "hardwareConcurrency" in navigator && navigator.hardwareConcurrency > 0) return a.cores = navigator.hardwareConcurrency, t(null, a.cores);
            if ("undefined" == typeof Worker) return a.cores = 1, t(null, a.cores);
            if ("undefined" == typeof Blob) return a.cores = 2, t(null, a.cores);
            var r = URL.createObjectURL(new Blob(["(", function () {
                self.addEventListener("message", (function (e) {
                    for (var t = Date.now(), r = t + 4; Date.now() < r;) ;
                    self.postMessage({st: t, et: r})
                }))
            }.toString(), ")()"], {type: "application/javascript"}));
            !function e(i, n, s) {
                if (0 === n) {
                    var o = Math.floor(i.reduce((function (e, t) {
                        return e + t
                    }), 0) / i.length);
                    return a.cores = Math.max(1, o), URL.revokeObjectURL(r), t(null, a.cores)
                }
                !function (e, t) {
                    for (var i = [], n = [], a = 0; a < e; ++a) {
                        var s = new Worker(r);
                        s.addEventListener("message", (function (r) {
                            if (n.push(r.data), n.length === e) {
                                for (var a = 0; a < e; ++a) i[a].terminate();
                                t(null, n)
                            }
                        })), i.push(s)
                    }
                    for (a = 0; a < e; ++a) i[a].postMessage(a)
                }(s, (function (t, r) {
                    i.push(function (e, t) {
                        for (var r = [], i = 0; i < e; ++i) for (var n = t[i], a = r[i] = [], s = 0; s < e; ++s) if (i !== s) {
                            var o = t[s];
                            (n.st > o.st && n.st < o.et || o.st > n.st && o.st < n.et) && a.push(s)
                        }
                        return r.reduce((function (e, t) {
                            return Math.max(e, t.length)
                        }), 0)
                    }(s, r)), e(i, n - 1, s)
                }))
            }([], 5, 16)
        }
    }, 25414: (e, t, r) => {
        var i = r(3832);
        r(8925), r(3068), r(33480), r(28991), r(86971), r(66270), r(26953), r(47629), r(28095), r(97116);
        var n = i.asn1, a = e.exports = i.pki = i.pki || {}, s = a.oids, o = {};
        o.CN = s.commonName, o.commonName = "CN", o.C = s.countryName, o.countryName = "C", o.L = s.localityName, o.localityName = "L", o.ST = s.stateOrProvinceName, o.stateOrProvinceName = "ST", o.O = s.organizationName, o.organizationName = "O", o.OU = s.organizationalUnitName, o.organizationalUnitName = "OU", o.E = s.emailAddress, o.emailAddress = "E";
        var c = i.pki.rsa.publicKeyValidator, f = {
            name: "Certificate", tagClass: n.Class.UNIVERSAL, type: n.Type.SEQUENCE, constructed: !0, value: [{
                name: "Certificate.TBSCertificate",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "tbsCertificate",
                value: [{
                    name: "Certificate.TBSCertificate.version",
                    tagClass: n.Class.CONTEXT_SPECIFIC,
                    type: 0,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.version.integer",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.INTEGER,
                        constructed: !1,
                        capture: "certVersion"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.serialNumber",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.INTEGER,
                    constructed: !1,
                    capture: "certSerialNumber"
                }, {
                    name: "Certificate.TBSCertificate.signature",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.signature.algorithm",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.OID,
                        constructed: !1,
                        capture: "certinfoSignatureOid"
                    }, {
                        name: "Certificate.TBSCertificate.signature.parameters",
                        tagClass: n.Class.UNIVERSAL,
                        optional: !0,
                        captureAsn1: "certinfoSignatureParams"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.issuer",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "certIssuer"
                }, {
                    name: "Certificate.TBSCertificate.validity",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.validity.notBefore (utc)",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.UTCTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity1UTCTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notBefore (generalized)",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.GENERALIZEDTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity2GeneralizedTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notAfter (utc)",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.UTCTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity3UTCTime"
                    }, {
                        name: "Certificate.TBSCertificate.validity.notAfter (generalized)",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.GENERALIZEDTIME,
                        constructed: !1,
                        optional: !0,
                        capture: "certValidity4GeneralizedTime"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.subject",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    captureAsn1: "certSubject"
                }, c, {
                    name: "Certificate.TBSCertificate.issuerUniqueID",
                    tagClass: n.Class.CONTEXT_SPECIFIC,
                    type: 1,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.issuerUniqueID.id",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.BITSTRING,
                        constructed: !1,
                        captureBitStringValue: "certIssuerUniqueId"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.subjectUniqueID",
                    tagClass: n.Class.CONTEXT_SPECIFIC,
                    type: 2,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "Certificate.TBSCertificate.subjectUniqueID.id",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.BITSTRING,
                        constructed: !1,
                        captureBitStringValue: "certSubjectUniqueId"
                    }]
                }, {
                    name: "Certificate.TBSCertificate.extensions",
                    tagClass: n.Class.CONTEXT_SPECIFIC,
                    type: 3,
                    constructed: !0,
                    captureAsn1: "certExtensions",
                    optional: !0
                }]
            }, {
                name: "Certificate.signatureAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "Certificate.signatureAlgorithm.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "certSignatureOid"
                }, {
                    name: "Certificate.TBSCertificate.signature.parameters",
                    tagClass: n.Class.UNIVERSAL,
                    optional: !0,
                    captureAsn1: "certSignatureParams"
                }]
            }, {
                name: "Certificate.signatureValue",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.BITSTRING,
                constructed: !1,
                captureBitStringValue: "certSignature"
            }]
        }, d = {
            name: "rsapss",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            value: [{
                name: "rsapss.hashAlgorithm",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                value: [{
                    name: "rsapss.hashAlgorithm.AlgorithmIdentifier",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Class.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "rsapss.hashAlgorithm.AlgorithmIdentifier.algorithm",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.OID,
                        constructed: !1,
                        capture: "hashOid"
                    }]
                }]
            }, {
                name: "rsapss.maskGenAlgorithm",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 1,
                constructed: !0,
                value: [{
                    name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Class.SEQUENCE,
                    constructed: !0,
                    optional: !0,
                    value: [{
                        name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.algorithm",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.OID,
                        constructed: !1,
                        capture: "maskGenOid"
                    }, {
                        name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.SEQUENCE,
                        constructed: !0,
                        value: [{
                            name: "rsapss.maskGenAlgorithm.AlgorithmIdentifier.params.algorithm",
                            tagClass: n.Class.UNIVERSAL,
                            type: n.Type.OID,
                            constructed: !1,
                            capture: "maskGenHashOid"
                        }]
                    }]
                }]
            }, {
                name: "rsapss.saltLength",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 2,
                optional: !0,
                value: [{
                    name: "rsapss.saltLength.saltLength",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Class.INTEGER,
                    constructed: !1,
                    capture: "saltLength"
                }]
            }, {
                name: "rsapss.trailerField",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 3,
                optional: !0,
                value: [{
                    name: "rsapss.trailer.trailer",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Class.INTEGER,
                    constructed: !1,
                    capture: "trailer"
                }]
            }]
        }, u = {
            name: "CertificationRequestInfo",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "certificationRequestInfo",
            value: [{
                name: "CertificationRequestInfo.integer",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.INTEGER,
                constructed: !1,
                capture: "certificationRequestInfoVersion"
            }, {
                name: "CertificationRequestInfo.subject",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                captureAsn1: "certificationRequestInfoSubject"
            }, c, {
                name: "CertificationRequestInfo.attributes",
                tagClass: n.Class.CONTEXT_SPECIFIC,
                type: 0,
                constructed: !0,
                optional: !0,
                capture: "certificationRequestInfoAttributes",
                value: [{
                    name: "CertificationRequestInfo.attributes",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.SEQUENCE,
                    constructed: !0,
                    value: [{
                        name: "CertificationRequestInfo.attributes.type",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.OID,
                        constructed: !1
                    }, {
                        name: "CertificationRequestInfo.attributes.value",
                        tagClass: n.Class.UNIVERSAL,
                        type: n.Type.SET,
                        constructed: !0
                    }]
                }]
            }]
        }, l = {
            name: "CertificationRequest",
            tagClass: n.Class.UNIVERSAL,
            type: n.Type.SEQUENCE,
            constructed: !0,
            captureAsn1: "csr",
            value: [u, {
                name: "CertificationRequest.signatureAlgorithm",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.SEQUENCE,
                constructed: !0,
                value: [{
                    name: "CertificationRequest.signatureAlgorithm.algorithm",
                    tagClass: n.Class.UNIVERSAL,
                    type: n.Type.OID,
                    constructed: !1,
                    capture: "csrSignatureOid"
                }, {
                    name: "CertificationRequest.signatureAlgorithm.parameters",
                    tagClass: n.Class.UNIVERSAL,
                    optional: !0,
                    captureAsn1: "csrSignatureParams"
                }]
            }, {
                name: "CertificationRequest.signature",
                tagClass: n.Class.UNIVERSAL,
                type: n.Type.BITSTRING,
                constructed: !1,
                captureBitStringValue: "csrSignature"
            }]
        };

        function h(e, t) {
            "string" == typeof t && (t = {shortName: t});
            for (var r, i = null, n = 0; null === i && n < e.attributes.length; ++n) r = e.attributes[n], (t.type && t.type === r.type || t.name && t.name === r.name || t.shortName && t.shortName === r.shortName) && (i = r);
            return i
        }

        a.RDNAttributesAsArray = function (e, t) {
            for (var r, i, a, c = [], f = 0; f < e.value.length; ++f) {
                r = e.value[f];
                for (var d = 0; d < r.value.length; ++d) a = {}, i = r.value[d], a.type = n.derToOid(i.value[0].value), a.value = i.value[1].value, a.valueTagClass = i.value[1].type, a.type in s && (a.name = s[a.type], a.name in o && (a.shortName = o[a.name])), t && (t.update(a.type), t.update(a.value)), c.push(a)
            }
            return c
        }, a.CRIAttributesAsArray = function (e) {
            for (var t = [], r = 0; r < e.length; ++r) for (var i = e[r], c = n.derToOid(i.value[0].value), f = i.value[1].value, d = 0; d < f.length; ++d) {
                var u = {};
                if (u.type = c, u.value = f[d].value, u.valueTagClass = f[d].type, u.type in s && (u.name = s[u.type], u.name in o && (u.shortName = o[u.name])), u.type === s.extensionRequest) {
                    u.extensions = [];
                    for (var l = 0; l < u.value.length; ++l) u.extensions.push(a.certificateExtensionFromAsn1(u.value[l]))
                }
                t.push(u)
            }
            return t
        };
        var p = function (e, t, r) {
            var i = {};
            if (e !== s["RSASSA-PSS"]) return i;
            r && (i = {
                hash: {algorithmOid: s.sha1},
                mgf: {algorithmOid: s.mgf1, hash: {algorithmOid: s.sha1}},
                saltLength: 20
            });
            var a = {}, o = [];
            if (!n.validate(t, d, a, o)) {
                var c = new Error("Cannot read RSASSA-PSS parameter block.");
                throw c.errors = o, c
            }
            return void 0 !== a.hashOid && (i.hash = i.hash || {}, i.hash.algorithmOid = n.derToOid(a.hashOid)), void 0 !== a.maskGenOid && (i.mgf = i.mgf || {}, i.mgf.algorithmOid = n.derToOid(a.maskGenOid), i.mgf.hash = i.mgf.hash || {}, i.mgf.hash.algorithmOid = n.derToOid(a.maskGenHashOid)), void 0 !== a.saltLength && (i.saltLength = a.saltLength.charCodeAt(0)), i
        }, g = function (e) {
            switch (s[e.signatureOid]) {
                case"sha1WithRSAEncryption":
                case"sha1WithRSASignature":
                    return i.md.sha1.create();
                case"md5WithRSAEncryption":
                    return i.md.md5.create();
                case"sha256WithRSAEncryption":
                case"RSASSA-PSS":
                    return i.md.sha256.create();
                case"sha384WithRSAEncryption":
                    return i.md.sha384.create();
                case"sha512WithRSAEncryption":
                    return i.md.sha512.create();
                default:
                    var t = new Error("Could not compute " + e.type + " digest. Unknown signature OID.");
                    throw t.signatureOid = e.signatureOid, t
            }
        }, y = function (e) {
            var t, r = e.certificate;
            switch (r.signatureOid) {
                case s.sha1WithRSAEncryption:
                case s.sha1WithRSASignature:
                    break;
                case s["RSASSA-PSS"]:
                    var n, a, o;
                    if (void 0 === (n = s[r.signatureParameters.mgf.hash.algorithmOid]) || void 0 === i.md[n]) throw(o = new Error("Unsupported MGF hash function.")).oid = r.signatureParameters.mgf.hash.algorithmOid, o.name = n, o;
                    if (void 0 === (a = s[r.signatureParameters.mgf.algorithmOid]) || void 0 === i.mgf[a]) throw(o = new Error("Unsupported MGF function.")).oid = r.signatureParameters.mgf.algorithmOid, o.name = a, o;
                    if (a = i.mgf[a].create(i.md[n].create()), void 0 === (n = s[r.signatureParameters.hash.algorithmOid]) || void 0 === i.md[n]) throw(o = new Error("Unsupported RSASSA-PSS hash function.")).oid = r.signatureParameters.hash.algorithmOid, o.name = n, o;
                    t = i.pss.create(i.md[n].create(), a, r.signatureParameters.saltLength)
            }
            return r.publicKey.verify(e.md.digest().getBytes(), e.signature, t)
        };

        function m(e) {
            for (var t, r, a = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []), s = e.attributes, o = 0; o < s.length; ++o) {
                var c = (t = s[o]).value, f = n.Type.PRINTABLESTRING;
                "valueTagClass" in t && (f = t.valueTagClass) === n.Type.UTF8 && (c = i.util.encodeUtf8(c)), r = n.create(n.Class.UNIVERSAL, n.Type.SET, !0, [n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(t.type).getBytes()), n.create(n.Class.UNIVERSAL, f, !1, c)])]), a.value.push(r)
            }
            return a
        }

        function v(e) {
            for (var t, r = 0; r < e.length; ++r) {
                if (void 0 === (t = e[r]).name && (t.type && t.type in a.oids ? t.name = a.oids[t.type] : t.shortName && t.shortName in o && (t.name = a.oids[o[t.shortName]])), void 0 === t.type) {
                    if (!t.name || !(t.name in a.oids)) throw(c = new Error("Attribute type not specified.")).attribute = t, c;
                    t.type = a.oids[t.name]
                }
                if (void 0 === t.shortName && t.name && t.name in o && (t.shortName = o[t.name]), t.type === s.extensionRequest && (t.valueConstructed = !0, t.valueTagClass = n.Type.SEQUENCE, !t.value && t.extensions)) {
                    t.value = [];
                    for (var i = 0; i < t.extensions.length; ++i) t.value.push(a.certificateExtensionToAsn1(b(t.extensions[i])))
                }
                var c;
                if (void 0 === t.value) throw(c = new Error("Attribute value not specified.")).attribute = t, c
            }
        }

        function b(e, t) {
            if (t = t || {}, void 0 === e.name && e.id && e.id in a.oids && (e.name = a.oids[e.id]), void 0 === e.id) {
                if (!e.name || !(e.name in a.oids)) throw(E = new Error("Extension ID not specified.")).extension = e, E;
                e.id = a.oids[e.name]
            }
            if (void 0 !== e.value) return e;
            if ("keyUsage" === e.name) {
                var r = 0, o = 0, c = 0;
                e.digitalSignature && (o |= 128, r = 7), e.nonRepudiation && (o |= 64, r = 6), e.keyEncipherment && (o |= 32, r = 5), e.dataEncipherment && (o |= 16, r = 4), e.keyAgreement && (o |= 8, r = 3), e.keyCertSign && (o |= 4, r = 2), e.cRLSign && (o |= 2, r = 1), e.encipherOnly && (o |= 1, r = 0), e.decipherOnly && (c |= 128, r = 7);
                var f = String.fromCharCode(r);
                0 !== c ? f += String.fromCharCode(o) + String.fromCharCode(c) : 0 !== o && (f += String.fromCharCode(o)), e.value = n.create(n.Class.UNIVERSAL, n.Type.BITSTRING, !1, f)
            } else if ("basicConstraints" === e.name) e.value = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []), e.cA && e.value.value.push(n.create(n.Class.UNIVERSAL, n.Type.BOOLEAN, !1, String.fromCharCode(255))), "pathLenConstraint" in e && e.value.value.push(n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(e.pathLenConstraint).getBytes())); else if ("extKeyUsage" === e.name) {
                e.value = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []);
                var d = e.value.value;
                for (var u in e) !0 === e[u] && (u in s ? d.push(n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(s[u]).getBytes())) : -1 !== u.indexOf(".") && d.push(n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(u).getBytes())))
            } else if ("nsCertType" === e.name) {
                r = 0, o = 0;
                e.client && (o |= 128, r = 7), e.server && (o |= 64, r = 6), e.email && (o |= 32, r = 5), e.objsign && (o |= 16, r = 4), e.reserved && (o |= 8, r = 3), e.sslCA && (o |= 4, r = 2), e.emailCA && (o |= 2, r = 1), e.objCA && (o |= 1, r = 0);
                f = String.fromCharCode(r);
                0 !== o && (f += String.fromCharCode(o)), e.value = n.create(n.Class.UNIVERSAL, n.Type.BITSTRING, !1, f)
            } else if ("subjectAltName" === e.name || "issuerAltName" === e.name) {
                e.value = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []);
                for (var l = 0; l < e.altNames.length; ++l) {
                    f = (v = e.altNames[l]).value;
                    if (7 === v.type && v.ip) {
                        if (null === (f = i.util.bytesFromIP(v.ip))) throw(E = new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.')).extension = e, E
                    } else 8 === v.type && (f = v.oid ? n.oidToDer(n.oidToDer(v.oid)) : n.oidToDer(f));
                    e.value.value.push(n.create(n.Class.CONTEXT_SPECIFIC, v.type, !1, f))
                }
            } else if ("nsComment" === e.name && t.cert) {
                if (!/^[\x00-\x7F]*$/.test(e.comment) || e.comment.length < 1 || e.comment.length > 128) throw new Error('Invalid "nsComment" content.');
                e.value = n.create(n.Class.UNIVERSAL, n.Type.IA5STRING, !1, e.comment)
            } else if ("subjectKeyIdentifier" === e.name && t.cert) {
                var h = t.cert.generateSubjectKeyIdentifier();
                e.subjectKeyIdentifier = h.toHex(), e.value = n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, h.getBytes())
            } else if ("authorityKeyIdentifier" === e.name && t.cert) {
                e.value = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []);
                d = e.value.value;
                if (e.keyIdentifier) {
                    var p = !0 === e.keyIdentifier ? t.cert.generateSubjectKeyIdentifier().getBytes() : e.keyIdentifier;
                    d.push(n.create(n.Class.CONTEXT_SPECIFIC, 0, !1, p))
                }
                if (e.authorityCertIssuer) {
                    var g = [n.create(n.Class.CONTEXT_SPECIFIC, 4, !0, [m(!0 === e.authorityCertIssuer ? t.cert.issuer : e.authorityCertIssuer)])];
                    d.push(n.create(n.Class.CONTEXT_SPECIFIC, 1, !0, g))
                }
                if (e.serialNumber) {
                    var y = i.util.hexToBytes(!0 === e.serialNumber ? t.cert.serialNumber : e.serialNumber);
                    d.push(n.create(n.Class.CONTEXT_SPECIFIC, 2, !1, y))
                }
            } else if ("cRLDistributionPoints" === e.name) {
                e.value = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []);
                d = e.value.value;
                var v, b = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []),
                    w = n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, []);
                for (l = 0; l < e.altNames.length; ++l) {
                    f = (v = e.altNames[l]).value;
                    if (7 === v.type && v.ip) {
                        if (null === (f = i.util.bytesFromIP(v.ip))) throw(E = new Error('Extension "ip" value is not a valid IPv4 or IPv6 address.')).extension = e, E
                    } else 8 === v.type && (f = v.oid ? n.oidToDer(n.oidToDer(v.oid)) : n.oidToDer(f));
                    w.value.push(n.create(n.Class.CONTEXT_SPECIFIC, v.type, !1, f))
                }
                b.value.push(n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [w])), d.push(b)
            }
            var E;
            if (void 0 === e.value) throw(E = new Error("Extension value not specified.")).extension = e, E;
            return e
        }

        function w(e, t) {
            if (e === s["RSASSA-PSS"]) {
                var r = [];
                return void 0 !== t.hash.algorithmOid && r.push(n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(t.hash.algorithmOid).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.NULL, !1, "")])])), void 0 !== t.mgf.algorithmOid && r.push(n.create(n.Class.CONTEXT_SPECIFIC, 1, !0, [n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(t.mgf.algorithmOid).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(t.mgf.hash.algorithmOid).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.NULL, !1, "")])])])), void 0 !== t.saltLength && r.push(n.create(n.Class.CONTEXT_SPECIFIC, 2, !0, [n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(t.saltLength).getBytes())])), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, r)
            }
            return n.create(n.Class.UNIVERSAL, n.Type.NULL, !1, "")
        }

        function E(e) {
            var t = n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, []);
            if (0 === e.attributes.length) return t;
            for (var r = e.attributes, a = 0; a < r.length; ++a) {
                var s = r[a], o = s.value, c = n.Type.UTF8;
                "valueTagClass" in s && (c = s.valueTagClass), c === n.Type.UTF8 && (o = i.util.encodeUtf8(o));
                var f = !1;
                "valueConstructed" in s && (f = s.valueConstructed);
                var d = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(s.type).getBytes()), n.create(n.Class.UNIVERSAL, n.Type.SET, !0, [n.create(n.Class.UNIVERSAL, c, f, o)])]);
                t.value.push(d)
            }
            return t
        }

        a.certificateFromPem = function (e, t, r) {
            var s = i.pem.decode(e)[0];
            if ("CERTIFICATE" !== s.type && "X509 CERTIFICATE" !== s.type && "TRUSTED CERTIFICATE" !== s.type) {
                var o = new Error('Could not convert certificate from PEM; PEM header type is not "CERTIFICATE", "X509 CERTIFICATE", or "TRUSTED CERTIFICATE".');
                throw o.headerType = s.type, o
            }
            if (s.procType && "ENCRYPTED" === s.procType.type) throw new Error("Could not convert certificate from PEM; PEM is encrypted.");
            var c = n.fromDer(s.body, r);
            return a.certificateFromAsn1(c, t)
        }, a.certificateToPem = function (e, t) {
            var r = {type: "CERTIFICATE", body: n.toDer(a.certificateToAsn1(e)).getBytes()};
            return i.pem.encode(r, {maxline: t})
        }, a.publicKeyFromPem = function (e) {
            var t = i.pem.decode(e)[0];
            if ("PUBLIC KEY" !== t.type && "RSA PUBLIC KEY" !== t.type) {
                var r = new Error('Could not convert public key from PEM; PEM header type is not "PUBLIC KEY" or "RSA PUBLIC KEY".');
                throw r.headerType = t.type, r
            }
            if (t.procType && "ENCRYPTED" === t.procType.type) throw new Error("Could not convert public key from PEM; PEM is encrypted.");
            var s = n.fromDer(t.body);
            return a.publicKeyFromAsn1(s)
        }, a.publicKeyToPem = function (e, t) {
            var r = {type: "PUBLIC KEY", body: n.toDer(a.publicKeyToAsn1(e)).getBytes()};
            return i.pem.encode(r, {maxline: t})
        }, a.publicKeyToRSAPublicKeyPem = function (e, t) {
            var r = {type: "RSA PUBLIC KEY", body: n.toDer(a.publicKeyToRSAPublicKey(e)).getBytes()};
            return i.pem.encode(r, {maxline: t})
        }, a.getPublicKeyFingerprint = function (e, t) {
            var r, s = (t = t || {}).md || i.md.sha1.create();
            switch (t.type || "RSAPublicKey") {
                case"RSAPublicKey":
                    r = n.toDer(a.publicKeyToRSAPublicKey(e)).getBytes();
                    break;
                case"SubjectPublicKeyInfo":
                    r = n.toDer(a.publicKeyToAsn1(e)).getBytes();
                    break;
                default:
                    throw new Error('Unknown fingerprint type "' + t.type + '".')
            }
            s.start(), s.update(r);
            var o = s.digest();
            if ("hex" === t.encoding) {
                var c = o.toHex();
                return t.delimiter ? c.match(/.{2}/g).join(t.delimiter) : c
            }
            if ("binary" === t.encoding) return o.getBytes();
            if (t.encoding) throw new Error('Unknown encoding "' + t.encoding + '".');
            return o
        }, a.certificationRequestFromPem = function (e, t, r) {
            var s = i.pem.decode(e)[0];
            if ("CERTIFICATE REQUEST" !== s.type) {
                var o = new Error('Could not convert certification request from PEM; PEM header type is not "CERTIFICATE REQUEST".');
                throw o.headerType = s.type, o
            }
            if (s.procType && "ENCRYPTED" === s.procType.type) throw new Error("Could not convert certification request from PEM; PEM is encrypted.");
            var c = n.fromDer(s.body, r);
            return a.certificationRequestFromAsn1(c, t)
        }, a.certificationRequestToPem = function (e, t) {
            var r = {type: "CERTIFICATE REQUEST", body: n.toDer(a.certificationRequestToAsn1(e)).getBytes()};
            return i.pem.encode(r, {maxline: t})
        }, a.createCertificate = function () {
            var e = {version: 2, serialNumber: "00", signatureOid: null, signature: null, siginfo: {}};
            return e.siginfo.algorithmOid = null, e.validity = {}, e.validity.notBefore = new Date, e.validity.notAfter = new Date, e.issuer = {}, e.issuer.getField = function (t) {
                return h(e.issuer, t)
            }, e.issuer.addField = function (t) {
                v([t]), e.issuer.attributes.push(t)
            }, e.issuer.attributes = [], e.issuer.hash = null, e.subject = {}, e.subject.getField = function (t) {
                return h(e.subject, t)
            }, e.subject.addField = function (t) {
                v([t]), e.subject.attributes.push(t)
            }, e.subject.attributes = [], e.subject.hash = null, e.extensions = [], e.publicKey = null, e.md = null, e.setSubject = function (t, r) {
                v(t), e.subject.attributes = t, delete e.subject.uniqueId, r && (e.subject.uniqueId = r), e.subject.hash = null
            }, e.setIssuer = function (t, r) {
                v(t), e.issuer.attributes = t, delete e.issuer.uniqueId, r && (e.issuer.uniqueId = r), e.issuer.hash = null
            }, e.setExtensions = function (t) {
                for (var r = 0; r < t.length; ++r) b(t[r], {cert: e});
                e.extensions = t
            }, e.getExtension = function (t) {
                "string" == typeof t && (t = {name: t});
                for (var r, i = null, n = 0; null === i && n < e.extensions.length; ++n) r = e.extensions[n], (t.id && r.id === t.id || t.name && r.name === t.name) && (i = r);
                return i
            }, e.sign = function (t, r) {
                e.md = r || i.md.sha1.create();
                var o = s[e.md.algorithm + "WithRSAEncryption"];
                if (!o) {
                    var c = new Error("Could not compute certificate digest. Unknown message digest algorithm OID.");
                    throw c.algorithm = e.md.algorithm, c
                }
                e.signatureOid = e.siginfo.algorithmOid = o, e.tbsCertificate = a.getTBSCertificate(e);
                var f = n.toDer(e.tbsCertificate);
                e.md.update(f.getBytes()), e.signature = t.sign(e.md)
            }, e.verify = function (t) {
                var r = !1;
                if (!e.issued(t)) {
                    var i = t.issuer, s = e.subject,
                        o = new Error("The parent certificate did not issue the given child certificate; the child certificate's issuer does not match the parent's subject.");
                    throw o.expectedIssuer = s.attributes, o.actualIssuer = i.attributes, o
                }
                var c = t.md;
                if (null === c) {
                    c = g({signatureOid: t.signatureOid, type: "certificate"});
                    var f = t.tbsCertificate || a.getTBSCertificate(t), d = n.toDer(f);
                    c.update(d.getBytes())
                }
                return null !== c && (r = y({certificate: e, md: c, signature: t.signature})), r
            }, e.isIssuer = function (t) {
                var r = !1, i = e.issuer, n = t.subject;
                if (i.hash && n.hash) r = i.hash === n.hash; else if (i.attributes.length === n.attributes.length) {
                    var a, s;
                    r = !0;
                    for (var o = 0; r && o < i.attributes.length; ++o) a = i.attributes[o], s = n.attributes[o], a.type === s.type && a.value === s.value || (r = !1)
                }
                return r
            }, e.issued = function (t) {
                return t.isIssuer(e)
            }, e.generateSubjectKeyIdentifier = function () {
                return a.getPublicKeyFingerprint(e.publicKey, {type: "RSAPublicKey"})
            }, e.verifySubjectKeyIdentifier = function () {
                for (var t = s.subjectKeyIdentifier, r = 0; r < e.extensions.length; ++r) {
                    var n = e.extensions[r];
                    if (n.id === t) {
                        var a = e.generateSubjectKeyIdentifier().getBytes();
                        return i.util.hexToBytes(n.subjectKeyIdentifier) === a
                    }
                }
                return !1
            }, e
        }, a.certificateFromAsn1 = function (e, t) {
            var r = {}, s = [];
            if (!n.validate(e, f, r, s)) {
                var o = new Error("Cannot read X.509 certificate. ASN.1 object is not an X509v3 Certificate.");
                throw o.errors = s, o
            }
            if (n.derToOid(r.publicKeyOid) !== a.oids.rsaEncryption) throw new Error("Cannot read public key. OID is not RSA.");
            var c = a.createCertificate();
            c.version = r.certVersion ? r.certVersion.charCodeAt(0) : 0;
            var d = i.util.createBuffer(r.certSerialNumber);
            c.serialNumber = d.toHex(), c.signatureOid = i.asn1.derToOid(r.certSignatureOid), c.signatureParameters = p(c.signatureOid, r.certSignatureParams, !0), c.siginfo.algorithmOid = i.asn1.derToOid(r.certinfoSignatureOid), c.siginfo.parameters = p(c.siginfo.algorithmOid, r.certinfoSignatureParams, !1), c.signature = r.certSignature;
            var u = [];
            if (void 0 !== r.certValidity1UTCTime && u.push(n.utcTimeToDate(r.certValidity1UTCTime)), void 0 !== r.certValidity2GeneralizedTime && u.push(n.generalizedTimeToDate(r.certValidity2GeneralizedTime)), void 0 !== r.certValidity3UTCTime && u.push(n.utcTimeToDate(r.certValidity3UTCTime)), void 0 !== r.certValidity4GeneralizedTime && u.push(n.generalizedTimeToDate(r.certValidity4GeneralizedTime)), u.length > 2) throw new Error("Cannot read notBefore/notAfter validity times; more than two times were provided in the certificate.");
            if (u.length < 2) throw new Error("Cannot read notBefore/notAfter validity times; they were not provided as either UTCTime or GeneralizedTime.");
            if (c.validity.notBefore = u[0], c.validity.notAfter = u[1], c.tbsCertificate = r.tbsCertificate, t) {
                c.md = g({signatureOid: c.signatureOid, type: "certificate"});
                var l = n.toDer(c.tbsCertificate);
                c.md.update(l.getBytes())
            }
            var y = i.md.sha1.create(), m = n.toDer(r.certIssuer);
            y.update(m.getBytes()), c.issuer.getField = function (e) {
                return h(c.issuer, e)
            }, c.issuer.addField = function (e) {
                v([e]), c.issuer.attributes.push(e)
            }, c.issuer.attributes = a.RDNAttributesAsArray(r.certIssuer), r.certIssuerUniqueId && (c.issuer.uniqueId = r.certIssuerUniqueId), c.issuer.hash = y.digest().toHex();
            var b = i.md.sha1.create(), w = n.toDer(r.certSubject);
            return b.update(w.getBytes()), c.subject.getField = function (e) {
                return h(c.subject, e)
            }, c.subject.addField = function (e) {
                v([e]), c.subject.attributes.push(e)
            }, c.subject.attributes = a.RDNAttributesAsArray(r.certSubject), r.certSubjectUniqueId && (c.subject.uniqueId = r.certSubjectUniqueId), c.subject.hash = b.digest().toHex(), r.certExtensions ? c.extensions = a.certificateExtensionsFromAsn1(r.certExtensions) : c.extensions = [], c.publicKey = a.publicKeyFromAsn1(r.subjectPublicKeyInfo), c
        }, a.certificateExtensionsFromAsn1 = function (e) {
            for (var t = [], r = 0; r < e.value.length; ++r) for (var i = e.value[r], n = 0; n < i.value.length; ++n) t.push(a.certificateExtensionFromAsn1(i.value[n]));
            return t
        }, a.certificateExtensionFromAsn1 = function (e) {
            var t = {};
            if (t.id = n.derToOid(e.value[0].value), t.critical = !1, e.value[1].type === n.Type.BOOLEAN ? (t.critical = 0 !== e.value[1].value.charCodeAt(0), t.value = e.value[2].value) : t.value = e.value[1].value, t.id in s) if (t.name = s[t.id], "keyUsage" === t.name) {
                var r = 0, a = 0;
                (c = n.fromDer(t.value)).value.length > 1 && (r = c.value.charCodeAt(1), a = c.value.length > 2 ? c.value.charCodeAt(2) : 0), t.digitalSignature = 128 == (128 & r), t.nonRepudiation = 64 == (64 & r), t.keyEncipherment = 32 == (32 & r), t.dataEncipherment = 16 == (16 & r), t.keyAgreement = 8 == (8 & r), t.keyCertSign = 4 == (4 & r), t.cRLSign = 2 == (2 & r), t.encipherOnly = 1 == (1 & r), t.decipherOnly = 128 == (128 & a)
            } else if ("basicConstraints" === t.name) {
                (c = n.fromDer(t.value)).value.length > 0 && c.value[0].type === n.Type.BOOLEAN ? t.cA = 0 !== c.value[0].value.charCodeAt(0) : t.cA = !1;
                var o = null;
                c.value.length > 0 && c.value[0].type === n.Type.INTEGER ? o = c.value[0].value : c.value.length > 1 && (o = c.value[1].value), null !== o && (t.pathLenConstraint = n.derToInteger(o))
            } else if ("extKeyUsage" === t.name) for (var c = n.fromDer(t.value), f = 0; f < c.value.length; ++f) {
                var d = n.derToOid(c.value[f].value);
                d in s ? t[s[d]] = !0 : t[d] = !0
            } else if ("nsCertType" === t.name) {
                r = 0;
                (c = n.fromDer(t.value)).value.length > 1 && (r = c.value.charCodeAt(1)), t.client = 128 == (128 & r), t.server = 64 == (64 & r), t.email = 32 == (32 & r), t.objsign = 16 == (16 & r), t.reserved = 8 == (8 & r), t.sslCA = 4 == (4 & r), t.emailCA = 2 == (2 & r), t.objCA = 1 == (1 & r)
            } else if ("subjectAltName" === t.name || "issuerAltName" === t.name) {
                var u;
                t.altNames = [];
                c = n.fromDer(t.value);
                for (var l = 0; l < c.value.length; ++l) {
                    var h = {type: (u = c.value[l]).type, value: u.value};
                    switch (t.altNames.push(h), u.type) {
                        case 1:
                        case 2:
                        case 6:
                            break;
                        case 7:
                            h.ip = i.util.bytesToIP(u.value);
                            break;
                        case 8:
                            h.oid = n.derToOid(u.value)
                    }
                }
            } else if ("subjectKeyIdentifier" === t.name) {
                c = n.fromDer(t.value);
                t.subjectKeyIdentifier = i.util.bytesToHex(c.value)
            }
            return t
        }, a.certificationRequestFromAsn1 = function (e, t) {
            var r = {}, s = [];
            if (!n.validate(e, l, r, s)) {
                var o = new Error("Cannot read PKCS#10 certificate request. ASN.1 object is not a PKCS#10 CertificationRequest.");
                throw o.errors = s, o
            }
            if (n.derToOid(r.publicKeyOid) !== a.oids.rsaEncryption) throw new Error("Cannot read public key. OID is not RSA.");
            var c = a.createCertificationRequest();
            if (c.version = r.csrVersion ? r.csrVersion.charCodeAt(0) : 0, c.signatureOid = i.asn1.derToOid(r.csrSignatureOid), c.signatureParameters = p(c.signatureOid, r.csrSignatureParams, !0), c.siginfo.algorithmOid = i.asn1.derToOid(r.csrSignatureOid), c.siginfo.parameters = p(c.siginfo.algorithmOid, r.csrSignatureParams, !1), c.signature = r.csrSignature, c.certificationRequestInfo = r.certificationRequestInfo, t) {
                c.md = g({signatureOid: c.signatureOid, type: "certification request"});
                var f = n.toDer(c.certificationRequestInfo);
                c.md.update(f.getBytes())
            }
            var d = i.md.sha1.create();
            return c.subject.getField = function (e) {
                return h(c.subject, e)
            }, c.subject.addField = function (e) {
                v([e]), c.subject.attributes.push(e)
            }, c.subject.attributes = a.RDNAttributesAsArray(r.certificationRequestInfoSubject, d), c.subject.hash = d.digest().toHex(), c.publicKey = a.publicKeyFromAsn1(r.subjectPublicKeyInfo), c.getAttribute = function (e) {
                return h(c, e)
            }, c.addAttribute = function (e) {
                v([e]), c.attributes.push(e)
            }, c.attributes = a.CRIAttributesAsArray(r.certificationRequestInfoAttributes || []), c
        }, a.createCertificationRequest = function () {
            var e = {version: 0, signatureOid: null, signature: null, siginfo: {}};
            return e.siginfo.algorithmOid = null, e.subject = {}, e.subject.getField = function (t) {
                return h(e.subject, t)
            }, e.subject.addField = function (t) {
                v([t]), e.subject.attributes.push(t)
            }, e.subject.attributes = [], e.subject.hash = null, e.publicKey = null, e.attributes = [], e.getAttribute = function (t) {
                return h(e, t)
            }, e.addAttribute = function (t) {
                v([t]), e.attributes.push(t)
            }, e.md = null, e.setSubject = function (t) {
                v(t), e.subject.attributes = t, e.subject.hash = null
            }, e.setAttributes = function (t) {
                v(t), e.attributes = t
            }, e.sign = function (t, r) {
                e.md = r || i.md.sha1.create();
                var o = s[e.md.algorithm + "WithRSAEncryption"];
                if (!o) {
                    var c = new Error("Could not compute certification request digest. Unknown message digest algorithm OID.");
                    throw c.algorithm = e.md.algorithm, c
                }
                e.signatureOid = e.siginfo.algorithmOid = o, e.certificationRequestInfo = a.getCertificationRequestInfo(e);
                var f = n.toDer(e.certificationRequestInfo);
                e.md.update(f.getBytes()), e.signature = t.sign(e.md)
            }, e.verify = function () {
                var t = !1, r = e.md;
                if (null === r) {
                    r = g({signatureOid: e.signatureOid, type: "certification request"});
                    var i = e.certificationRequestInfo || a.getCertificationRequestInfo(e), s = n.toDer(i);
                    r.update(s.getBytes())
                }
                return null !== r && (t = y({certificate: e, md: r, signature: e.signature})), t
            }, e
        };
        var C = new Date("1950-01-01T00:00:00Z"), S = new Date("2050-01-01T00:00:00Z");

        function I(e) {
            return e >= C && e < S ? n.create(n.Class.UNIVERSAL, n.Type.UTCTIME, !1, n.dateToUtcTime(e)) : n.create(n.Class.UNIVERSAL, n.Type.GENERALIZEDTIME, !1, n.dateToGeneralizedTime(e))
        }

        a.getTBSCertificate = function (e) {
            var t = I(e.validity.notBefore), r = I(e.validity.notAfter),
                s = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.CONTEXT_SPECIFIC, 0, !0, [n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(e.version).getBytes())]), n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, i.util.hexToBytes(e.serialNumber)), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.siginfo.algorithmOid).getBytes()), w(e.siginfo.algorithmOid, e.siginfo.parameters)]), m(e.issuer), n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [t, r]), m(e.subject), a.publicKeyToAsn1(e.publicKey)]);
            return e.issuer.uniqueId && s.value.push(n.create(n.Class.CONTEXT_SPECIFIC, 1, !0, [n.create(n.Class.UNIVERSAL, n.Type.BITSTRING, !1, String.fromCharCode(0) + e.issuer.uniqueId)])), e.subject.uniqueId && s.value.push(n.create(n.Class.CONTEXT_SPECIFIC, 2, !0, [n.create(n.Class.UNIVERSAL, n.Type.BITSTRING, !1, String.fromCharCode(0) + e.subject.uniqueId)])), e.extensions.length > 0 && s.value.push(a.certificateExtensionsToAsn1(e.extensions)), s
        }, a.getCertificationRequestInfo = function (e) {
            return n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.INTEGER, !1, n.integerToDer(e.version).getBytes()), m(e.subject), a.publicKeyToAsn1(e.publicKey), E(e)])
        }, a.distinguishedNameToAsn1 = function (e) {
            return m(e)
        }, a.certificateToAsn1 = function (e) {
            var t = e.tbsCertificate || a.getTBSCertificate(e);
            return n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [t, n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.signatureOid).getBytes()), w(e.signatureOid, e.signatureParameters)]), n.create(n.Class.UNIVERSAL, n.Type.BITSTRING, !1, String.fromCharCode(0) + e.signature)])
        }, a.certificateExtensionsToAsn1 = function (e) {
            var t = n.create(n.Class.CONTEXT_SPECIFIC, 3, !0, []),
                r = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []);
            t.value.push(r);
            for (var i = 0; i < e.length; ++i) r.value.push(a.certificateExtensionToAsn1(e[i]));
            return t
        }, a.certificateExtensionToAsn1 = function (e) {
            var t = n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, []);
            t.value.push(n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.id).getBytes())), e.critical && t.value.push(n.create(n.Class.UNIVERSAL, n.Type.BOOLEAN, !1, String.fromCharCode(255)));
            var r = e.value;
            return "string" != typeof e.value && (r = n.toDer(r).getBytes()), t.value.push(n.create(n.Class.UNIVERSAL, n.Type.OCTETSTRING, !1, r)), t
        }, a.certificationRequestToAsn1 = function (e) {
            var t = e.certificationRequestInfo || a.getCertificationRequestInfo(e);
            return n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [t, n.create(n.Class.UNIVERSAL, n.Type.SEQUENCE, !0, [n.create(n.Class.UNIVERSAL, n.Type.OID, !1, n.oidToDer(e.signatureOid).getBytes()), w(e.signatureOid, e.signatureParameters)]), n.create(n.Class.UNIVERSAL, n.Type.BITSTRING, !1, String.fromCharCode(0) + e.signature)])
        }, a.createCaStore = function (e) {
            var t = {certs: {}};

            function r(e) {
                return s(e), t.certs[e.hash] || null
            }

            function s(e) {
                if (!e.hash) {
                    var t = i.md.sha1.create();
                    e.attributes = a.RDNAttributesAsArray(m(e), t), e.hash = t.digest().toHex()
                }
            }

            if (t.getIssuer = function (e) {
                return r(e.issuer)
            }, t.addCertificate = function (e) {
                if ("string" == typeof e && (e = i.pki.certificateFromPem(e)), s(e.subject), !t.hasCertificate(e)) if (e.subject.hash in t.certs) {
                    var r = t.certs[e.subject.hash];
                    i.util.isArray(r) || (r = [r]), r.push(e), t.certs[e.subject.hash] = r
                } else t.certs[e.subject.hash] = e
            }, t.hasCertificate = function (e) {
                "string" == typeof e && (e = i.pki.certificateFromPem(e));
                var t = r(e.subject);
                if (!t) return !1;
                i.util.isArray(t) || (t = [t]);
                for (var s = n.toDer(a.certificateToAsn1(e)).getBytes(), o = 0; o < t.length; ++o) {
                    if (s === n.toDer(a.certificateToAsn1(t[o])).getBytes()) return !0
                }
                return !1
            }, t.listAllCertificates = function () {
                var e = [];
                for (var r in t.certs) if (t.certs.hasOwnProperty(r)) {
                    var n = t.certs[r];
                    if (i.util.isArray(n)) for (var a = 0; a < n.length; ++a) e.push(n[a]); else e.push(n)
                }
                return e
            }, t.removeCertificate = function (e) {
                var o;
                if ("string" == typeof e && (e = i.pki.certificateFromPem(e)), s(e.subject), !t.hasCertificate(e)) return null;
                var c = r(e.subject);
                if (!i.util.isArray(c)) return o = t.certs[e.subject.hash], delete t.certs[e.subject.hash], o;
                for (var f = n.toDer(a.certificateToAsn1(e)).getBytes(), d = 0; d < c.length; ++d) {
                    f === n.toDer(a.certificateToAsn1(c[d])).getBytes() && (o = c[d], c.splice(d, 1))
                }
                return 0 === c.length && delete t.certs[e.subject.hash], o
            }, e) for (var o = 0; o < e.length; ++o) {
                var c = e[o];
                t.addCertificate(c)
            }
            return t
        }, a.certificateError = {
            bad_certificate: "forge.pki.BadCertificate",
            unsupported_certificate: "forge.pki.UnsupportedCertificate",
            certificate_revoked: "forge.pki.CertificateRevoked",
            certificate_expired: "forge.pki.CertificateExpired",
            certificate_unknown: "forge.pki.CertificateUnknown",
            unknown_ca: "forge.pki.UnknownCertificateAuthority"
        }, a.verifyCertificateChain = function (e, t, r) {
            "function" == typeof r && (r = {verify: r}), r = r || {};
            var n = (t = t.slice(0)).slice(0), s = r.validityCheckDate;
            void 0 === s && (s = new Date);
            var o = !0, c = null, f = 0;
            do {
                var d = t.shift(), u = null, l = !1;
                if (s && (s < d.validity.notBefore || s > d.validity.notAfter) && (c = {
                    message: "Certificate is not valid yet or has expired.",
                    error: a.certificateError.certificate_expired,
                    notBefore: d.validity.notBefore,
                    notAfter: d.validity.notAfter,
                    now: s
                }), null === c) {
                    if (null === (u = t[0] || e.getIssuer(d)) && d.isIssuer(d) && (l = !0, u = d), u) {
                        var h = u;
                        i.util.isArray(h) || (h = [h]);
                        for (var p = !1; !p && h.length > 0;) {
                            u = h.shift();
                            try {
                                p = u.verify(d)
                            } catch (C) {
                            }
                        }
                        p || (c = {
                            message: "Certificate signature is invalid.",
                            error: a.certificateError.bad_certificate
                        })
                    }
                    null !== c || u && !l || e.hasCertificate(d) || (c = {
                        message: "Certificate is not trusted.",
                        error: a.certificateError.unknown_ca
                    })
                }
                if (null === c && u && !d.isIssuer(u) && (c = {
                    message: "Certificate issuer is invalid.",
                    error: a.certificateError.bad_certificate
                }), null === c) for (var g = {
                    keyUsage: !0,
                    basicConstraints: !0
                }, y = 0; null === c && y < d.extensions.length; ++y) {
                    var m = d.extensions[y];
                    m.critical && !(m.name in g) && (c = {
                        message: "Certificate has an unsupported critical extension.",
                        error: a.certificateError.unsupported_certificate
                    })
                }
                if (null === c && (!o || 0 === t.length && (!u || l))) {
                    var v = d.getExtension("basicConstraints"), b = d.getExtension("keyUsage");
                    if (null !== b && (b.keyCertSign && null !== v || (c = {
                        message: "Certificate keyUsage or basicConstraints conflict or indicate that the certificate is not a CA. If the certificate is the only one in the chain or isn't the first then the certificate must be a valid CA.",
                        error: a.certificateError.bad_certificate
                    })), null !== c || null === v || v.cA || (c = {
                        message: "Certificate basicConstraints indicates the certificate is not a CA.",
                        error: a.certificateError.bad_certificate
                    }), null === c && null !== b && "pathLenConstraint" in v) f - 1 > v.pathLenConstraint && (c = {
                        message: "Certificate basicConstraints pathLenConstraint violated.",
                        error: a.certificateError.bad_certificate
                    })
                }
                var w = null === c || c.error, E = r.verify ? r.verify(w, f, n) : w;
                if (!0 !== E) throw!0 === w && (c = {
                    message: "The application rejected the certificate.",
                    error: a.certificateError.bad_certificate
                }), (E || 0 === E) && ("object" != typeof E || i.util.isArray(E) ? "string" == typeof E && (c.error = E) : (E.message && (c.message = E.message), E.error && (c.error = E.error))), c;
                c = null, o = !1, ++f
            } while (t.length > 0);
            return !0
        }
    }, 68608: (e, t, r) => {
        "use strict";
        r.d(t, {yg: () => Mr, G4: () => Rr, q3: () => Hr, kd: () => jr, ut: () => o});
        const i = {
            "urn:miot-spec-v2:property:air-cooler:000000EB": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:alarm:00000012": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:anion:00000025": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:anti-fake:00000130": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:arrhythmia:000000B4": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:auto-cleanup:00000124": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:auto-deodorization:00000125": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:auto-keep-warm:0000002B": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:automatic-feeding:000000F0": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:blow:000000CD": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:card-insertion-state:00000106": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:contact-state:0000007C": {true: "接触", false: "分离"},
            "urn:miot-spec-v2:property:current-physical-control-lock:00000099": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:delay:0000014F": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:deodorization:000000C6": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:dns-auto-mode:000000DC": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:driving-status:000000B9": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:dryer:00000027": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:eco:00000024": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:glimmer-full-color:00000089": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:guard-mode:000000B6": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:heater:00000026": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:heating:000000C7": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:horizontal-swing:00000017": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:hot-water-recirculation:0000011C": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:image-distortion-correction:0000010F": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:local-storage:0000011E": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:motion-detection:00000056": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:motion-state:0000007D": {true: "有人", false: "无人"},
            "urn:miot-spec-v2:property:motion-tracking:0000008A": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:motor-reverse:00000072": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:off-delay:00000053": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:on:00000006": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:physical-controls-locked:0000001D": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:plasma:00000132": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:preheat:00000103": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:seating-state:000000B8": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:silent-execution:000000FB": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:sleep-aid-mode:0000010B": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:sleep-mode:00000028": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:snore-state:0000012A": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:soft-wind:000000CF": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:speed-control:000000E8": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:submersion-state:0000007E": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:time-watermark:00000087": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:un-straight-blowing:00000100": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:uv:00000029": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:valve-switch:000000FE": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:ventilation:000000CE": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:vertical-swing:00000018": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:wake-up-mode:00000107": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:water-pump:000000F2": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:watering:000000CC": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:wdr-mode:00000088": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:wet:0000002A": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:wifi-band-combine:000000E0": {true: "开启", false: "关闭"},
            "urn:miot-spec-v2:property:wifi-ssid-hidden:000000E3": {true: "是", false: "否"},
            "urn:miot-spec-v2:property:wind-reverse:00000117": {true: "是", false: "否"}
        };

        class n {
            #e;
            #t = new Map;
            #r = new Map;
            #i = [];

            constructor(e) {
                this.#e = e.poolSize
            }

            async req(e, t, ...r) {
                const i = this.#t.get(e);
                if (void 0 !== i) return await i;
                const n = this.#r.get(e);
                if (void 0 !== n) return await n.promise;
                let a = {func: t, params: r};
                return a.promise = new Promise(((e, t) => {
                    a.resolve = e, a.reject = t
                })), this.#r.set(e, a), this.#i.push(e), this.#n(), await a.promise
            }

            async #n() {
                if (this.#t.size >= this.#e) return;
                const e = this.#i.shift();
                if (void 0 === e) return;
                const t = this.#r.get(e);
                if (void 0 !== t) {
                    this.#r.delete(e), this.#t.set(e, t.promise);
                    try {
                        const e = await t.func(...t.params);
                        t.resolve(e)
                    } catch (r) {
                        t.reject(r)
                    }
                    this.#t.delete(e), this.#n()
                }
            }
        }

        const a = {
            seconds: "秒",
            minutes: "分",
            pascal: "Pa",
            percentage: "%",
            days: "天",
            ppm: "ppm",
            rgb: "RGB(十进制)",
            kelvin: "K",
            hours: "小时",
            L: "L",
            watt: "W",
            metre: "m",
            "mg/m3": "mg/m³",
            lux: "lux",
            arcdegrees: "°",
            celsius: "℃"
        };

        class s {
            static VERSION = 2;
            #a;
            #s = new n({poolSize: 10});
            #o = new Map;
            #c = !1;
            #f;

            constructor(e) {
                try {
                    void 0 !== globalThis.window?.localStorage && (this.#c = !0)
                } catch (t) {
                }
                this.#a = this.#d()
            }

            async #u(e) {
                const t = `https://miot-spec.org/miot-spec-v2/instance?type=${e}`;
                let r = await fetch(t);
                if (!r.ok) throw new Error(`HTTP request error, status: ${r.status}`);
                let i = await (await r.blob()).text();
                return JSON.parse(i)
            }

            async #l(e) {
                const t = `https://miot-spec.org/instance/v2/multiLanguage?urn=${e}`;
                let r = await fetch(t);
                if (!r.ok) throw new Error(`HTTP request error, status: ${r.status}`);
                let i = await (await r.blob()).text();
                return JSON.parse(i)
            }

            #h(e) {
                return {string: "string", bool: "boolean", float: "float"}[e] ?? "int"
            }

            #p(e, t) {
                return this.#f[e][t]
            }

            #g(e, t) {
                this.#c ? localStorage.setItem(e, JSON.stringify(t)) : this.#o.set(e, t)
            }

            #y(e) {
                if (!this.#c) return this.#o.get(e);
                {
                    let t = localStorage.getItem(e);
                    if (null !== t) {
                        let e = JSON.parse(t);
                        if (e.version === s.VERSION) return e
                    }
                }
            }

            #m() {
                if (this.#o.clear(), this.#c) {
                    let e = Object.keys(localStorage);
                    for (const t in e) t.startsWith("urn:") && localStorage.removeItem(t)
                }
            }

            #v(e = 6e4) {
                this.#c && setTimeout((() => {
                    let e = Object.keys(localStorage);
                    for (const r of e) if (r.startsWith("urn:")) try {
                        this.parse(r, !0)
                    } catch (t) {
                    }
                }), e)
            }

            async #d() {
                if (void 0 === this.#f) {
                    let e = await Promise.all([(async () => {
                        let e = await (await fetch("https://miot-spec.org/miot-spec-v2/normalization/list/property_value")).json(),
                            t = {};
                        return e.result.forEach((e => {
                            "string" == typeof e.description && "" !== e.description && (t[`${e.urn}|${e.proName}|${e.normalization}`] = e.description)
                        })), t
                    })(), (async () => {
                        let e = await (await fetch("https://miot-spec.org/miot-spec-v2/template/list/service")).json(),
                            t = {};
                        return e.result.forEach((e => {
                            "string" == typeof e.description.zh_cn && "" !== e.description.zh_cn && (t[e.type] = e.description.zh_cn)
                        })), t
                    })(), (async () => {
                        let e = await (await fetch("https://miot-spec.org/miot-spec-v2/template/list/property")).json(),
                            t = {};
                        return e.result.forEach((e => {
                            "string" == typeof e.description.zh_cn && "" !== e.description.zh_cn && (t[e.type] = e.description.zh_cn)
                        })), t
                    })(), (async () => {
                        let e = await (await fetch("https://miot-spec.org/miot-spec-v2/template/list/event")).json(),
                            t = {};
                        return e.result.forEach((e => {
                            "string" == typeof e.description.zh_cn && "" !== e.description.zh_cn && (t[e.type] = e.description.zh_cn)
                        })), t
                    })(), (async () => {
                        let e = await (await fetch("https://miot-spec.org/miot-spec-v2/template/list/action")).json(),
                            t = {};
                        return e.result.forEach((e => {
                            "string" == typeof e.description.zh_cn && "" !== e.description.zh_cn && (t[e.type] = e.description.zh_cn)
                        })), t
                    })(), (async () => {
                        let e = await (await fetch("https://miot-spec.org/miot-spec-v2/template/list/device")).json(),
                            t = {};
                        return e.result.forEach((e => {
                            "string" == typeof e.description?.zh_cn && "" !== e.description.zh_cn && (t[e.type.split(":")[3]] = e.description.zh_cn)
                        })), t
                    })()]);
                    this.#f = {
                        values: e[0],
                        services: e[1],
                        properties: e[2],
                        events: e[3],
                        actions: e[4],
                        devices: e[5]
                    }, this.#v()
                }
            }

            async init() {
                await this.#a
            }

            async #b(e) {
                let t = await this.#u(e), r = new Map;
                try {
                    let t = await this.#l(e);
                    for (const e in t.data.zh_cn) {
                        let i = t.data.zh_cn[e];
                        if ("" === i || null == i) continue;
                        let n = e.split(":");
                        if (2 === n.length) {
                            let i = `s:${Number(n[1])}`;
                            r.set(i, t.data.zh_cn[e])
                        } else if (4 === n.length) {
                            let i = `${"property" === n[2] ? "p" : "action" === n[2] ? "a" : "e"}:${Number(n[1])}:${Number(n[3])}`;
                            r.set(i, t.data.zh_cn[e])
                        } else if (6 === n.length) {
                            let i = `v:${Number(n[1])}:${Number(n[3])}:${Number(n[5])}`;
                            r.set(i, t.data.zh_cn[e])
                        }
                    }
                } catch (d) {
                }
                let n = {
                    propertyNotify: new Map,
                    event: new Map,
                    propertySet: new Map,
                    propertyGet: new Map,
                    action: new Map
                };
                for (const s of t.services) {
                    let e = !1, t = s.type.split(":");
                    if ("device-information" === t[3]) continue;
                    "miot-spec-v2" !== t[1] && (e = !0);
                    let o = `s:${s.iid}`, c = r.get(o);
                    if (c = c ?? this.#p("services", s.type.split(":").slice(0, 5).join(":")), c = c ?? s.description, void 0 !== s.properties) for (const f of s.properties) {
                        let t = !1;
                        "miot-spec-v2" !== f.type.split(":")[1] && (t = !0);
                        let o = `p:${s.iid}:${f.iid}`, d = r.get(o);
                        d = d ?? this.#p("properties", f.type.split(":").slice(0, 5).join(":")), d = d ?? f.description;
                        let u, l = this.#h(f.format);
                        if ("value-range" in f) u = {
                            siid: s.iid,
                            piid: f.iid,
                            sUrn: s.type,
                            urn: f.type,
                            valueRange: {min: f["value-range"][0], max: f["value-range"][1], step: f["value-range"][2]},
                            sDescription: c,
                            description: d,
                            dtype: l,
                            unit: a[f.unit] ?? f.unit
                        }; else if ("value-list" in f) {
                            let e = f["value-list"];
                            for (let t = 0; t < e.length; t++) {
                                const i = e[t];
                                let n = r.get(`v:${s.iid}:${f.iid}:${t}`),
                                    a = `${s.type.split(":").slice(0, 5).join(":")}|${f.type.split(":")[3]}|${i.description}`;
                                n = n ?? this.#p("values", a), i.description = n ?? i.description
                            }
                            "float" === l && (l = "int"), u = {
                                siid: s.iid,
                                piid: f.iid,
                                sUrn: s.type,
                                urn: f.type,
                                valueList: e,
                                sDescription: c,
                                description: d,
                                dtype: l
                            }
                        } else if ("bool" === f.format) {
                            let e = f.type.split(":").slice(0, 5).join(":"), t = i[e], r = t?.true ?? "true",
                                n = t?.false ?? "false";
                            u = {
                                siid: s.iid,
                                piid: f.iid,
                                sUrn: s.type,
                                urn: f.type,
                                valueList: [{value: !0, description: r}, {value: !1, description: n}],
                                dtype: "boolean",
                                sDescription: c,
                                description: d
                            }
                        } else u = {
                            siid: s.iid,
                            piid: f.iid,
                            sUrn: s.type,
                            urn: f.type,
                            sDescription: c,
                            description: d,
                            dtype: l
                        };
                        u.proprietary = e || t, f.access.includes("notify") && n.propertyNotify.set(o, u), f.access.includes("write") && n.propertySet.set(o, u), f.access.includes("read") && n.propertyGet.set(o, u)
                    }
                    if (void 0 !== s.events) for (const f of s.events) {
                        let t = !1;
                        "miot-spec-v2" !== f.type.split(":")[1] && (t = !0);
                        let o = `e:${s.iid}:${f.iid}`, d = r.get(o);
                        d = d ?? this.#p("events", f.type.split(":").slice(0, 5).join(":")), d = d ?? f.description;
                        let u = f.arguments?.map((e => {
                            let t = s.properties?.find((t => t.iid === e));
                            if (void 0 === t) throw new Error("No properties");
                            let n = `p:${s.iid}:${e}`, o = r.get(n);
                            o = o ?? this.#p("properties", t.type.split(":").slice(0, 5).join(":")), o = o ?? t.description;
                            let f = this.#h(t.format);
                            if ("value-range" in t) return {
                                piid: t.iid,
                                urn: t.type,
                                sDescription: c,
                                description: o,
                                dtype: f,
                                unit: a[t.unit] ?? t.unit,
                                valueRange: {
                                    min: t["value-range"][0],
                                    max: t["value-range"][1],
                                    step: t["value-range"][2]
                                }
                            };
                            if ("value-list" in t) {
                                let e = t["value-list"];
                                for (let i = 0; i < e.length; i++) {
                                    const n = e[i];
                                    let a = r.get(`v:${s.iid}:${t.iid}:${i}`),
                                        o = `${s.type.split(":").slice(0, 5).join(":")}|${t.type.split(":")[3]}|${n.description}`;
                                    a = a ?? this.#p("values", o), n.description = a ?? n.description
                                }
                                return "float" === f && (f = "int"), {
                                    piid: t.iid,
                                    urn: t.type,
                                    sDescription: c,
                                    description: o,
                                    dtype: f,
                                    valueList: e
                                }
                            }
                            if ("bool" === t.format) {
                                let e = t.type.split(":").slice(0, 5).join(":"), r = i[e], n = r?.true ?? "true",
                                    a = r?.false ?? "false";
                                return {
                                    piid: t.iid,
                                    urn: t.type,
                                    valueList: [{value: !0, description: n}, {value: !1, description: a}],
                                    dtype: "boolean",
                                    sDescription: c,
                                    description: o
                                }
                            }
                            return {piid: t.iid, urn: t.type, sDescription: c, description: o, dtype: f}
                        }));
                        n.event.set(o, {
                            siid: s.iid,
                            eiid: f.iid,
                            sUrn: s.type,
                            urn: f.type,
                            sDescription: c,
                            description: d,
                            proprietary: e || t,
                            arguments: u
                        })
                    }
                    if (void 0 !== s.actions) for (const f of s.actions) {
                        let t = !1;
                        "miot-spec-v2" !== f.type.split(":")[1] && (t = !0);
                        let o = `a:${s.iid}:${f.iid}`, d = r.get(o) ?? f.description;
                        d = d ?? this.#p("actions", f.type.split(":").slice(0, 5).join(":")), d = d ?? f.description;
                        let u = f.in?.map((e => {
                            let t = s.properties?.find((t => t.iid === e));
                            if (void 0 === t) throw new Error("No properties");
                            let n = `p:${s.iid}:${e}`, o = r.get(n) ?? t.description, f = this.#h(t.format);
                            if ("value-range" in t) return {
                                piid: t.iid,
                                urn: t.type,
                                sDescription: c,
                                description: o,
                                dtype: f,
                                unit: a[t.unit] ?? t.unit,
                                valueRange: {
                                    min: t["value-range"][0],
                                    max: t["value-range"][1],
                                    step: t["value-range"][2]
                                }
                            };
                            if ("value-list" in t) {
                                let e = t["value-list"];
                                for (let i = 0; i < e.length; i++) {
                                    const n = e[i];
                                    let a = r.get(`v:${s.iid}:${t.iid}:${i}`),
                                        o = `${s.type.split(":").slice(0, 5).join(":")}|${t.type.split(":")[3]}|${n.description}`;
                                    a = a ?? this.#p("values", o), n.description = a ?? n.description
                                }
                                return "float" === f && (f = "int"), {
                                    piid: t.iid,
                                    urn: t.type,
                                    sDescription: c,
                                    description: o,
                                    dtype: f,
                                    valueList: e
                                }
                            }
                            if ("bool" === t.format) {
                                let e = t.type.split(":").slice(0, 5).join(":"), r = i[e], n = r?.true ?? "true",
                                    a = r?.false ?? "false";
                                return {
                                    piid: t.iid,
                                    urn: t.type,
                                    valueList: [{value: !0, description: n}, {value: !1, description: a}],
                                    dtype: "boolean",
                                    sDescription: c,
                                    description: o
                                }
                            }
                            return {piid: t.iid, urn: t.type, sDescription: c, description: o, dtype: f}
                        }));
                        n.action.set(o, {
                            siid: s.iid,
                            aiid: f.iid,
                            sUrn: s.type,
                            urn: f.type,
                            sDescription: c,
                            description: d,
                            proprietary: e || t,
                            in: u
                        })
                    }
                }
                let o = e.split(":")[3], c = this.#f.devices[o] ?? o, f = {
                    version: s.VERSION,
                    deviceType: o,
                    deviceTypeDescription: c,
                    propertyNotify: Array.from(n.propertyNotify.values()),
                    event: Array.from(n.event.values()),
                    propertySet: Array.from(n.propertySet.values()),
                    propertyGet: Array.from(n.propertyGet.values()),
                    action: Array.from(n.action.values())
                };
                return this.#g(e, f), f
            }

            async parse(e, t = !1) {
                if (await this.init(), !t) {
                    let t = this.#y(e);
                    if (void 0 !== t) return t
                }
                return this.#s.req(e, this.#b.bind(this), e)
            }

            getDeviceType(e) {
                let t = e.split(":")[3];
                return {deviceType: t, deviceTypeDescription: this.#f.devices[t] ?? t}
            }
        }

        const o = new s;
        var c = r(22079), f = r(13550), d = r(86266);

        class u {
            #w;
            #E;
            #C;
            #S;
            #I;
            #A;
            #_;
            #T;
            #B;
            #N = !1;
            #k = !1;
            #R = !1;
            #L = !1;
            #M = !1;

            constructor(e) {
                if ("server" !== e.role && "client" !== e.role) throw new TypeError('role must be "client" or "server"');
                if ("string" != typeof e.secret) throw new TypeError("secret must be a string");
                this.#w = e.role, this.#E = "client" === this.#w ? "server" : "client";
                let t = new TextEncoder;
                this.#I = new f(t.encode(e.secret)), this.#C = "secp256k1", this.#S = 22
            }

            writeRoundOne() {
                if (this.#N) throw new Error("Reusing failed ECJPAKE context is insecure.");
                if (this.#k || this.#L || this.#M) throw new Error("Wrong step");
                this.#k = !0;
                const e = new d.ec(this.#C);
                this.#A = e.genKeyPair();
                const t = this.#U(this.#C, e.g, this.#A.getPublic(), this.#A.getPrivate(), this.#w);
                this.#_ = e.genKeyPair();
                const r = this.#U(this.#C, e.g, this.#_.getPublic(), this.#_.getPrivate(), this.#w),
                    i = this.#P(this.#A.getPublic()), n = this.#P(this.#_.getPublic()), a = this.#D(t), s = this.#D(r),
                    o = new Uint8Array(i.length + a.length + n.length + s.length);
                let c = 0;
                return o.set(i, c), c += i.length, o.set(a, c), c += a.length, o.set(n, c), c += n.length, o.set(s, c), c += s.length, o
            }

            readRoundOne(e) {
                if (this.#N) throw new Error("Reusing failed ECJPAKE context is insecure.");
                if (this.#R || this.#L || this.#M) throw new Error("Wrong step");
                this.#R = !0;
                const t = new d.ec(this.#C);
                let r = 0;
                const i = e[r];
                r++;
                const n = e.slice(r, r + i);
                r += i, this.#T = t.keyFromPublic(n).getPublic();
                const a = e[r], s = 1 + a + 1 + e[r + 1 + a], o = e.slice(r, r + s);
                r += s;
                const c = this.#x(o);
                if (!this.#O(this.#C, t.g, this.#T, c.V, c.r, this.#E)) throw this.#N = !0, new Error("ECJPAKE round one failed");
                const f = e[r];
                r++;
                const u = e.slice(r, r + f);
                r += f, this.#B = t.keyFromPublic(u).getPublic();
                const l = e[r], h = 1 + l + 1 + e[r + 1 + l], p = e.slice(r, r + h);
                r += h;
                const g = this.#x(p);
                if (!this.#O(this.#C, t.g, this.#B, g.V, g.r, this.#E)) throw this.#N = !0, new Error("ECJPAKE round one failed")
            }

            writeRoundTwo() {
                if (this.#N) throw new Error("Reusing failed ECJPAKE context is insecure.");
                if (this.#L || !this.#k || !this.#R) throw new Error("Wrong step");
                this.#L = !0;
                const e = new d.ec(this.#C);
                let t = this.#A.getPublic().add(this.#T).add(this.#B);
                e.g = t;
                const r = c.random.getBytesSync(16);
                let i = new Uint8Array(16);
                for (let c = 0; c < r.length; c++) i[c] = r.charCodeAt(c);
                let n = new f(i);
                if (null === e.n || void 0 === e.n) throw new Error("EC error");
                n = n.mul(e.n).add(this.#I);
                let a, s = this.#_.getPrivate().mul(n).umod(e.n), o = t.mul(s), u = this.#U(this.#C, t, o, s, this.#w),
                    l = this.#V(), h = this.#P(o), p = this.#D(u), g = 0;
                return "server" === this.#w ? (a = new Uint8Array(l.length + h.length + p.length), a.set(l, g), g += l.length) : a = new Uint8Array(h.length + p.length), a.set(h, g), g += h.length, a.set(p, g), g += p.length, a
            }

            readRoundTwo(e) {
                if (this.#N) throw new Error("Reusing failed ECJPAKE context is insecure.");
                if (this.#M || !this.#k || !this.#R) throw new Error("Wrong step");
                this.#M = !0;
                const t = new d.ec(this.#C);
                let r = this.#A.getPublic().add(this.#_.getPublic()).add(this.#T), i = 0;
                "client" === this.#w && (i += 3);
                const n = e[i];
                i++;
                const a = e.slice(i, i + n);
                i += n;
                let s = t.keyFromPublic(a).getPublic();
                const o = e[i], u = 1 + o + 1 + e[i + 1 + o], l = e.slice(i, i + u);
                i += u;
                const h = this.#x(l);
                if (!this.#O(this.#C, r, s, h.V, h.r, this.#E)) throw this.#N = !0, new Error("ECJPAKE round two failed");
                const p = c.random.getBytesSync(16);
                let g = new Uint8Array(16);
                for (let c = 0; c < p.length; c++) g[c] = p.charCodeAt(c);
                let y = new f(g);
                if (null === t.n || void 0 === t.n) throw new Error("EC error");
                y = y.mul(t.n).add(this.#I);
                let m = this.#_.getPrivate().mul(y).umod(t.n),
                    v = s.add(this.#B.mul(m).neg()).mul(this.#_.getPrivate());
                const b = c.md.sha256.create();
                b.update(String.fromCharCode(...v.getX().toArray("be", 32)), "raw");
                const w = b.digest().bytes(32);
                let E = new Uint8Array(32);
                for (let c = 0; c < w.length; c++) E[c] = w.charCodeAt(c);
                return E
            }

            #K(e) {
                let t = new Uint8Array(69);
                t.fill(0);
                let r = new DataView(t.buffer);
                r.setUint32(0, 65, !1), r.setUint8(4, 4);
                const i = new Uint8Array(e.getX().toArray("be", 32)), n = new Uint8Array(e.getY().toArray("be", 32));
                return t.set(i, 5), t.set(n, 37), t
            }

            #P(e) {
                let t = new Uint8Array(66);
                t.fill(0);
                let r = new DataView(t.buffer);
                r.setUint8(0, 65), r.setUint8(1, 4);
                const i = new Uint8Array(e.getX().toArray("be", 32)), n = new Uint8Array(e.getY().toArray("be", 32));
                return t.set(i, 2), t.set(n, 34), t
            }

            #V() {
                let e = new Uint8Array(3);
                return e[0] = 3, new DataView(e.buffer).setUint16(1, this.#S, !1), e
            }

            #z(e, t, r, i, n) {
                const a = this.#K(e), s = this.#K(t), o = this.#K(r);
                const d = (new TextEncoder).encode(i), u = new Uint8Array(4);
                new DataView(u.buffer).setUint32(0, d.length, !1);
                let l = new Uint8Array(a.length + s.length + o.length + u.length + d.length);
                l.fill(0);
                let h = 0;
                l.set(a, h), h += a.length, l.set(s, h), h += s.length, l.set(o, h), h += o.length, l.set(u, h), h += u.length, l.set(d, h), h += d.length;
                const p = c.md.sha256.create();
                p.update(String.fromCharCode(...l), "raw");
                const g = p.digest().toHex();
                let y = new f(g, "hex", "be");
                return y = y.umod(n), y
            }

            #U(e, t, r, i, n) {
                const a = new d.ec(e);
                a.g = t;
                let s = a.genKeyPair();
                if (null === a.n || void 0 === a.n) throw new Error("EC error");
                let o = this.#z(a.g, s.getPublic(), r, n, a.n), c = s.getPrivate().sub(o.mul(i)).umod(a.n);
                return {V: s.getPublic(), r: c}
            }

            #D(e) {
                const t = new Uint8Array(99);
                return t.fill(0), t.set(this.#P(e.V), 0), t[66] = 32, t.set(e.r.toArray("be", 32), 67), t
            }

            #x(e) {
                if (!(e instanceof Uint8Array)) throw new TypeError("ZKPArray should be an Uint8Array with length===99");
                const t = new d.ec(this.#C), r = e[0], i = t.keyFromPublic(e.slice(1, 1 + r)).getPublic(), n = e[1 + r];
                return {V: i, r: new f(e.slice(1 + r + 1, 1 + r + 1 + n))}
            }

            #O(e, t, r, i, n, a) {
                const s = new d.ec(e);
                if (s.g = t, null === s.n || void 0 === s.n) throw new Error("EC error");
                let o = this.#z(t, i, r, a, s.n);
                return r.mul(o).add(t.mul(n)).eq(i)
            }
        }

        class l {
            #q;
            #F = !1;

            constructor() {
                const e = new d.ec("curve25519");
                this.#q = e.genKeyPair()
            }

            writeSelfPub() {
                return new Uint8Array(this.#q.getPublic().getX().toArray("be", 32))
            }

            readPeerPub(e) {
                if (this.#F) throw new Error("Reusing ecdh context");
                this.#F = !0;
                const t = new d.ec("curve25519");
                return new Uint8Array(this.#q.derive(t.keyFromPublic(e).getPublic()).toArray("be", 32))
            }
        }

        function h(e) {
            let t = new Uint8Array(e.length());
            for (let r = 0; r < t.length; r++) t[r] = e.at(r);
            return t
        }

        class p {
            #j;
            #H;
            #G;
            #W = 1;
            #Q = 0;

            constructor(e, t) {
                if (!(e instanceof Uint8Array) || 16 !== e?.length) throw new TypeError("key's length is not 16");
                if (!(t instanceof Uint8Array) || 8 !== t.length) throw new TypeError("salt's length is not 8");
                this.#j = c.cipher.createCipher("AES-GCM", c.util.createBuffer(e)), this.#H = c.cipher.createDecipher("AES-GCM", c.util.createBuffer(e)), this.#G = t
            }

            encrypt(e) {
                if (this.#W > 4294967295) throw new Error("self counter overflow");
                const t = this.#W++, r = new Uint8Array(12);
                r.set(this.#G, 0);
                if (new DataView(r.buffer).setUint32(8, t, !0), this.#j.start({
                    iv: c.util.createBuffer(r),
                    tagLength: 128
                }), this.#j.update(c.util.createBuffer(e)), !this.#j.finish()) throw new Error("forge encryption error");
                const i = h(this.#j.output), n = h(this.#j.mode.tag);
                let a = new Uint8Array(4 + i.length + n.length);
                return new DataView(a.buffer).setUint32(0, t, !0), a.set(i, 4), a.set(n, 4 + i.length), a.buffer
            }

            decrypt(e) {
                let t = new DataView(e).getUint32(0, !0);
                if (t <= this.#Q) throw new Error("Replay attack!");
                this.#Q = t;
                const r = new Uint8Array(e.slice(4, e.byteLength - 16)), i = new Uint8Array(e.slice(4 + r.length)),
                    n = new Uint8Array(12);
                n.set(this.#G);
                if (new DataView(n.buffer).setUint32(8, t, !0), this.#H.start({
                    iv: c.util.createBuffer(n),
                    tagLength: 128,
                    tag: c.util.createBuffer(i)
                }), this.#H.update(c.util.createBuffer(r)), !this.#H.finish()) throw new Error("authentication or decryption failed");
                return h(this.#H.output).buffer
            }
        }

        function g(e) {
            let t = e.length;
            for (; --t >= 0;) e[t] = 0
        }

        const y = 256, m = 286, v = 30, b = 15,
            w = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]),
            E = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]),
            C = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]),
            S = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), I = new Array(576);
        g(I);
        const A = new Array(60);
        g(A);
        const _ = new Array(512);
        g(_);
        const T = new Array(256);
        g(T);
        const B = new Array(29);
        g(B);
        const N = new Array(v);

        function k(e, t, r, i, n) {
            this.static_tree = e, this.extra_bits = t, this.extra_base = r, this.elems = i, this.max_length = n, this.has_stree = e && e.length
        }

        let R, L, M;

        function U(e, t) {
            this.dyn_tree = e, this.max_code = 0, this.stat_desc = t
        }

        g(N);
        const P = e => e < 256 ? _[e] : _[256 + (e >>> 7)], D = (e, t) => {
            e.pending_buf[e.pending++] = 255 & t, e.pending_buf[e.pending++] = t >>> 8 & 255
        }, x = (e, t, r) => {
            e.bi_valid > 16 - r ? (e.bi_buf |= t << e.bi_valid & 65535, D(e, e.bi_buf), e.bi_buf = t >> 16 - e.bi_valid, e.bi_valid += r - 16) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += r)
        }, O = (e, t, r) => {
            x(e, r[2 * t], r[2 * t + 1])
        }, V = (e, t) => {
            let r = 0;
            do {
                r |= 1 & e, e >>>= 1, r <<= 1
            } while (--t > 0);
            return r >>> 1
        }, K = (e, t, r) => {
            const i = new Array(16);
            let n, a, s = 0;
            for (n = 1; n <= b; n++) s = s + r[n - 1] << 1, i[n] = s;
            for (a = 0; a <= t; a++) {
                let t = e[2 * a + 1];
                0 !== t && (e[2 * a] = V(i[t]++, t))
            }
        }, z = e => {
            let t;
            for (t = 0; t < m; t++) e.dyn_ltree[2 * t] = 0;
            for (t = 0; t < v; t++) e.dyn_dtree[2 * t] = 0;
            for (t = 0; t < 19; t++) e.bl_tree[2 * t] = 0;
            e.dyn_ltree[512] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0
        }, q = e => {
            e.bi_valid > 8 ? D(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0
        }, F = (e, t, r, i) => {
            const n = 2 * t, a = 2 * r;
            return e[n] < e[a] || e[n] === e[a] && i[t] <= i[r]
        }, j = (e, t, r) => {
            const i = e.heap[r];
            let n = r << 1;
            for (; n <= e.heap_len && (n < e.heap_len && F(t, e.heap[n + 1], e.heap[n], e.depth) && n++, !F(t, i, e.heap[n], e.depth));) e.heap[r] = e.heap[n], r = n, n <<= 1;
            e.heap[r] = i
        }, H = (e, t, r) => {
            let i, n, a, s, o = 0;
            if (0 !== e.sym_next) do {
                i = 255 & e.pending_buf[e.sym_buf + o++], i += (255 & e.pending_buf[e.sym_buf + o++]) << 8, n = e.pending_buf[e.sym_buf + o++], 0 === i ? O(e, n, t) : (a = T[n], O(e, a + y + 1, t), s = w[a], 0 !== s && (n -= B[a], x(e, n, s)), i--, a = P(i), O(e, a, r), s = E[a], 0 !== s && (i -= N[a], x(e, i, s)))
            } while (o < e.sym_next);
            O(e, 256, t)
        }, G = (e, t) => {
            const r = t.dyn_tree, i = t.stat_desc.static_tree, n = t.stat_desc.has_stree, a = t.stat_desc.elems;
            let s, o, c, f = -1;
            for (e.heap_len = 0, e.heap_max = 573, s = 0; s < a; s++) 0 !== r[2 * s] ? (e.heap[++e.heap_len] = f = s, e.depth[s] = 0) : r[2 * s + 1] = 0;
            for (; e.heap_len < 2;) c = e.heap[++e.heap_len] = f < 2 ? ++f : 0, r[2 * c] = 1, e.depth[c] = 0, e.opt_len--, n && (e.static_len -= i[2 * c + 1]);
            for (t.max_code = f, s = e.heap_len >> 1; s >= 1; s--) j(e, r, s);
            c = a;
            do {
                s = e.heap[1], e.heap[1] = e.heap[e.heap_len--], j(e, r, 1), o = e.heap[1], e.heap[--e.heap_max] = s, e.heap[--e.heap_max] = o, r[2 * c] = r[2 * s] + r[2 * o], e.depth[c] = (e.depth[s] >= e.depth[o] ? e.depth[s] : e.depth[o]) + 1, r[2 * s + 1] = r[2 * o + 1] = c, e.heap[1] = c++, j(e, r, 1)
            } while (e.heap_len >= 2);
            e.heap[--e.heap_max] = e.heap[1], ((e, t) => {
                const r = t.dyn_tree, i = t.max_code, n = t.stat_desc.static_tree, a = t.stat_desc.has_stree,
                    s = t.stat_desc.extra_bits, o = t.stat_desc.extra_base, c = t.stat_desc.max_length;
                let f, d, u, l, h, p, g = 0;
                for (l = 0; l <= b; l++) e.bl_count[l] = 0;
                for (r[2 * e.heap[e.heap_max] + 1] = 0, f = e.heap_max + 1; f < 573; f++) d = e.heap[f], l = r[2 * r[2 * d + 1] + 1] + 1, l > c && (l = c, g++), r[2 * d + 1] = l, d > i || (e.bl_count[l]++, h = 0, d >= o && (h = s[d - o]), p = r[2 * d], e.opt_len += p * (l + h), a && (e.static_len += p * (n[2 * d + 1] + h)));
                if (0 !== g) {
                    do {
                        for (l = c - 1; 0 === e.bl_count[l];) l--;
                        e.bl_count[l]--, e.bl_count[l + 1] += 2, e.bl_count[c]--, g -= 2
                    } while (g > 0);
                    for (l = c; 0 !== l; l--) for (d = e.bl_count[l]; 0 !== d;) u = e.heap[--f], u > i || (r[2 * u + 1] !== l && (e.opt_len += (l - r[2 * u + 1]) * r[2 * u], r[2 * u + 1] = l), d--)
                }
            })(e, t), K(r, f, e.bl_count)
        }, W = (e, t, r) => {
            let i, n, a = -1, s = t[1], o = 0, c = 7, f = 4;
            for (0 === s && (c = 138, f = 3), t[2 * (r + 1) + 1] = 65535, i = 0; i <= r; i++) n = s, s = t[2 * (i + 1) + 1], ++o < c && n === s || (o < f ? e.bl_tree[2 * n] += o : 0 !== n ? (n !== a && e.bl_tree[2 * n]++, e.bl_tree[32]++) : o <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++, o = 0, a = n, 0 === s ? (c = 138, f = 3) : n === s ? (c = 6, f = 3) : (c = 7, f = 4))
        }, Q = (e, t, r) => {
            let i, n, a = -1, s = t[1], o = 0, c = 7, f = 4;
            for (0 === s && (c = 138, f = 3), i = 0; i <= r; i++) if (n = s, s = t[2 * (i + 1) + 1], !(++o < c && n === s)) {
                if (o < f) do {
                    O(e, n, e.bl_tree)
                } while (0 != --o); else 0 !== n ? (n !== a && (O(e, n, e.bl_tree), o--), O(e, 16, e.bl_tree), x(e, o - 3, 2)) : o <= 10 ? (O(e, 17, e.bl_tree), x(e, o - 3, 3)) : (O(e, 18, e.bl_tree), x(e, o - 11, 7));
                o = 0, a = n, 0 === s ? (c = 138, f = 3) : n === s ? (c = 6, f = 3) : (c = 7, f = 4)
            }
        };
        let Z = !1;
        const X = (e, t, r, i) => {
            x(e, 0 + (i ? 1 : 0), 3), q(e), D(e, r), D(e, ~r), r && e.pending_buf.set(e.window.subarray(t, t + r), e.pending), e.pending += r
        };
        var Y = (e, t, r, i) => {
            let n, a, s = 0;
            e.level > 0 ? (2 === e.strm.data_type && (e.strm.data_type = (e => {
                let t, r = 4093624447;
                for (t = 0; t <= 31; t++, r >>>= 1) if (1 & r && 0 !== e.dyn_ltree[2 * t]) return 0;
                if (0 !== e.dyn_ltree[18] || 0 !== e.dyn_ltree[20] || 0 !== e.dyn_ltree[26]) return 1;
                for (t = 32; t < y; t++) if (0 !== e.dyn_ltree[2 * t]) return 1;
                return 0
            })(e)), G(e, e.l_desc), G(e, e.d_desc), s = (e => {
                let t;
                for (W(e, e.dyn_ltree, e.l_desc.max_code), W(e, e.dyn_dtree, e.d_desc.max_code), G(e, e.bl_desc), t = 18; t >= 3 && 0 === e.bl_tree[2 * S[t] + 1]; t--) ;
                return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t
            })(e), n = e.opt_len + 3 + 7 >>> 3, a = e.static_len + 3 + 7 >>> 3, a <= n && (n = a)) : n = a = r + 5, r + 4 <= n && -1 !== t ? X(e, t, r, i) : 4 === e.strategy || a === n ? (x(e, 2 + (i ? 1 : 0), 3), H(e, I, A)) : (x(e, 4 + (i ? 1 : 0), 3), ((e, t, r, i) => {
                let n;
                for (x(e, t - 257, 5), x(e, r - 1, 5), x(e, i - 4, 4), n = 0; n < i; n++) x(e, e.bl_tree[2 * S[n] + 1], 3);
                Q(e, e.dyn_ltree, t - 1), Q(e, e.dyn_dtree, r - 1)
            })(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, s + 1), H(e, e.dyn_ltree, e.dyn_dtree)), z(e), i && q(e)
        }, $ = {
            _tr_init: e => {
                Z || ((() => {
                    let e, t, r, i, n;
                    const a = new Array(16);
                    for (r = 0, i = 0; i < 28; i++) for (B[i] = r, e = 0; e < 1 << w[i]; e++) T[r++] = i;
                    for (T[r - 1] = i, n = 0, i = 0; i < 16; i++) for (N[i] = n, e = 0; e < 1 << E[i]; e++) _[n++] = i;
                    for (n >>= 7; i < v; i++) for (N[i] = n << 7, e = 0; e < 1 << E[i] - 7; e++) _[256 + n++] = i;
                    for (t = 0; t <= b; t++) a[t] = 0;
                    for (e = 0; e <= 143;) I[2 * e + 1] = 8, e++, a[8]++;
                    for (; e <= 255;) I[2 * e + 1] = 9, e++, a[9]++;
                    for (; e <= 279;) I[2 * e + 1] = 7, e++, a[7]++;
                    for (; e <= 287;) I[2 * e + 1] = 8, e++, a[8]++;
                    for (K(I, 287, a), e = 0; e < v; e++) A[2 * e + 1] = 5, A[2 * e] = V(e, 5);
                    R = new k(I, w, 257, m, b), L = new k(A, E, 0, v, b), M = new k(new Array(0), C, 0, 19, 7)
                })(), Z = !0), e.l_desc = new U(e.dyn_ltree, R), e.d_desc = new U(e.dyn_dtree, L), e.bl_desc = new U(e.bl_tree, M), e.bi_buf = 0, e.bi_valid = 0, z(e)
            },
            _tr_stored_block: X,
            _tr_flush_block: Y,
            _tr_tally: (e, t, r) => (e.pending_buf[e.sym_buf + e.sym_next++] = t, e.pending_buf[e.sym_buf + e.sym_next++] = t >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = r, 0 === t ? e.dyn_ltree[2 * r]++ : (e.matches++, t--, e.dyn_ltree[2 * (T[r] + y + 1)]++, e.dyn_dtree[2 * P(t)]++), e.sym_next === e.sym_end),
            _tr_align: e => {
                x(e, 2, 3), O(e, 256, I), (e => {
                    16 === e.bi_valid ? (D(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = 255 & e.bi_buf, e.bi_buf >>= 8, e.bi_valid -= 8)
                })(e)
            }
        };
        var J = (e, t, r, i) => {
            let n = 65535 & e | 0, a = e >>> 16 & 65535 | 0, s = 0;
            for (; 0 !== r;) {
                s = r > 2e3 ? 2e3 : r, r -= s;
                do {
                    n = n + t[i++] | 0, a = a + n | 0
                } while (--s);
                n %= 65521, a %= 65521
            }
            return n | a << 16 | 0
        };
        const ee = new Uint32Array((() => {
            let e, t = [];
            for (var r = 0; r < 256; r++) {
                e = r;
                for (var i = 0; i < 8; i++) e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                t[r] = e
            }
            return t
        })());
        var te = (e, t, r, i) => {
            const n = ee, a = i + r;
            e ^= -1;
            for (let s = i; s < a; s++) e = e >>> 8 ^ n[255 & (e ^ t[s])];
            return -1 ^ e
        }, re = {
            2: "need dictionary",
            1: "stream end",
            0: "",
            "-1": "file error",
            "-2": "stream error",
            "-3": "data error",
            "-4": "insufficient memory",
            "-5": "buffer error",
            "-6": "incompatible version"
        }, ie = {
            Z_NO_FLUSH: 0,
            Z_PARTIAL_FLUSH: 1,
            Z_SYNC_FLUSH: 2,
            Z_FULL_FLUSH: 3,
            Z_FINISH: 4,
            Z_BLOCK: 5,
            Z_TREES: 6,
            Z_OK: 0,
            Z_STREAM_END: 1,
            Z_NEED_DICT: 2,
            Z_ERRNO: -1,
            Z_STREAM_ERROR: -2,
            Z_DATA_ERROR: -3,
            Z_MEM_ERROR: -4,
            Z_BUF_ERROR: -5,
            Z_NO_COMPRESSION: 0,
            Z_BEST_SPEED: 1,
            Z_BEST_COMPRESSION: 9,
            Z_DEFAULT_COMPRESSION: -1,
            Z_FILTERED: 1,
            Z_HUFFMAN_ONLY: 2,
            Z_RLE: 3,
            Z_FIXED: 4,
            Z_DEFAULT_STRATEGY: 0,
            Z_BINARY: 0,
            Z_TEXT: 1,
            Z_UNKNOWN: 2,
            Z_DEFLATED: 8
        };
        const {
                _tr_init: ne,
                _tr_stored_block: ae,
                _tr_flush_block: se,
                _tr_tally: oe,
                _tr_align: ce
            } = $, {
                Z_NO_FLUSH: fe,
                Z_PARTIAL_FLUSH: de,
                Z_FULL_FLUSH: ue,
                Z_FINISH: le,
                Z_BLOCK: he,
                Z_OK: pe,
                Z_STREAM_END: ge,
                Z_STREAM_ERROR: ye,
                Z_DATA_ERROR: me,
                Z_BUF_ERROR: ve,
                Z_DEFAULT_COMPRESSION: be,
                Z_FILTERED: we,
                Z_HUFFMAN_ONLY: Ee,
                Z_RLE: Ce,
                Z_FIXED: Se,
                Z_DEFAULT_STRATEGY: Ie,
                Z_UNKNOWN: Ae,
                Z_DEFLATED: _e
            } = ie, Te = 258, Be = 262, Ne = 42, ke = 113, Re = 666, Le = (e, t) => (e.msg = re[t], t),
            Me = e => 2 * e - (e > 4 ? 9 : 0), Ue = e => {
                let t = e.length;
                for (; --t >= 0;) e[t] = 0
            }, Pe = e => {
                let t, r, i, n = e.w_size;
                t = e.hash_size, i = t;
                do {
                    r = e.head[--i], e.head[i] = r >= n ? r - n : 0
                } while (--t);
                t = n, i = t;
                do {
                    r = e.prev[--i], e.prev[i] = r >= n ? r - n : 0
                } while (--t)
            };
        let De = (e, t, r) => (t << e.hash_shift ^ r) & e.hash_mask;
        const xe = e => {
            const t = e.state;
            let r = t.pending;
            r > e.avail_out && (r = e.avail_out), 0 !== r && (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + r), e.next_out), e.next_out += r, t.pending_out += r, e.total_out += r, e.avail_out -= r, t.pending -= r, 0 === t.pending && (t.pending_out = 0))
        }, Oe = (e, t) => {
            se(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, xe(e.strm)
        }, Ve = (e, t) => {
            e.pending_buf[e.pending++] = t
        }, Ke = (e, t) => {
            e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = 255 & t
        }, ze = (e, t, r, i) => {
            let n = e.avail_in;
            return n > i && (n = i), 0 === n ? 0 : (e.avail_in -= n, t.set(e.input.subarray(e.next_in, e.next_in + n), r), 1 === e.state.wrap ? e.adler = J(e.adler, t, n, r) : 2 === e.state.wrap && (e.adler = te(e.adler, t, n, r)), e.next_in += n, e.total_in += n, n)
        }, qe = (e, t) => {
            let r, i, n = e.max_chain_length, a = e.strstart, s = e.prev_length, o = e.nice_match;
            const c = e.strstart > e.w_size - Be ? e.strstart - (e.w_size - Be) : 0, f = e.window, d = e.w_mask,
                u = e.prev, l = e.strstart + Te;
            let h = f[a + s - 1], p = f[a + s];
            e.prev_length >= e.good_match && (n >>= 2), o > e.lookahead && (o = e.lookahead);
            do {
                if (r = t, f[r + s] === p && f[r + s - 1] === h && f[r] === f[a] && f[++r] === f[a + 1]) {
                    a += 2, r++;
                    do {
                    } while (f[++a] === f[++r] && f[++a] === f[++r] && f[++a] === f[++r] && f[++a] === f[++r] && f[++a] === f[++r] && f[++a] === f[++r] && f[++a] === f[++r] && f[++a] === f[++r] && a < l);
                    if (i = Te - (l - a), a = l - Te, i > s) {
                        if (e.match_start = t, s = i, i >= o) break;
                        h = f[a + s - 1], p = f[a + s]
                    }
                }
            } while ((t = u[t & d]) > c && 0 != --n);
            return s <= e.lookahead ? s : e.lookahead
        }, Fe = e => {
            const t = e.w_size;
            let r, i, n;
            do {
                if (i = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - Be) && (e.window.set(e.window.subarray(t, t + t - i), 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, e.insert > e.strstart && (e.insert = e.strstart), Pe(e), i += t), 0 === e.strm.avail_in) break;
                if (r = ze(e.strm, e.window, e.strstart + e.lookahead, i), e.lookahead += r, e.lookahead + e.insert >= 3) for (n = e.strstart - e.insert, e.ins_h = e.window[n], e.ins_h = De(e, e.ins_h, e.window[n + 1]); e.insert && (e.ins_h = De(e, e.ins_h, e.window[n + 3 - 1]), e.prev[n & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = n, n++, e.insert--, !(e.lookahead + e.insert < 3));) ;
            } while (e.lookahead < Be && 0 !== e.strm.avail_in)
        }, je = (e, t) => {
            let r, i, n, a = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, s = 0,
                o = e.strm.avail_in;
            do {
                if (r = 65535, n = e.bi_valid + 42 >> 3, e.strm.avail_out < n) break;
                if (n = e.strm.avail_out - n, i = e.strstart - e.block_start, r > i + e.strm.avail_in && (r = i + e.strm.avail_in), r > n && (r = n), r < a && (0 === r && t !== le || t === fe || r !== i + e.strm.avail_in)) break;
                s = t === le && r === i + e.strm.avail_in ? 1 : 0, ae(e, 0, 0, s), e.pending_buf[e.pending - 4] = r, e.pending_buf[e.pending - 3] = r >> 8, e.pending_buf[e.pending - 2] = ~r, e.pending_buf[e.pending - 1] = ~r >> 8, xe(e.strm), i && (i > r && (i = r), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + i), e.strm.next_out), e.strm.next_out += i, e.strm.avail_out -= i, e.strm.total_out += i, e.block_start += i, r -= i), r && (ze(e.strm, e.strm.output, e.strm.next_out, r), e.strm.next_out += r, e.strm.avail_out -= r, e.strm.total_out += r)
            } while (0 === s);
            return o -= e.strm.avail_in, o && (o >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= o && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - o, e.strm.next_in), e.strstart), e.strstart += o, e.insert += o > e.w_size - e.insert ? e.w_size - e.insert : o), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), s ? 4 : t !== fe && t !== le && 0 === e.strm.avail_in && e.strstart === e.block_start ? 2 : (n = e.window_size - e.strstart, e.strm.avail_in > n && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, n += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), n > e.strm.avail_in && (n = e.strm.avail_in), n && (ze(e.strm, e.window, e.strstart, n), e.strstart += n, e.insert += n > e.w_size - e.insert ? e.w_size - e.insert : n), e.high_water < e.strstart && (e.high_water = e.strstart), n = e.bi_valid + 42 >> 3, n = e.pending_buf_size - n > 65535 ? 65535 : e.pending_buf_size - n, a = n > e.w_size ? e.w_size : n, i = e.strstart - e.block_start, (i >= a || (i || t === le) && t !== fe && 0 === e.strm.avail_in && i <= n) && (r = i > n ? n : i, s = t === le && 0 === e.strm.avail_in && r === i ? 1 : 0, ae(e, e.block_start, r, s), e.block_start += r, xe(e.strm)), s ? 3 : 1)
        }, He = (e, t) => {
            let r, i;
            for (; ;) {
                if (e.lookahead < Be) {
                    if (Fe(e), e.lookahead < Be && t === fe) return 1;
                    if (0 === e.lookahead) break
                }
                if (r = 0, e.lookahead >= 3 && (e.ins_h = De(e, e.ins_h, e.window[e.strstart + 3 - 1]), r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), 0 !== r && e.strstart - r <= e.w_size - Be && (e.match_length = qe(e, r)), e.match_length >= 3) if (i = oe(e, e.strstart - e.match_start, e.match_length - 3), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= 3) {
                    e.match_length--;
                    do {
                        e.strstart++, e.ins_h = De(e, e.ins_h, e.window[e.strstart + 3 - 1]), r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart
                    } while (0 != --e.match_length);
                    e.strstart++
                } else e.strstart += e.match_length, e.match_length = 0, e.ins_h = e.window[e.strstart], e.ins_h = De(e, e.ins_h, e.window[e.strstart + 1]); else i = oe(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
                if (i && (Oe(e, !1), 0 === e.strm.avail_out)) return 1
            }
            return e.insert = e.strstart < 2 ? e.strstart : 2, t === le ? (Oe(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Oe(e, !1), 0 === e.strm.avail_out) ? 1 : 2
        }, Ge = (e, t) => {
            let r, i, n;
            for (; ;) {
                if (e.lookahead < Be) {
                    if (Fe(e), e.lookahead < Be && t === fe) return 1;
                    if (0 === e.lookahead) break
                }
                if (r = 0, e.lookahead >= 3 && (e.ins_h = De(e, e.ins_h, e.window[e.strstart + 3 - 1]), r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, 0 !== r && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - Be && (e.match_length = qe(e, r), e.match_length <= 5 && (e.strategy === we || 3 === e.match_length && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= 3 && e.match_length <= e.prev_length) {
                    n = e.strstart + e.lookahead - 3, i = oe(e, e.strstart - 1 - e.prev_match, e.prev_length - 3), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
                    do {
                        ++e.strstart <= n && (e.ins_h = De(e, e.ins_h, e.window[e.strstart + 3 - 1]), r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h], e.head[e.ins_h] = e.strstart)
                    } while (0 != --e.prev_length);
                    if (e.match_available = 0, e.match_length = 2, e.strstart++, i && (Oe(e, !1), 0 === e.strm.avail_out)) return 1
                } else if (e.match_available) {
                    if (i = oe(e, 0, e.window[e.strstart - 1]), i && Oe(e, !1), e.strstart++, e.lookahead--, 0 === e.strm.avail_out) return 1
                } else e.match_available = 1, e.strstart++, e.lookahead--
            }
            return e.match_available && (i = oe(e, 0, e.window[e.strstart - 1]), e.match_available = 0), e.insert = e.strstart < 2 ? e.strstart : 2, t === le ? (Oe(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Oe(e, !1), 0 === e.strm.avail_out) ? 1 : 2
        };

        function We(e, t, r, i, n) {
            this.good_length = e, this.max_lazy = t, this.nice_length = r, this.max_chain = i, this.func = n
        }

        const Qe = [new We(0, 0, 0, 0, je), new We(4, 4, 8, 4, He), new We(4, 5, 16, 8, He), new We(4, 6, 32, 32, He), new We(4, 4, 16, 16, Ge), new We(8, 16, 32, 32, Ge), new We(8, 16, 128, 128, Ge), new We(8, 32, 128, 256, Ge), new We(32, 128, 258, 1024, Ge), new We(32, 258, 258, 4096, Ge)];

        function Ze() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = _e, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(1146), this.dyn_dtree = new Uint16Array(122), this.bl_tree = new Uint16Array(78), Ue(this.dyn_ltree), Ue(this.dyn_dtree), Ue(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(16), this.heap = new Uint16Array(573), Ue(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(573), Ue(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
        }

        const Xe = e => {
            if (!e) return 1;
            const t = e.state;
            return !t || t.strm !== e || t.status !== Ne && 57 !== t.status && 69 !== t.status && 73 !== t.status && 91 !== t.status && 103 !== t.status && t.status !== ke && t.status !== Re ? 1 : 0
        }, Ye = e => {
            if (Xe(e)) return Le(e, ye);
            e.total_in = e.total_out = 0, e.data_type = Ae;
            const t = e.state;
            return t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = 2 === t.wrap ? 57 : t.wrap ? Ne : ke, e.adler = 2 === t.wrap ? 0 : 1, t.last_flush = -2, ne(t), pe
        }, $e = e => {
            const t = Ye(e);
            var r;
            return t === pe && ((r = e.state).window_size = 2 * r.w_size, Ue(r.head), r.max_lazy_match = Qe[r.level].max_lazy, r.good_match = Qe[r.level].good_length, r.nice_match = Qe[r.level].nice_length, r.max_chain_length = Qe[r.level].max_chain, r.strstart = 0, r.block_start = 0, r.lookahead = 0, r.insert = 0, r.match_length = r.prev_length = 2, r.match_available = 0, r.ins_h = 0), t
        }, Je = (e, t, r, i, n, a) => {
            if (!e) return ye;
            let s = 1;
            if (t === be && (t = 6), i < 0 ? (s = 0, i = -i) : i > 15 && (s = 2, i -= 16), n < 1 || n > 9 || r !== _e || i < 8 || i > 15 || t < 0 || t > 9 || a < 0 || a > Se || 8 === i && 1 !== s) return Le(e, ye);
            8 === i && (i = 9);
            const o = new Ze;
            return e.state = o, o.strm = e, o.status = Ne, o.wrap = s, o.gzhead = null, o.w_bits = i, o.w_size = 1 << o.w_bits, o.w_mask = o.w_size - 1, o.hash_bits = n + 7, o.hash_size = 1 << o.hash_bits, o.hash_mask = o.hash_size - 1, o.hash_shift = ~~((o.hash_bits + 3 - 1) / 3), o.window = new Uint8Array(2 * o.w_size), o.head = new Uint16Array(o.hash_size), o.prev = new Uint16Array(o.w_size), o.lit_bufsize = 1 << n + 6, o.pending_buf_size = 4 * o.lit_bufsize, o.pending_buf = new Uint8Array(o.pending_buf_size), o.sym_buf = o.lit_bufsize, o.sym_end = 3 * (o.lit_bufsize - 1), o.level = t, o.strategy = a, o.method = r, $e(e)
        };
        var et = {
            deflateInit: (e, t) => Je(e, t, _e, 15, 8, Ie),
            deflateInit2: Je,
            deflateReset: $e,
            deflateResetKeep: Ye,
            deflateSetHeader: (e, t) => Xe(e) || 2 !== e.state.wrap ? ye : (e.state.gzhead = t, pe),
            deflate: (e, t) => {
                if (Xe(e) || t > he || t < 0) return e ? Le(e, ye) : ye;
                const r = e.state;
                if (!e.output || 0 !== e.avail_in && !e.input || r.status === Re && t !== le) return Le(e, 0 === e.avail_out ? ve : ye);
                const i = r.last_flush;
                if (r.last_flush = t, 0 !== r.pending) {
                    if (xe(e), 0 === e.avail_out) return r.last_flush = -1, pe
                } else if (0 === e.avail_in && Me(t) <= Me(i) && t !== le) return Le(e, ve);
                if (r.status === Re && 0 !== e.avail_in) return Le(e, ve);
                if (r.status === Ne && 0 === r.wrap && (r.status = ke), r.status === Ne) {
                    let t = _e + (r.w_bits - 8 << 4) << 8, i = -1;
                    if (i = r.strategy >= Ee || r.level < 2 ? 0 : r.level < 6 ? 1 : 6 === r.level ? 2 : 3, t |= i << 6, 0 !== r.strstart && (t |= 32), t += 31 - t % 31, Ke(r, t), 0 !== r.strstart && (Ke(r, e.adler >>> 16), Ke(r, 65535 & e.adler)), e.adler = 1, r.status = ke, xe(e), 0 !== r.pending) return r.last_flush = -1, pe
                }
                if (57 === r.status) if (e.adler = 0, Ve(r, 31), Ve(r, 139), Ve(r, 8), r.gzhead) Ve(r, (r.gzhead.text ? 1 : 0) + (r.gzhead.hcrc ? 2 : 0) + (r.gzhead.extra ? 4 : 0) + (r.gzhead.name ? 8 : 0) + (r.gzhead.comment ? 16 : 0)), Ve(r, 255 & r.gzhead.time), Ve(r, r.gzhead.time >> 8 & 255), Ve(r, r.gzhead.time >> 16 & 255), Ve(r, r.gzhead.time >> 24 & 255), Ve(r, 9 === r.level ? 2 : r.strategy >= Ee || r.level < 2 ? 4 : 0), Ve(r, 255 & r.gzhead.os), r.gzhead.extra && r.gzhead.extra.length && (Ve(r, 255 & r.gzhead.extra.length), Ve(r, r.gzhead.extra.length >> 8 & 255)), r.gzhead.hcrc && (e.adler = te(e.adler, r.pending_buf, r.pending, 0)), r.gzindex = 0, r.status = 69; else if (Ve(r, 0), Ve(r, 0), Ve(r, 0), Ve(r, 0), Ve(r, 0), Ve(r, 9 === r.level ? 2 : r.strategy >= Ee || r.level < 2 ? 4 : 0), Ve(r, 3), r.status = ke, xe(e), 0 !== r.pending) return r.last_flush = -1, pe;
                if (69 === r.status) {
                    if (r.gzhead.extra) {
                        let t = r.pending, i = (65535 & r.gzhead.extra.length) - r.gzindex;
                        for (; r.pending + i > r.pending_buf_size;) {
                            let n = r.pending_buf_size - r.pending;
                            if (r.pending_buf.set(r.gzhead.extra.subarray(r.gzindex, r.gzindex + n), r.pending), r.pending = r.pending_buf_size, r.gzhead.hcrc && r.pending > t && (e.adler = te(e.adler, r.pending_buf, r.pending - t, t)), r.gzindex += n, xe(e), 0 !== r.pending) return r.last_flush = -1, pe;
                            t = 0, i -= n
                        }
                        let n = new Uint8Array(r.gzhead.extra);
                        r.pending_buf.set(n.subarray(r.gzindex, r.gzindex + i), r.pending), r.pending += i, r.gzhead.hcrc && r.pending > t && (e.adler = te(e.adler, r.pending_buf, r.pending - t, t)), r.gzindex = 0
                    }
                    r.status = 73
                }
                if (73 === r.status) {
                    if (r.gzhead.name) {
                        let t, i = r.pending;
                        do {
                            if (r.pending === r.pending_buf_size) {
                                if (r.gzhead.hcrc && r.pending > i && (e.adler = te(e.adler, r.pending_buf, r.pending - i, i)), xe(e), 0 !== r.pending) return r.last_flush = -1, pe;
                                i = 0
                            }
                            t = r.gzindex < r.gzhead.name.length ? 255 & r.gzhead.name.charCodeAt(r.gzindex++) : 0, Ve(r, t)
                        } while (0 !== t);
                        r.gzhead.hcrc && r.pending > i && (e.adler = te(e.adler, r.pending_buf, r.pending - i, i)), r.gzindex = 0
                    }
                    r.status = 91
                }
                if (91 === r.status) {
                    if (r.gzhead.comment) {
                        let t, i = r.pending;
                        do {
                            if (r.pending === r.pending_buf_size) {
                                if (r.gzhead.hcrc && r.pending > i && (e.adler = te(e.adler, r.pending_buf, r.pending - i, i)), xe(e), 0 !== r.pending) return r.last_flush = -1, pe;
                                i = 0
                            }
                            t = r.gzindex < r.gzhead.comment.length ? 255 & r.gzhead.comment.charCodeAt(r.gzindex++) : 0, Ve(r, t)
                        } while (0 !== t);
                        r.gzhead.hcrc && r.pending > i && (e.adler = te(e.adler, r.pending_buf, r.pending - i, i))
                    }
                    r.status = 103
                }
                if (103 === r.status) {
                    if (r.gzhead.hcrc) {
                        if (r.pending + 2 > r.pending_buf_size && (xe(e), 0 !== r.pending)) return r.last_flush = -1, pe;
                        Ve(r, 255 & e.adler), Ve(r, e.adler >> 8 & 255), e.adler = 0
                    }
                    if (r.status = ke, xe(e), 0 !== r.pending) return r.last_flush = -1, pe
                }
                if (0 !== e.avail_in || 0 !== r.lookahead || t !== fe && r.status !== Re) {
                    let i = 0 === r.level ? je(r, t) : r.strategy === Ee ? ((e, t) => {
                        let r;
                        for (; ;) {
                            if (0 === e.lookahead && (Fe(e), 0 === e.lookahead)) {
                                if (t === fe) return 1;
                                break
                            }
                            if (e.match_length = 0, r = oe(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, r && (Oe(e, !1), 0 === e.strm.avail_out)) return 1
                        }
                        return e.insert = 0, t === le ? (Oe(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Oe(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                    })(r, t) : r.strategy === Ce ? ((e, t) => {
                        let r, i, n, a;
                        const s = e.window;
                        for (; ;) {
                            if (e.lookahead <= Te) {
                                if (Fe(e), e.lookahead <= Te && t === fe) return 1;
                                if (0 === e.lookahead) break
                            }
                            if (e.match_length = 0, e.lookahead >= 3 && e.strstart > 0 && (n = e.strstart - 1, i = s[n], i === s[++n] && i === s[++n] && i === s[++n])) {
                                a = e.strstart + Te;
                                do {
                                } while (i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && i === s[++n] && n < a);
                                e.match_length = Te - (a - n), e.match_length > e.lookahead && (e.match_length = e.lookahead)
                            }
                            if (e.match_length >= 3 ? (r = oe(e, 1, e.match_length - 3), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (r = oe(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), r && (Oe(e, !1), 0 === e.strm.avail_out)) return 1
                        }
                        return e.insert = 0, t === le ? (Oe(e, !0), 0 === e.strm.avail_out ? 3 : 4) : e.sym_next && (Oe(e, !1), 0 === e.strm.avail_out) ? 1 : 2
                    })(r, t) : Qe[r.level].func(r, t);
                    if (3 !== i && 4 !== i || (r.status = Re), 1 === i || 3 === i) return 0 === e.avail_out && (r.last_flush = -1), pe;
                    if (2 === i && (t === de ? ce(r) : t !== he && (ae(r, 0, 0, !1), t === ue && (Ue(r.head), 0 === r.lookahead && (r.strstart = 0, r.block_start = 0, r.insert = 0))), xe(e), 0 === e.avail_out)) return r.last_flush = -1, pe
                }
                return t !== le ? pe : r.wrap <= 0 ? ge : (2 === r.wrap ? (Ve(r, 255 & e.adler), Ve(r, e.adler >> 8 & 255), Ve(r, e.adler >> 16 & 255), Ve(r, e.adler >> 24 & 255), Ve(r, 255 & e.total_in), Ve(r, e.total_in >> 8 & 255), Ve(r, e.total_in >> 16 & 255), Ve(r, e.total_in >> 24 & 255)) : (Ke(r, e.adler >>> 16), Ke(r, 65535 & e.adler)), xe(e), r.wrap > 0 && (r.wrap = -r.wrap), 0 !== r.pending ? pe : ge)
            },
            deflateEnd: e => {
                if (Xe(e)) return ye;
                const t = e.state.status;
                return e.state = null, t === ke ? Le(e, me) : pe
            },
            deflateSetDictionary: (e, t) => {
                let r = t.length;
                if (Xe(e)) return ye;
                const i = e.state, n = i.wrap;
                if (2 === n || 1 === n && i.status !== Ne || i.lookahead) return ye;
                if (1 === n && (e.adler = J(e.adler, t, r, 0)), i.wrap = 0, r >= i.w_size) {
                    0 === n && (Ue(i.head), i.strstart = 0, i.block_start = 0, i.insert = 0);
                    let e = new Uint8Array(i.w_size);
                    e.set(t.subarray(r - i.w_size, r), 0), t = e, r = i.w_size
                }
                const a = e.avail_in, s = e.next_in, o = e.input;
                for (e.avail_in = r, e.next_in = 0, e.input = t, Fe(i); i.lookahead >= 3;) {
                    let e = i.strstart, t = i.lookahead - 2;
                    do {
                        i.ins_h = De(i, i.ins_h, i.window[e + 3 - 1]), i.prev[e & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = e, e++
                    } while (--t);
                    i.strstart = e, i.lookahead = 2, Fe(i)
                }
                return i.strstart += i.lookahead, i.block_start = i.strstart, i.insert = i.lookahead, i.lookahead = 0, i.match_length = i.prev_length = 2, i.match_available = 0, e.next_in = s, e.input = o, e.avail_in = a, i.wrap = n, pe
            },
            deflateInfo: "pako deflate (from Nodeca project)"
        };
        const tt = (e, t) => Object.prototype.hasOwnProperty.call(e, t);
        var rt = {
            assign: function (e) {
                const t = Array.prototype.slice.call(arguments, 1);
                for (; t.length;) {
                    const r = t.shift();
                    if (r) {
                        if ("object" != typeof r) throw new TypeError(r + "must be non-object");
                        for (const t in r) tt(r, t) && (e[t] = r[t])
                    }
                }
                return e
            }, flattenChunks: e => {
                let t = 0;
                for (let i = 0, n = e.length; i < n; i++) t += e[i].length;
                const r = new Uint8Array(t);
                for (let i = 0, n = 0, a = e.length; i < a; i++) {
                    let t = e[i];
                    r.set(t, n), n += t.length
                }
                return r
            }
        };
        let it = !0;
        try {
            String.fromCharCode.apply(null, new Uint8Array(1))
        } catch (Gr) {
            it = !1
        }
        const nt = new Uint8Array(256);
        for (let Wr = 0; Wr < 256; Wr++) nt[Wr] = Wr >= 252 ? 6 : Wr >= 248 ? 5 : Wr >= 240 ? 4 : Wr >= 224 ? 3 : Wr >= 192 ? 2 : 1;
        nt[254] = nt[254] = 1;
        var at = {
            string2buf: e => {
                if ("function" == typeof TextEncoder && TextEncoder.prototype.encode) return (new TextEncoder).encode(e);
                let t, r, i, n, a, s = e.length, o = 0;
                for (n = 0; n < s; n++) r = e.charCodeAt(n), 55296 == (64512 & r) && n + 1 < s && (i = e.charCodeAt(n + 1), 56320 == (64512 & i) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++)), o += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4;
                for (t = new Uint8Array(o), a = 0, n = 0; a < o; n++) r = e.charCodeAt(n), 55296 == (64512 & r) && n + 1 < s && (i = e.charCodeAt(n + 1), 56320 == (64512 & i) && (r = 65536 + (r - 55296 << 10) + (i - 56320), n++)), r < 128 ? t[a++] = r : r < 2048 ? (t[a++] = 192 | r >>> 6, t[a++] = 128 | 63 & r) : r < 65536 ? (t[a++] = 224 | r >>> 12, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r) : (t[a++] = 240 | r >>> 18, t[a++] = 128 | r >>> 12 & 63, t[a++] = 128 | r >>> 6 & 63, t[a++] = 128 | 63 & r);
                return t
            }, buf2string: (e, t) => {
                const r = t || e.length;
                if ("function" == typeof TextDecoder && TextDecoder.prototype.decode) return (new TextDecoder).decode(e.subarray(0, t));
                let i, n;
                const a = new Array(2 * r);
                for (n = 0, i = 0; i < r;) {
                    let t = e[i++];
                    if (t < 128) {
                        a[n++] = t;
                        continue
                    }
                    let s = nt[t];
                    if (s > 4) a[n++] = 65533, i += s - 1; else {
                        for (t &= 2 === s ? 31 : 3 === s ? 15 : 7; s > 1 && i < r;) t = t << 6 | 63 & e[i++], s--;
                        s > 1 ? a[n++] = 65533 : t < 65536 ? a[n++] = t : (t -= 65536, a[n++] = 55296 | t >> 10 & 1023, a[n++] = 56320 | 1023 & t)
                    }
                }
                return ((e, t) => {
                    if (t < 65534 && e.subarray && it) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
                    let r = "";
                    for (let i = 0; i < t; i++) r += String.fromCharCode(e[i]);
                    return r
                })(a, n)
            }, utf8border: (e, t) => {
                (t = t || e.length) > e.length && (t = e.length);
                let r = t - 1;
                for (; r >= 0 && 128 == (192 & e[r]);) r--;
                return r < 0 || 0 === r ? t : r + nt[e[r]] > t ? r : t
            }
        };
        var st = function () {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
        };
        const ot = Object.prototype.toString, {
            Z_NO_FLUSH: ct,
            Z_SYNC_FLUSH: ft,
            Z_FULL_FLUSH: dt,
            Z_FINISH: ut,
            Z_OK: lt,
            Z_STREAM_END: ht,
            Z_DEFAULT_COMPRESSION: pt,
            Z_DEFAULT_STRATEGY: gt,
            Z_DEFLATED: yt
        } = ie;

        function mt(e) {
            this.options = rt.assign({
                level: pt,
                method: yt,
                chunkSize: 16384,
                windowBits: 15,
                memLevel: 8,
                strategy: gt
            }, e || {});
            let t = this.options;
            t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new st, this.strm.avail_out = 0;
            let r = et.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
            if (r !== lt) throw new Error(re[r]);
            if (t.header && et.deflateSetHeader(this.strm, t.header), t.dictionary) {
                let e;
                if (e = "string" == typeof t.dictionary ? at.string2buf(t.dictionary) : "[object ArrayBuffer]" === ot.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, r = et.deflateSetDictionary(this.strm, e), r !== lt) throw new Error(re[r]);
                this._dict_set = !0
            }
        }

        function vt(e, t) {
            const r = new mt(t);
            if (r.push(e, !0), r.err) throw r.msg || re[r.err];
            return r.result
        }

        mt.prototype.push = function (e, t) {
            const r = this.strm, i = this.options.chunkSize;
            let n, a;
            if (this.ended) return !1;
            for (a = t === ~~t ? t : !0 === t ? ut : ct, "string" == typeof e ? r.input = at.string2buf(e) : "[object ArrayBuffer]" === ot.call(e) ? r.input = new Uint8Array(e) : r.input = e, r.next_in = 0, r.avail_in = r.input.length; ;) if (0 === r.avail_out && (r.output = new Uint8Array(i), r.next_out = 0, r.avail_out = i), (a === ft || a === dt) && r.avail_out <= 6) this.onData(r.output.subarray(0, r.next_out)), r.avail_out = 0; else {
                if (n = et.deflate(r, a), n === ht) return r.next_out > 0 && this.onData(r.output.subarray(0, r.next_out)), n = et.deflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === lt;
                if (0 !== r.avail_out) {
                    if (a > 0 && r.next_out > 0) this.onData(r.output.subarray(0, r.next_out)), r.avail_out = 0; else if (0 === r.avail_in) break
                } else this.onData(r.output)
            }
            return !0
        }, mt.prototype.onData = function (e) {
            this.chunks.push(e)
        }, mt.prototype.onEnd = function (e) {
            e === lt && (this.result = rt.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
        };
        var bt = {
            Deflate: mt, deflate: vt, deflateRaw: function (e, t) {
                return (t = t || {}).raw = !0, vt(e, t)
            }, gzip: function (e, t) {
                return (t = t || {}).gzip = !0, vt(e, t)
            }, constants: ie
        };
        const wt = 16209;
        var Et = function (e, t) {
            let r, i, n, a, s, o, c, f, d, u, l, h, p, g, y, m, v, b, w, E, C, S, I, A;
            const _ = e.state;
            r = e.next_in, I = e.input, i = r + (e.avail_in - 5), n = e.next_out, A = e.output, a = n - (t - e.avail_out), s = n + (e.avail_out - 257), o = _.dmax, c = _.wsize, f = _.whave, d = _.wnext, u = _.window, l = _.hold, h = _.bits, p = _.lencode, g = _.distcode, y = (1 << _.lenbits) - 1, m = (1 << _.distbits) - 1;
            e:do {
                h < 15 && (l += I[r++] << h, h += 8, l += I[r++] << h, h += 8), v = p[l & y];
                t:for (; ;) {
                    if (b = v >>> 24, l >>>= b, h -= b, b = v >>> 16 & 255, 0 === b) A[n++] = 65535 & v; else {
                        if (!(16 & b)) {
                            if (0 == (64 & b)) {
                                v = p[(65535 & v) + (l & (1 << b) - 1)];
                                continue t
                            }
                            if (32 & b) {
                                _.mode = 16191;
                                break e
                            }
                            e.msg = "invalid literal/length code", _.mode = wt;
                            break e
                        }
                        w = 65535 & v, b &= 15, b && (h < b && (l += I[r++] << h, h += 8), w += l & (1 << b) - 1, l >>>= b, h -= b), h < 15 && (l += I[r++] << h, h += 8, l += I[r++] << h, h += 8), v = g[l & m];
                        r:for (; ;) {
                            if (b = v >>> 24, l >>>= b, h -= b, b = v >>> 16 & 255, !(16 & b)) {
                                if (0 == (64 & b)) {
                                    v = g[(65535 & v) + (l & (1 << b) - 1)];
                                    continue r
                                }
                                e.msg = "invalid distance code", _.mode = wt;
                                break e
                            }
                            if (E = 65535 & v, b &= 15, h < b && (l += I[r++] << h, h += 8, h < b && (l += I[r++] << h, h += 8)), E += l & (1 << b) - 1, E > o) {
                                e.msg = "invalid distance too far back", _.mode = wt;
                                break e
                            }
                            if (l >>>= b, h -= b, b = n - a, E > b) {
                                if (b = E - b, b > f && _.sane) {
                                    e.msg = "invalid distance too far back", _.mode = wt;
                                    break e
                                }
                                if (C = 0, S = u, 0 === d) {
                                    if (C += c - b, b < w) {
                                        w -= b;
                                        do {
                                            A[n++] = u[C++]
                                        } while (--b);
                                        C = n - E, S = A
                                    }
                                } else if (d < b) {
                                    if (C += c + d - b, b -= d, b < w) {
                                        w -= b;
                                        do {
                                            A[n++] = u[C++]
                                        } while (--b);
                                        if (C = 0, d < w) {
                                            b = d, w -= b;
                                            do {
                                                A[n++] = u[C++]
                                            } while (--b);
                                            C = n - E, S = A
                                        }
                                    }
                                } else if (C += d - b, b < w) {
                                    w -= b;
                                    do {
                                        A[n++] = u[C++]
                                    } while (--b);
                                    C = n - E, S = A
                                }
                                for (; w > 2;) A[n++] = S[C++], A[n++] = S[C++], A[n++] = S[C++], w -= 3;
                                w && (A[n++] = S[C++], w > 1 && (A[n++] = S[C++]))
                            } else {
                                C = n - E;
                                do {
                                    A[n++] = A[C++], A[n++] = A[C++], A[n++] = A[C++], w -= 3
                                } while (w > 2);
                                w && (A[n++] = A[C++], w > 1 && (A[n++] = A[C++]))
                            }
                            break
                        }
                    }
                    break
                }
            } while (r < i && n < s);
            w = h >> 3, r -= w, h -= w << 3, l &= (1 << h) - 1, e.next_in = r, e.next_out = n, e.avail_in = r < i ? i - r + 5 : 5 - (r - i), e.avail_out = n < s ? s - n + 257 : 257 - (n - s), _.hold = l, _.bits = h
        };
        const Ct = 15,
            St = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),
            It = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
            At = new Uint16Array([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]),
            _t = new Uint8Array([16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]);
        var Tt = (e, t, r, i, n, a, s, o) => {
            const c = o.bits;
            let f, d, u, l, h, p, g = 0, y = 0, m = 0, v = 0, b = 0, w = 0, E = 0, C = 0, S = 0, I = 0, A = null;
            const _ = new Uint16Array(16), T = new Uint16Array(16);
            let B, N, k, R = null;
            for (g = 0; g <= Ct; g++) _[g] = 0;
            for (y = 0; y < i; y++) _[t[r + y]]++;
            for (b = c, v = Ct; v >= 1 && 0 === _[v]; v--) ;
            if (b > v && (b = v), 0 === v) return n[a++] = 20971520, n[a++] = 20971520, o.bits = 1, 0;
            for (m = 1; m < v && 0 === _[m]; m++) ;
            for (b < m && (b = m), C = 1, g = 1; g <= Ct; g++) if (C <<= 1, C -= _[g], C < 0) return -1;
            if (C > 0 && (0 === e || 1 !== v)) return -1;
            for (T[1] = 0, g = 1; g < Ct; g++) T[g + 1] = T[g] + _[g];
            for (y = 0; y < i; y++) 0 !== t[r + y] && (s[T[t[r + y]]++] = y);
            if (0 === e ? (A = R = s, p = 20) : 1 === e ? (A = St, R = It, p = 257) : (A = At, R = _t, p = 0), I = 0, y = 0, g = m, h = a, w = b, E = 0, u = -1, S = 1 << b, l = S - 1, 1 === e && S > 852 || 2 === e && S > 592) return 1;
            for (; ;) {
                B = g - E, s[y] + 1 < p ? (N = 0, k = s[y]) : s[y] >= p ? (N = R[s[y] - p], k = A[s[y] - p]) : (N = 96, k = 0), f = 1 << g - E, d = 1 << w, m = d;
                do {
                    d -= f, n[h + (I >> E) + d] = B << 24 | N << 16 | k | 0
                } while (0 !== d);
                for (f = 1 << g - 1; I & f;) f >>= 1;
                if (0 !== f ? (I &= f - 1, I += f) : I = 0, y++, 0 == --_[g]) {
                    if (g === v) break;
                    g = t[r + s[y]]
                }
                if (g > b && (I & l) !== u) {
                    for (0 === E && (E = b), h += m, w = g - E, C = 1 << w; w + E < v && (C -= _[w + E], !(C <= 0));) w++, C <<= 1;
                    if (S += 1 << w, 1 === e && S > 852 || 2 === e && S > 592) return 1;
                    u = I & l, n[u] = b << 24 | w << 16 | h - a | 0
                }
            }
            return 0 !== I && (n[h + I] = g - E << 24 | 64 << 16 | 0), o.bits = b, 0
        };
        const {
                Z_FINISH: Bt,
                Z_BLOCK: Nt,
                Z_TREES: kt,
                Z_OK: Rt,
                Z_STREAM_END: Lt,
                Z_NEED_DICT: Mt,
                Z_STREAM_ERROR: Ut,
                Z_DATA_ERROR: Pt,
                Z_MEM_ERROR: Dt,
                Z_BUF_ERROR: xt,
                Z_DEFLATED: Ot
            } = ie, Vt = 16180, Kt = 16190, zt = 16191, qt = 16192, Ft = 16194, jt = 16199, Ht = 16200, Gt = 16206,
            Wt = 16209, Qt = e => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);

        function Zt() {
            this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new Uint16Array(320), this.work = new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
        }

        const Xt = e => {
            if (!e) return 1;
            const t = e.state;
            return !t || t.strm !== e || t.mode < Vt || t.mode > 16211 ? 1 : 0
        }, Yt = e => {
            if (Xt(e)) return Ut;
            const t = e.state;
            return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = Vt, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(852), t.distcode = t.distdyn = new Int32Array(592), t.sane = 1, t.back = -1, Rt
        }, $t = e => {
            if (Xt(e)) return Ut;
            const t = e.state;
            return t.wsize = 0, t.whave = 0, t.wnext = 0, Yt(e)
        }, Jt = (e, t) => {
            let r;
            if (Xt(e)) return Ut;
            const i = e.state;
            return t < 0 ? (r = 0, t = -t) : (r = 5 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? Ut : (null !== i.window && i.wbits !== t && (i.window = null), i.wrap = r, i.wbits = t, $t(e))
        }, er = (e, t) => {
            if (!e) return Ut;
            const r = new Zt;
            e.state = r, r.strm = e, r.window = null, r.mode = Vt;
            const i = Jt(e, t);
            return i !== Rt && (e.state = null), i
        };
        let tr, rr, ir = !0;
        const nr = e => {
            if (ir) {
                tr = new Int32Array(512), rr = new Int32Array(32);
                let t = 0;
                for (; t < 144;) e.lens[t++] = 8;
                for (; t < 256;) e.lens[t++] = 9;
                for (; t < 280;) e.lens[t++] = 7;
                for (; t < 288;) e.lens[t++] = 8;
                for (Tt(1, e.lens, 0, 288, tr, 0, e.work, {bits: 9}), t = 0; t < 32;) e.lens[t++] = 5;
                Tt(2, e.lens, 0, 32, rr, 0, e.work, {bits: 5}), ir = !1
            }
            e.lencode = tr, e.lenbits = 9, e.distcode = rr, e.distbits = 5
        }, ar = (e, t, r, i) => {
            let n;
            const a = e.state;
            return null === a.window && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new Uint8Array(a.wsize)), i >= a.wsize ? (a.window.set(t.subarray(r - a.wsize, r), 0), a.wnext = 0, a.whave = a.wsize) : (n = a.wsize - a.wnext, n > i && (n = i), a.window.set(t.subarray(r - i, r - i + n), a.wnext), (i -= n) ? (a.window.set(t.subarray(r - i, r), 0), a.wnext = i, a.whave = a.wsize) : (a.wnext += n, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += n))), 0
        };
        var sr = {
            inflateReset: $t,
            inflateReset2: Jt,
            inflateResetKeep: Yt,
            inflateInit: e => er(e, 15),
            inflateInit2: er,
            inflate: (e, t) => {
                let r, i, n, a, s, o, c, f, d, u, l, h, p, g, y, m, v, b, w, E, C, S, I = 0;
                const A = new Uint8Array(4);
                let _, T;
                const B = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
                if (Xt(e) || !e.output || !e.input && 0 !== e.avail_in) return Ut;
                r = e.state, r.mode === zt && (r.mode = qt), s = e.next_out, n = e.output, c = e.avail_out, a = e.next_in, i = e.input, o = e.avail_in, f = r.hold, d = r.bits, u = o, l = c, S = Rt;
                e:for (; ;) switch (r.mode) {
                    case Vt:
                        if (0 === r.wrap) {
                            r.mode = qt;
                            break
                        }
                        for (; d < 16;) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        if (2 & r.wrap && 35615 === f) {
                            0 === r.wbits && (r.wbits = 15), r.check = 0, A[0] = 255 & f, A[1] = f >>> 8 & 255, r.check = te(r.check, A, 2, 0), f = 0, d = 0, r.mode = 16181;
                            break
                        }
                        if (r.head && (r.head.done = !1), !(1 & r.wrap) || (((255 & f) << 8) + (f >> 8)) % 31) {
                            e.msg = "incorrect header check", r.mode = Wt;
                            break
                        }
                        if ((15 & f) !== Ot) {
                            e.msg = "unknown compression method", r.mode = Wt;
                            break
                        }
                        if (f >>>= 4, d -= 4, C = 8 + (15 & f), 0 === r.wbits && (r.wbits = C), C > 15 || C > r.wbits) {
                            e.msg = "invalid window size", r.mode = Wt;
                            break
                        }
                        r.dmax = 1 << r.wbits, r.flags = 0, e.adler = r.check = 1, r.mode = 512 & f ? 16189 : zt, f = 0, d = 0;
                        break;
                    case 16181:
                        for (; d < 16;) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        if (r.flags = f, (255 & r.flags) !== Ot) {
                            e.msg = "unknown compression method", r.mode = Wt;
                            break
                        }
                        if (57344 & r.flags) {
                            e.msg = "unknown header flags set", r.mode = Wt;
                            break
                        }
                        r.head && (r.head.text = f >> 8 & 1), 512 & r.flags && 4 & r.wrap && (A[0] = 255 & f, A[1] = f >>> 8 & 255, r.check = te(r.check, A, 2, 0)), f = 0, d = 0, r.mode = 16182;
                    case 16182:
                        for (; d < 32;) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        r.head && (r.head.time = f), 512 & r.flags && 4 & r.wrap && (A[0] = 255 & f, A[1] = f >>> 8 & 255, A[2] = f >>> 16 & 255, A[3] = f >>> 24 & 255, r.check = te(r.check, A, 4, 0)), f = 0, d = 0, r.mode = 16183;
                    case 16183:
                        for (; d < 16;) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        r.head && (r.head.xflags = 255 & f, r.head.os = f >> 8), 512 & r.flags && 4 & r.wrap && (A[0] = 255 & f, A[1] = f >>> 8 & 255, r.check = te(r.check, A, 2, 0)), f = 0, d = 0, r.mode = 16184;
                    case 16184:
                        if (1024 & r.flags) {
                            for (; d < 16;) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            r.length = f, r.head && (r.head.extra_len = f), 512 & r.flags && 4 & r.wrap && (A[0] = 255 & f, A[1] = f >>> 8 & 255, r.check = te(r.check, A, 2, 0)), f = 0, d = 0
                        } else r.head && (r.head.extra = null);
                        r.mode = 16185;
                    case 16185:
                        if (1024 & r.flags && (h = r.length, h > o && (h = o), h && (r.head && (C = r.head.extra_len - r.length, r.head.extra || (r.head.extra = new Uint8Array(r.head.extra_len)), r.head.extra.set(i.subarray(a, a + h), C)), 512 & r.flags && 4 & r.wrap && (r.check = te(r.check, i, h, a)), o -= h, a += h, r.length -= h), r.length)) break e;
                        r.length = 0, r.mode = 16186;
                    case 16186:
                        if (2048 & r.flags) {
                            if (0 === o) break e;
                            h = 0;
                            do {
                                C = i[a + h++], r.head && C && r.length < 65536 && (r.head.name += String.fromCharCode(C))
                            } while (C && h < o);
                            if (512 & r.flags && 4 & r.wrap && (r.check = te(r.check, i, h, a)), o -= h, a += h, C) break e
                        } else r.head && (r.head.name = null);
                        r.length = 0, r.mode = 16187;
                    case 16187:
                        if (4096 & r.flags) {
                            if (0 === o) break e;
                            h = 0;
                            do {
                                C = i[a + h++], r.head && C && r.length < 65536 && (r.head.comment += String.fromCharCode(C))
                            } while (C && h < o);
                            if (512 & r.flags && 4 & r.wrap && (r.check = te(r.check, i, h, a)), o -= h, a += h, C) break e
                        } else r.head && (r.head.comment = null);
                        r.mode = 16188;
                    case 16188:
                        if (512 & r.flags) {
                            for (; d < 16;) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            if (4 & r.wrap && f !== (65535 & r.check)) {
                                e.msg = "header crc mismatch", r.mode = Wt;
                                break
                            }
                            f = 0, d = 0
                        }
                        r.head && (r.head.hcrc = r.flags >> 9 & 1, r.head.done = !0), e.adler = r.check = 0, r.mode = zt;
                        break;
                    case 16189:
                        for (; d < 32;) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        e.adler = r.check = Qt(f), f = 0, d = 0, r.mode = Kt;
                    case Kt:
                        if (0 === r.havedict) return e.next_out = s, e.avail_out = c, e.next_in = a, e.avail_in = o, r.hold = f, r.bits = d, Mt;
                        e.adler = r.check = 1, r.mode = zt;
                    case zt:
                        if (t === Nt || t === kt) break e;
                    case qt:
                        if (r.last) {
                            f >>>= 7 & d, d -= 7 & d, r.mode = Gt;
                            break
                        }
                        for (; d < 3;) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        switch (r.last = 1 & f, f >>>= 1, d -= 1, 3 & f) {
                            case 0:
                                r.mode = 16193;
                                break;
                            case 1:
                                if (nr(r), r.mode = jt, t === kt) {
                                    f >>>= 2, d -= 2;
                                    break e
                                }
                                break;
                            case 2:
                                r.mode = 16196;
                                break;
                            case 3:
                                e.msg = "invalid block type", r.mode = Wt
                        }
                        f >>>= 2, d -= 2;
                        break;
                    case 16193:
                        for (f >>>= 7 & d, d -= 7 & d; d < 32;) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        if ((65535 & f) != (f >>> 16 ^ 65535)) {
                            e.msg = "invalid stored block lengths", r.mode = Wt;
                            break
                        }
                        if (r.length = 65535 & f, f = 0, d = 0, r.mode = Ft, t === kt) break e;
                    case Ft:
                        r.mode = 16195;
                    case 16195:
                        if (h = r.length, h) {
                            if (h > o && (h = o), h > c && (h = c), 0 === h) break e;
                            n.set(i.subarray(a, a + h), s), o -= h, a += h, c -= h, s += h, r.length -= h;
                            break
                        }
                        r.mode = zt;
                        break;
                    case 16196:
                        for (; d < 14;) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        if (r.nlen = 257 + (31 & f), f >>>= 5, d -= 5, r.ndist = 1 + (31 & f), f >>>= 5, d -= 5, r.ncode = 4 + (15 & f), f >>>= 4, d -= 4, r.nlen > 286 || r.ndist > 30) {
                            e.msg = "too many length or distance symbols", r.mode = Wt;
                            break
                        }
                        r.have = 0, r.mode = 16197;
                    case 16197:
                        for (; r.have < r.ncode;) {
                            for (; d < 3;) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            r.lens[B[r.have++]] = 7 & f, f >>>= 3, d -= 3
                        }
                        for (; r.have < 19;) r.lens[B[r.have++]] = 0;
                        if (r.lencode = r.lendyn, r.lenbits = 7, _ = {bits: r.lenbits}, S = Tt(0, r.lens, 0, 19, r.lencode, 0, r.work, _), r.lenbits = _.bits, S) {
                            e.msg = "invalid code lengths set", r.mode = Wt;
                            break
                        }
                        r.have = 0, r.mode = 16198;
                    case 16198:
                        for (; r.have < r.nlen + r.ndist;) {
                            for (; I = r.lencode[f & (1 << r.lenbits) - 1], y = I >>> 24, m = I >>> 16 & 255, v = 65535 & I, !(y <= d);) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            if (v < 16) f >>>= y, d -= y, r.lens[r.have++] = v; else {
                                if (16 === v) {
                                    for (T = y + 2; d < T;) {
                                        if (0 === o) break e;
                                        o--, f += i[a++] << d, d += 8
                                    }
                                    if (f >>>= y, d -= y, 0 === r.have) {
                                        e.msg = "invalid bit length repeat", r.mode = Wt;
                                        break
                                    }
                                    C = r.lens[r.have - 1], h = 3 + (3 & f), f >>>= 2, d -= 2
                                } else if (17 === v) {
                                    for (T = y + 3; d < T;) {
                                        if (0 === o) break e;
                                        o--, f += i[a++] << d, d += 8
                                    }
                                    f >>>= y, d -= y, C = 0, h = 3 + (7 & f), f >>>= 3, d -= 3
                                } else {
                                    for (T = y + 7; d < T;) {
                                        if (0 === o) break e;
                                        o--, f += i[a++] << d, d += 8
                                    }
                                    f >>>= y, d -= y, C = 0, h = 11 + (127 & f), f >>>= 7, d -= 7
                                }
                                if (r.have + h > r.nlen + r.ndist) {
                                    e.msg = "invalid bit length repeat", r.mode = Wt;
                                    break
                                }
                                for (; h--;) r.lens[r.have++] = C
                            }
                        }
                        if (r.mode === Wt) break;
                        if (0 === r.lens[256]) {
                            e.msg = "invalid code -- missing end-of-block", r.mode = Wt;
                            break
                        }
                        if (r.lenbits = 9, _ = {bits: r.lenbits}, S = Tt(1, r.lens, 0, r.nlen, r.lencode, 0, r.work, _), r.lenbits = _.bits, S) {
                            e.msg = "invalid literal/lengths set", r.mode = Wt;
                            break
                        }
                        if (r.distbits = 6, r.distcode = r.distdyn, _ = {bits: r.distbits}, S = Tt(2, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, _), r.distbits = _.bits, S) {
                            e.msg = "invalid distances set", r.mode = Wt;
                            break
                        }
                        if (r.mode = jt, t === kt) break e;
                    case jt:
                        r.mode = Ht;
                    case Ht:
                        if (o >= 6 && c >= 258) {
                            e.next_out = s, e.avail_out = c, e.next_in = a, e.avail_in = o, r.hold = f, r.bits = d, Et(e, l), s = e.next_out, n = e.output, c = e.avail_out, a = e.next_in, i = e.input, o = e.avail_in, f = r.hold, d = r.bits, r.mode === zt && (r.back = -1);
                            break
                        }
                        for (r.back = 0; I = r.lencode[f & (1 << r.lenbits) - 1], y = I >>> 24, m = I >>> 16 & 255, v = 65535 & I, !(y <= d);) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        if (m && 0 == (240 & m)) {
                            for (b = y, w = m, E = v; I = r.lencode[E + ((f & (1 << b + w) - 1) >> b)], y = I >>> 24, m = I >>> 16 & 255, v = 65535 & I, !(b + y <= d);) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            f >>>= b, d -= b, r.back += b
                        }
                        if (f >>>= y, d -= y, r.back += y, r.length = v, 0 === m) {
                            r.mode = 16205;
                            break
                        }
                        if (32 & m) {
                            r.back = -1, r.mode = zt;
                            break
                        }
                        if (64 & m) {
                            e.msg = "invalid literal/length code", r.mode = Wt;
                            break
                        }
                        r.extra = 15 & m, r.mode = 16201;
                    case 16201:
                        if (r.extra) {
                            for (T = r.extra; d < T;) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            r.length += f & (1 << r.extra) - 1, f >>>= r.extra, d -= r.extra, r.back += r.extra
                        }
                        r.was = r.length, r.mode = 16202;
                    case 16202:
                        for (; I = r.distcode[f & (1 << r.distbits) - 1], y = I >>> 24, m = I >>> 16 & 255, v = 65535 & I, !(y <= d);) {
                            if (0 === o) break e;
                            o--, f += i[a++] << d, d += 8
                        }
                        if (0 == (240 & m)) {
                            for (b = y, w = m, E = v; I = r.distcode[E + ((f & (1 << b + w) - 1) >> b)], y = I >>> 24, m = I >>> 16 & 255, v = 65535 & I, !(b + y <= d);) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            f >>>= b, d -= b, r.back += b
                        }
                        if (f >>>= y, d -= y, r.back += y, 64 & m) {
                            e.msg = "invalid distance code", r.mode = Wt;
                            break
                        }
                        r.offset = v, r.extra = 15 & m, r.mode = 16203;
                    case 16203:
                        if (r.extra) {
                            for (T = r.extra; d < T;) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            r.offset += f & (1 << r.extra) - 1, f >>>= r.extra, d -= r.extra, r.back += r.extra
                        }
                        if (r.offset > r.dmax) {
                            e.msg = "invalid distance too far back", r.mode = Wt;
                            break
                        }
                        r.mode = 16204;
                    case 16204:
                        if (0 === c) break e;
                        if (h = l - c, r.offset > h) {
                            if (h = r.offset - h, h > r.whave && r.sane) {
                                e.msg = "invalid distance too far back", r.mode = Wt;
                                break
                            }
                            h > r.wnext ? (h -= r.wnext, p = r.wsize - h) : p = r.wnext - h, h > r.length && (h = r.length), g = r.window
                        } else g = n, p = s - r.offset, h = r.length;
                        h > c && (h = c), c -= h, r.length -= h;
                        do {
                            n[s++] = g[p++]
                        } while (--h);
                        0 === r.length && (r.mode = Ht);
                        break;
                    case 16205:
                        if (0 === c) break e;
                        n[s++] = r.length, c--, r.mode = Ht;
                        break;
                    case Gt:
                        if (r.wrap) {
                            for (; d < 32;) {
                                if (0 === o) break e;
                                o--, f |= i[a++] << d, d += 8
                            }
                            if (l -= c, e.total_out += l, r.total += l, 4 & r.wrap && l && (e.adler = r.check = r.flags ? te(r.check, n, l, s - l) : J(r.check, n, l, s - l)), l = c, 4 & r.wrap && (r.flags ? f : Qt(f)) !== r.check) {
                                e.msg = "incorrect data check", r.mode = Wt;
                                break
                            }
                            f = 0, d = 0
                        }
                        r.mode = 16207;
                    case 16207:
                        if (r.wrap && r.flags) {
                            for (; d < 32;) {
                                if (0 === o) break e;
                                o--, f += i[a++] << d, d += 8
                            }
                            if (4 & r.wrap && f !== (4294967295 & r.total)) {
                                e.msg = "incorrect length check", r.mode = Wt;
                                break
                            }
                            f = 0, d = 0
                        }
                        r.mode = 16208;
                    case 16208:
                        S = Lt;
                        break e;
                    case Wt:
                        S = Pt;
                        break e;
                    case 16210:
                        return Dt;
                    default:
                        return Ut
                }
                return e.next_out = s, e.avail_out = c, e.next_in = a, e.avail_in = o, r.hold = f, r.bits = d, (r.wsize || l !== e.avail_out && r.mode < Wt && (r.mode < Gt || t !== Bt)) && ar(e, e.output, e.next_out, l - e.avail_out), u -= e.avail_in, l -= e.avail_out, e.total_in += u, e.total_out += l, r.total += l, 4 & r.wrap && l && (e.adler = r.check = r.flags ? te(r.check, n, l, e.next_out - l) : J(r.check, n, l, e.next_out - l)), e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === zt ? 128 : 0) + (r.mode === jt || r.mode === Ft ? 256 : 0), (0 === u && 0 === l || t === Bt) && S === Rt && (S = xt), S
            },
            inflateEnd: e => {
                if (Xt(e)) return Ut;
                let t = e.state;
                return t.window && (t.window = null), e.state = null, Rt
            },
            inflateGetHeader: (e, t) => {
                if (Xt(e)) return Ut;
                const r = e.state;
                return 0 == (2 & r.wrap) ? Ut : (r.head = t, t.done = !1, Rt)
            },
            inflateSetDictionary: (e, t) => {
                const r = t.length;
                let i, n, a;
                return Xt(e) ? Ut : (i = e.state, 0 !== i.wrap && i.mode !== Kt ? Ut : i.mode === Kt && (n = 1, n = J(n, t, r, 0), n !== i.check) ? Pt : (a = ar(e, t, r, r), a ? (i.mode = 16210, Dt) : (i.havedict = 1, Rt)))
            },
            inflateInfo: "pako inflate (from Nodeca project)"
        };
        var or = function () {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
        };
        const cr = Object.prototype.toString, {
            Z_NO_FLUSH: fr,
            Z_FINISH: dr,
            Z_OK: ur,
            Z_STREAM_END: lr,
            Z_NEED_DICT: hr,
            Z_STREAM_ERROR: pr,
            Z_DATA_ERROR: gr,
            Z_MEM_ERROR: yr
        } = ie;

        function mr(e) {
            this.options = rt.assign({chunkSize: 65536, windowBits: 15, to: ""}, e || {});
            const t = this.options;
            t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(t.windowBits >= 0 && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new st, this.strm.avail_out = 0;
            let r = sr.inflateInit2(this.strm, t.windowBits);
            if (r !== ur) throw new Error(re[r]);
            if (this.header = new or, sr.inflateGetHeader(this.strm, this.header), t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = at.string2buf(t.dictionary) : "[object ArrayBuffer]" === cr.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (r = sr.inflateSetDictionary(this.strm, t.dictionary), r !== ur))) throw new Error(re[r])
        }

        function vr(e, t) {
            const r = new mr(t);
            if (r.push(e), r.err) throw r.msg || re[r.err];
            return r.result
        }

        mr.prototype.push = function (e, t) {
            const r = this.strm, i = this.options.chunkSize, n = this.options.dictionary;
            let a, s, o;
            if (this.ended) return !1;
            for (s = t === ~~t ? t : !0 === t ? dr : fr, "[object ArrayBuffer]" === cr.call(e) ? r.input = new Uint8Array(e) : r.input = e, r.next_in = 0, r.avail_in = r.input.length; ;) {
                for (0 === r.avail_out && (r.output = new Uint8Array(i), r.next_out = 0, r.avail_out = i), a = sr.inflate(r, s), a === hr && n && (a = sr.inflateSetDictionary(r, n), a === ur ? a = sr.inflate(r, s) : a === gr && (a = hr)); r.avail_in > 0 && a === lr && r.state.wrap > 0 && 0 !== e[r.next_in];) sr.inflateReset(r), a = sr.inflate(r, s);
                switch (a) {
                    case pr:
                    case gr:
                    case hr:
                    case yr:
                        return this.onEnd(a), this.ended = !0, !1
                }
                if (o = r.avail_out, r.next_out && (0 === r.avail_out || a === lr)) if ("string" === this.options.to) {
                    let e = at.utf8border(r.output, r.next_out), t = r.next_out - e, n = at.buf2string(r.output, e);
                    r.next_out = t, r.avail_out = i - t, t && r.output.set(r.output.subarray(e, e + t), 0), this.onData(n)
                } else this.onData(r.output.length === r.next_out ? r.output : r.output.subarray(0, r.next_out));
                if (a !== ur || 0 !== o) {
                    if (a === lr) return a = sr.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
                    if (0 === r.avail_in) break
                }
            }
            return !0
        }, mr.prototype.onData = function (e) {
            this.chunks.push(e)
        }, mr.prototype.onEnd = function (e) {
            e === ur && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = rt.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg
        };
        var br = {
            Inflate: mr, inflate: vr, inflateRaw: function (e, t) {
                return (t = t || {}).raw = !0, vr(e, t)
            }, ungzip: vr, constants: ie
        };
        const {Deflate: wr, deflate: Er, deflateRaw: Cr, gzip: Sr} = bt, {
            Inflate: Ir,
            inflate: Ar,
            inflateRaw: _r,
            ungzip: Tr
        } = br;
        var Br = {
            Deflate: wr,
            deflate: Er,
            deflateRaw: Cr,
            gzip: Sr,
            Inflate: Ir,
            inflate: Ar,
            inflateRaw: _r,
            ungzip: Tr,
            constants: ie
        };
        const Nr = {
            compress(e) {
                let t = Br.deflateRaw(new Uint8Array(e)), r = new ArrayBuffer(4 + t.length);
                new DataView(r).setUint32(0, e.byteLength, !0);
                let i = new Uint8Array(r);
                return i.set(t, 4), i.buffer
            }, decompress: e => Br.inflateRaw(new Uint8Array(e.slice(4))).buffer
        };

        class kr extends Error {
            static ERROR_CODE = {
                PARSE_ERROR: -32700,
                INVALID_REQUEST: -32600,
                METHOD_NOT_FOUND: -32601,
                INVALID_PARAMS: -32602,
                INTERNAL_ERROR: -32603
            };

            constructor(e, t = kr.ERROR_CODE.INTERNAL_ERROR) {
                super(e), this.code = t
            }
        }

        class Rr {
            static DATA_TYPE = {
                PROTOCOL_LIST: 1,
                SELECTED_PROTOCOL: 2,
                SESSION_KEY_EXCHANGE: 3,
                ERROR: 4,
                DATA: 5,
                SERVER_PUB_KEY: 16,
                ECJPAKE_ROUND_ONE: 32,
                ECJPAKE_ROUND_TWO: 33
            };
            static CIPHER_STEPS = {
                QR: [{name: "ecdh peer pub", timeout: 6e4}, {name: "key exchange", timeout: 5e3}],
                passcode: [{name: "set passcode", timeout: 6e4}, {
                    name: "ecjpake round one",
                    timeout: 5e3
                }, {name: "ecjpake round two", timeout: 5e3}, {name: "key exchange", timeout: 5e3}]
            };
            #Z;
            #X;
            #Y;
            #$;
            #J;
            #ee = void 0;
            #te = -1;
            #re;
            #ie;
            #ne = !1;
            #ae = 0;
            #se = new Map;
            #oe = new Map;

            constructor(e) {
                let t = "https:" === e.location.protocol ? "wss:" : "ws:",
                    r = e.location.pathname.replace(/\/[^/]*$/, "/");
                const i = `${t}//${e.location.host}${r}centrallinkws/`;
                this.#Z = new WebSocket(i), this.#Z.addEventListener("open", (t => {
                    this.#ce(e.protocols)
                })), this.#Z.addEventListener("close", (e => {
                    this.close()
                })), this.#Z.addEventListener("close", (e => {
                    this.close()
                })), this.#Z.addEventListener("message", (async e => {
                    if ("string" == typeof e.data) throw new Error("Central link does not accpet ws text data");
                    this.#fe(await e.data.arrayBuffer())
                }))
            }

            close() {
                this.#de(), this.#ne = !1, this.#ie = void 0, this.#re = void 0, this.#Z.close(), this.onClose?.()
            }

            onClose = () => {
            };
            onRequestPasscode = () => {
            };

            setPasscode(e) {
                try {
                    this.#ue("set passcode", "passcode"), this.#$ = new u({role: "client", secret: e});
                    const t = this.#$.writeRoundOne();
                    let r = new Uint8Array(1 + t.length);
                    r[0] = Rr.DATA_TYPE.ECJPAKE_ROUND_ONE, r.set(t, 1), this.#Z.send(r.buffer)
                } catch (t) {
                    throw this.#de(), this.#le(), this.onSecureSessionError?.(), t
                }
            }

            onDisplayPubKey = (e, t, r) => {
            };
            onSecureSessionEstablish = () => {
            };
            onSecureSessionError = () => {
            };

            async callAPI(e, t, r = 5e3) {
                try {
                    if (!this.#ne) throw new Error("secure session not established");
                    const i = this.#he(), n = `${i}`;
                    let a = {resolve: void 0, reject: void 0, timeoutHandle: void 0}, s = new Promise(((e, t) => {
                        a.resolve = e, a.reject = t
                    }));
                    return this.#pe({
                        jsonrpc: "2.0",
                        id: i,
                        method: `/api/${e}`,
                        params: t
                    }), this.#se.set(n, a), a.timeoutHandle = setTimeout((() => {
                        a.reject(new Error("Timeout")), this.#se.delete(n)
                    }), r), await s
                } catch (i) {
                    throw new kr(i?.message ?? `${i}`, i?.code)
                }
            }

            registerAPI(e, t) {
                this.#oe.set(`/api/${e}`, {func: t})
            }

            unregisterAPI(e) {
                this.#oe.delete(`/api/${e}`)
            }

            sendPush(e, t) {
                try {
                    if (!this.#ne) throw new Error("seucre session not established");
                    this.#pe({jsonrpc: "2.0", id: this.#he(), method: `/push/${e}`, params: t})
                } catch (r) {
                }
            }

            registerPush(e, t) {
                this.#oe.set(`/push/${e}`, {isPushHandler: !0, func: t})
            }

            unregisterPush(e) {
                this.#oe.delete(`/push/${e}`)
            }

            async #fe(e) {
                switch (new DataView(e).getUint8(0)) {
                    case Rr.DATA_TYPE.DATA: {
                        if (!this.#ne) throw new Error("Secure sesison not established");
                        const r = this.#ie.decrypt(e.slice(1)), i = Nr.decompress(r),
                            n = JSON.parse((new TextDecoder).decode(i));
                        if ("number" != typeof n.id) throw new Error("Invalid json rpc id");
                        if ("result" in n) {
                            const e = `${n.id}`;
                            let r = this.#se.get(e);
                            if (void 0 !== r) {
                                try {
                                    clearTimeout(r.timeoutHandle)
                                } catch (t) {
                                }
                                r.resolve(n.result)
                            }
                            this.#se.delete(e)
                        } else if ("error" in n) {
                            const e = `${n.id}`;
                            let r = this.#se.get(e);
                            if (void 0 !== r) {
                                try {
                                    clearTimeout(r.timeoutHandle)
                                } catch (t) {
                                }
                                r.reject(n.error)
                            }
                            this.#se.delete(e)
                        } else if ("method" in n) {
                            let e = this.#oe.get(n.method);
                            if (void 0 === e) break;
                            if (e.isPushHandler) e.func(n.params); else {
                                let r = {jsonrpc: "2.0", id: n.id};
                                try {
                                    r.result = await e.func(n.params) ?? {}
                                } catch (t) {
                                    r.error = {
                                        code: t?.code ?? kr.ERROR_CODE.INTERNAL_ERROR,
                                        message: t?.message ?? `${t}`
                                    }
                                }
                                this.#pe(r)
                            }
                        }
                    }
                        break;
                    case Rr.DATA_TYPE.SELECTED_PROTOCOL:
                        try {
                            let t = JSON.parse((new TextDecoder).decode(e.slice(1)));
                            this.#ge(t.protocol), "QR" === t.protocol ? (this.#Y = new l, this.onDisplayPubKey(this.#Y.writeSelfPub().buffer, t.params.did, t.params.id)) : "passcode" === t.protocol && this.onRequestPasscode()
                        } catch (t) {
                            throw this.#de(), this.#le(), this.onSecureSessionError?.(), t
                        }
                        break;
                    case Rr.DATA_TYPE.SERVER_PUB_KEY:
                        try {
                            this.#ue("ecdh peer pub", "QR");
                            const t = this.#Y.readPeerPub(new Uint8Array(e.slice(1)));
                            this.#ye(t)
                        } catch (t) {
                            throw this.#de(), this.#le(), this.onSecureSessionError?.(), t
                        }
                        break;
                    case Rr.DATA_TYPE.ECJPAKE_ROUND_ONE:
                        try {
                            this.#ue("ecjpake round one", "passcode"), this.#$.readRoundOne(new Uint8Array(e.slice(1)));
                            const t = this.#$.writeRoundTwo();
                            let r = new Uint8Array(1 + t.length);
                            r[0] = Rr.DATA_TYPE.ECJPAKE_ROUND_TWO, r.set(t, 1), this.#Z.send(r.buffer)
                        } catch (t) {
                            throw this.#de(), this.#le(), this.onSecureSessionError?.(), t
                        }
                        break;
                    case Rr.DATA_TYPE.ECJPAKE_ROUND_TWO:
                        try {
                            this.#ue("ecjpake round two", "passcode");
                            const t = this.#$.readRoundTwo(new Uint8Array(e.slice(1)));
                            this.#ye(t)
                        } catch (t) {
                            throw this.#de(), this.#le(), this.onSecureSessionError?.(), t
                        }
                        break;
                    case Rr.DATA_TYPE.SESSION_KEY_EXCHANGE:
                        try {
                            this.#ue("key exchange");
                            const t = new Uint8Array(this.#J.decrypt(e.slice(1))), r = t.slice(0, 16),
                                i = t.slice(16, 24);
                            this.#ie = new p(r, i), this.#de(), this.#ne = !0, this.onSecureSessionEstablish?.()
                        } catch (t) {
                            throw this.#de(), this.#le(), this.onSecureSessionError?.(), t
                        }
                        break;
                    case Rr.DATA_TYPE.ERROR:
                        this.#de(), this.onSecureSessionError?.()
                }
            }

            #pe(e) {
                if (!this.#ne) throw new Error("Secure session not established");
                let t = Nr.compress((new TextEncoder).encode(JSON.stringify(e)).buffer), r = this.#re.encrypt(t),
                    i = new Uint8Array(1 + r.byteLength);
                i[0] = Rr.DATA_TYPE.DATA, i.set(new Uint8Array(r), 1), this.#Z.send(i.buffer)
            }

            #le() {
                let e = new Uint8Array(1);
                e[0] = Rr.DATA_TYPE.ERROR, this.#Z.send(e.buffer)
            }

            #ce(e) {
                let t = (new TextEncoder).encode(JSON.stringify(e)), r = new Uint8Array(1 + t.length);
                r[0] = Rr.DATA_TYPE.PROTOCOL_LIST, r.set(t, 1), this.#Z.send(r.buffer), this.#ee = setTimeout((() => {
                    this.#de(), this.onSecureSessionError?.()
                }), 5e3)
            }

            #ye(e) {
                const t = e.slice(0, 16), r = e.slice(16, 24);
                this.#J = new p(t, r);
                const i = crypto.getRandomValues(new Uint8Array(24)), n = i.slice(0, 16), a = i.slice(16, 24);
                this.#re = new p(n, a);
                const s = this.#J.encrypt(i.buffer);
                let o = new Uint8Array(1 + s.byteLength);
                o[0] = Rr.DATA_TYPE.SESSION_KEY_EXCHANGE, o.set(new Uint8Array(s), 1), this.#Z.send(o.buffer)
            }

            #de() {
                try {
                    clearTimeout(this.#ee)
                } catch (e) {
                }
                this.#X = void 0, this.#te = -1, this.#$ = void 0, this.#Y = void 0, this.#J = void 0
            }

            #ge(e) {
                if (this.#de(), void 0 === Rr.CIPHER_STEPS[e]) throw new Error(`${e} is not a valid cipher`);
                this.#X = e, this.#te = -1, this.#ee = setTimeout((() => {
                    this.#de(), this.onSecureSessionError?.()
                }), Rr.CIPHER_STEPS[e][0].timeout)
            }

            #ue(e, t) {
                try {
                    if (void 0 === this.#X) throw new Error("Not in a key exchange session");
                    t = t ?? this.#X;
                    if (void 0 === Rr.CIPHER_STEPS[t]) throw new Error(`${t} is not a valid cipher`);
                    if (this.#te++, Rr.CIPHER_STEPS[t][this.#te].name !== e) throw new Error(`Wrong step ${e}, should be ${Rr.CIPHER_STEPS[t][this.#te].name}`);
                    try {
                        clearTimeout(this.#ee)
                    } catch (r) {
                    }
                    void 0 !== Rr.CIPHER_STEPS[t][this.#te + 1] && (this.#ee = setTimeout((() => {
                        this.#de(), this.onSecureSessionError?.()
                    }), Rr.CIPHER_STEPS[t][this.#te + 1].timeout))
                } catch (r) {
                    throw this.#de(), r
                }
            }

            #he() {
                let e = this.#ae;
                return this.#ae = (this.#ae + 1) % 4294967295, e
            }
        }

        class Lr {
            static OPS = {
                comma: {name: "comma", pri: 0},
                add: {name: "add", pri: 1},
                substract: {name: "substract", pri: 1},
                multiply: {name: "multiply", pri: 2},
                devide: {name: "devide", pri: 2},
                modulo: {name: "modulo", pri: 2},
                func: {name: "func", pri: 3},
                number: {name: "number", pri: 4}
            };
            static FUNCS = {
                "": {argc: 1},
                abs: {argc: 1},
                pow: {argc: 2},
                log: {argc: 2},
                sin: {argc: 1},
                cos: {argc: 1},
                tan: {argc: 1},
                asin: {argc: 1},
                acos: {argc: 1},
                atan: {argc: 1},
                max: {minArgc: 1},
                min: {minArgc: 1},
                round: {argc: 1},
                floor: {argc: 1},
                ceil: {argc: 1},
                rand: {argc: 0},
                randint: {argc: 2},
                now: {argc: 0},
                year: {argc: 0},
                month: {argc: 0},
                date: {argc: 0},
                day: {argc: 0},
                hours: {argc: 0},
                minutes: {argc: 0},
                seconds: {argc: 0},
                pi: {argc: 0},
                e: {argc: 0}
            };

            check(e) {
                let t;
                e = e.trim();
                let r = Lr.OPS.number, i = 0;
                for (let a = 0; a < e.length; a++) {
                    let n = e.charAt(a);
                    if ("(" === n) {
                        0 === i && r.pri > Lr.OPS.func.pri && (r = Lr.OPS.func, t = a), i++;
                        continue
                    }
                    if (")" === n) {
                        i--;
                        continue
                    }
                    if (0 !== i) continue;
                    if ("-" === n || "+" === n) {
                        let t = a - 1;
                        for (; t >= 0 && " " === e.charAt(t);) t--;
                        if (["e", "+", "-", "*", "/", "%"].includes(e.charAt(t))) continue
                    }
                    let s = {
                        ",": Lr.OPS.comma,
                        "+": Lr.OPS.add,
                        "-": Lr.OPS.substract,
                        "*": Lr.OPS.multiply,
                        "/": Lr.OPS.devide,
                        "%": Lr.OPS.modulo
                    }[n];
                    void 0 !== s && s.pri <= r.pri && (r = s, t = a)
                }
                if (0 !== i) throw new Error("Bracket error");
                let n = NaN;
                switch (r) {
                    case Lr.OPS.comma:
                        if (void 0 === t) throw new Error("Impossible");
                        return this.check(e.slice(0, t)) + this.check(e.slice(t + 1));
                    case Lr.OPS.add:
                    case Lr.OPS.substract:
                        if (void 0 === t) throw new Error("Impossible");
                        let r = e.slice(0, t), i = 0 === r.trim().length ? 1 : this.check(r),
                            a = this.check(e.slice(t + 1));
                        if (1 !== i) throw new Error("Invalid expression");
                        if (1 !== a) throw new Error("Invalid expression");
                        n = 1;
                        break;
                    case Lr.OPS.multiply:
                    case Lr.OPS.devide:
                    case Lr.OPS.modulo: {
                        if (void 0 === t) throw new Error("Impossible");
                        let r = this.check(e.slice(0, t)), i = this.check(e.slice(t + 1));
                        if (1 !== r) throw new Error("Invalid expression");
                        if (1 !== i) throw new Error("Invalid expression");
                        n = 1
                    }
                        break;
                    case Lr.OPS.func: {
                        if (void 0 === t) throw new Error("Impossible");
                        let r = e.slice(0, t).trim(), i = Lr.FUNCS[r];
                        if (void 0 === i) throw new Error("Invalid function");
                        let a = 0;
                        if (e.slice(t + 1, e.length - 1).match(/^\s*$/) || (a = this.check(e.slice(t + 1, e.length - 1))), "argc" in i && a !== i.argc) throw new Error("Invalid arg count");
                        if ("minArgc" in i && a < i.minArgc) throw new Error("invalid arg count");
                        n = 1
                    }
                        break;
                    case Lr.OPS.number:
                        if (e.match(/^\s*$/)) throw new Error("Invalid number");
                        if ("$" !== e && Number.isNaN(Number(e))) throw new Error("Invalid number");
                        n = 1
                }
                if (Number.isNaN(n)) throw new Error("Math error");
                return n
            }
        }

        const Mr = new Lr;

        class Ur {
            static checkWebNode(e) {
                if (!("id" in e) || "string" != typeof e.id) throw new Error("Invliad id");
                if (null !== e.id.match(/[^0-9|a-z|A-Z]/)) throw new Error("Invalid charactor in id");
                if ("string" != typeof e.type) throw new Error("Invalid type");
                if (!(e.type in Pr)) throw new Error(`Unsupported type: ${e.type}`);
                if ("object" != typeof e.props || null === e.props) throw new Error("Invalid props");
                if ("object" != typeof e.inputs || null === e.inputs) throw new Error("Invalid inputs");
                if ("object" != typeof e.outputs || null === e.outputs) throw new Error("Invalid outputs");
                for (const t in e.outputs) {
                    if (!Array.isArray(e.outputs[t])) throw new Error(`Invalid outputs: ${t}`);
                    for (const r of e.outputs[t]) if ("string" != typeof r || 2 !== r.split(".").length) throw new Error(`Invalid connection: ${t}->${r}`)
                }
                if ("object" != typeof e.cfg || null === e.cfg) throw new Error("Invalid cfg");
                if (!Number.isInteger(e.cfg.version)) throw new Error("Invalid cfg.version")
            }
        }

        const Pr = {
            deviceInput: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "deviceInput" !== e.type) throw new Error("Wrong type");
                    if ("string" != typeof e.props.did) throw new Error("Invalid did");
                    if (!Number.isInteger(e.props.siid)) throw new Error("Invalid siid");
                    if ("piid" in e.props) {
                        if (!Number.isInteger(e.props.piid)) throw new Error("Invalid piid");
                        if (!["int", "float", "boolean", "string"].includes(e.props.dtype)) throw new Error("Invalid dtype");
                        if (!("operator" in e.props)) throw new Error("Inavlid operator");
                        if (!("v1" in e.props)) throw new Error("Invalid v1");
                        if ("between" === e.props.operator && !("v2" in e.props)) throw new Error("Invalid v2");
                        if ("int" === e.props.dtype) {
                            if (![">=", "<=", "=", "!=", ">", "<", "between", "include"].includes(e.props.operator)) throw new Error("Invalid operator");
                            if ("include" === e.props.operator) {
                                if (!Array.isArray(e.props.v1)) throw new Error("Invalid v1");
                                for (const t of e.props.v1) if (!Number.isInteger(t)) throw new Error("Invalid v1 element")
                            } else if (!Number.isInteger(e.props.v1)) throw new Error("Invalid v1");
                            if ("v2" in e.props && !Number.isInteger(e.props.v2)) throw new Error("Invalid v2")
                        } else if ("float" === e.props.dtype) {
                            if (![">", "<", "between"].includes(e.props.operator)) throw new Error("Invalid operator");
                            if ("number" != typeof e.props.v1) throw new Error("Invalid v1");
                            if ("v2" in e.props && "number" != typeof e.props.v2) throw new Error("Invalid v2")
                        } else if ("boolean" === e.props.dtype) {
                            if (!["="].includes(e.props.operator)) throw new Error("Invalid operator");
                            if ("boolean" != typeof e.props.v1) throw new Error("Invalid v1")
                        } else if ("string" === e.props.dtype) {
                            if (!["="].includes(e.props.operator)) throw new Error("Invalid operator");
                            if ("string" != typeof e.props.v1) throw new Error("Invalid v1")
                        }
                    } else {
                        if (!("eiid" in e.props)) throw new Error("Not property nor event");
                        if (!Number.isInteger(e.props.eiid)) throw new Error("Invalid eiid");
                        if ("arguments" in e.props) {
                            if (!Array.isArray(e.props.arguments)) throw new Error("Invalid arguments");
                            for (const t of e.props.arguments) {
                                if (!Number.isInteger(t.piid)) throw new Error("Invalid arg piid");
                                if (!["int", "float", "string", "boolean"].includes(t.dtype)) throw new Error("Invalid arg dtype");
                                if ("operator" in t) {
                                    if (!("v1" in t)) throw new Error("Invalid arg v1");
                                    if ("between" === t.operator && !("v2" in t)) throw new Error("Invalid arg v2");
                                    if ("int" === t.dtype) {
                                        if (![">=", "<=", "=", "!=", ">", "<", "between", "include"].includes(t.operator)) throw new Error("Invalid arg operator");
                                        if ("include" === t.operator) {
                                            if (!Array.isArray(t.v1)) throw new Error("Invalid arg v1");
                                            for (const e of t.v1) if (!Number.isInteger(e)) throw new Error("Invalid arg v1 element")
                                        } else if (!Number.isInteger(t.v1)) throw new Error("Invalid arg v1");
                                        if ("v2" in t && !Number.isInteger(t.v2)) throw new Error("Invalid arg v2")
                                    } else if ("float" === t.dtype) {
                                        if (![">", "<", "between"].includes(t.operator)) throw new Error("Invalid arg operator");
                                        if ("number" != typeof t.v1) throw new Error("Invalid arg v1");
                                        if ("v2" in t && "number" != typeof t.v2) throw new Error("Invalid arg v2")
                                    } else if ("boolean" === t.dtype) {
                                        if (!["="].includes(t.operator)) throw new Error("Invalid arg operator");
                                        if ("boolean" != typeof t.v1) throw new Error("Invalid arg v1")
                                    } else if ("string" === t.dtype) {
                                        if (!["="].includes(t.operator)) throw new Error("Invalid operator");
                                        if ("string" != typeof t.v1) throw new Error("Invalid v1")
                                    }
                                }
                            }
                        }
                    }
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, deviceOutput: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "deviceOutput" !== e.type) throw new Error("Wrong type");
                    if ("string" != typeof e.props.did) throw new Error("Invalid did");
                    if (!Number.isInteger(e.props.siid)) throw new Error("Invalid siid");
                    if ("piid" in e.props) {
                        if (!Number.isInteger(e.props.piid)) throw new Error("Invalid piid");
                        if ("value" in e.props) ; else {
                            if (!("scope" in e.props)) throw new Error("No value nor scope");
                            if ("string" != typeof e.props.scope) throw new Error("Invalid scope");
                            if ("string" != typeof e.props.id) throw new Error("Invalid id");
                            if (!["number", "boolean", "string"].includes(e.props.dtype)) throw new Error("Invalid dtype");
                            if ("number" === e.props.dtype) {
                                if ("number" != typeof e.props.max || Number.isNaN(e.props.max)) throw new Error("Invalid max");
                                if ("number" != typeof e.props.min || Number.isNaN(e.props.min)) throw new Error("Invalid min");
                                if ("number" != typeof e.props.step || Number.isNaN(e.props.step)) throw new Error("Invalid step")
                            }
                        }
                    } else {
                        if (!("aiid" in e.props)) throw new Error("No piid or aiid");
                        if (!Number.isInteger(e.props.aiid)) throw new Error("Invalid aiid");
                        if ("ins" in e.props) {
                            if (!Array.isArray(e.props.ins)) throw new Error("Invalid ins");
                            for (const t of e.props.ins) {
                                if (!("piid" in t) || !Number.isInteger(t.piid)) throw new Error("Invalid in.piid");
                                if ("value" in t) ; else {
                                    if (!("scope" in t)) throw new Error("No in.value nor in.scope");
                                    if ("string" != typeof t.scope) throw new Error("Invalid in.scope");
                                    if ("string" != typeof t.id) throw new Error("Invalid in.id");
                                    if (!["number", "boolean", "string"].includes(t.dtype)) throw new Error("Invalid in.dtype");
                                    if ("number" === t.dtype) {
                                        if ("number" != typeof t.max || Number.isNaN(t.max)) throw new Error("Invalid i.max");
                                        if ("number" != typeof t.min || Number.isNaN(t.min)) throw new Error("Invalid i.min");
                                        if ("number" != typeof t.step || Number.isNaN(t.step)) throw new Error("Invalid i.step")
                                    }
                                }
                            }
                        }
                    }
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, deviceGet: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "deviceGet" !== e.type) throw new Error("Wrong type");
                    if (!("did" in e.props) || "string" != typeof e.props.did) throw new Error("Invalid did");
                    if (!("siid" in e.props) || !Number.isInteger(e.props.siid)) throw new Error("Invalid siid");
                    if (!("piid" in e.props)) throw new Error("Not a property");
                    if (!Number.isInteger(e.props.piid)) throw new Error("Invalid piid");
                    if (!("dtype" in e.props) || !["int", "float", "boolean", "string"].includes(e.props.dtype)) throw new Error("Invalid dtype");
                    if (!("operator" in e.props)) throw new Error("Inavlid operator");
                    if (!("v1" in e.props)) throw new Error("Invalid v1");
                    if ("between" === e.props.operator && !("v2" in e.props)) throw new Error("Invalid v2");
                    if ("int" === e.props.dtype) {
                        if (![">=", "<=", "=", "!=", ">", "<", "between", "include"].includes(e.props.operator)) throw new Error("Invalid operator");
                        if ("include" === e.props.operator) {
                            if (!Array.isArray(e.props.v1)) throw new Error("Invalid v1");
                            for (const t of e.props.v1) if (!Number.isInteger(t)) throw new Error("Invalid v1")
                        } else if (!Number.isInteger(e.props.v1)) throw new Error("Invalid v1");
                        if ("v2" in e.props && !Number.isInteger(e.props.v2)) throw new Error("Invalid v2")
                    } else if ("float" === e.props.dtype) {
                        if (![">", "<", "between"].includes(e.props.operator)) throw new Error("Invalid operator");
                        if ("number" != typeof e.props.v1) throw new Error("Invalid v1");
                        if ("v2" in e.props && "number" != typeof e.props.v2) throw new Error("Invalid v2")
                    } else if ("boolean" === e.props.dtype) {
                        if (!["="].includes(e.props.operator)) throw new Error("Invalid operator");
                        if ("boolean" != typeof e.props.v1) throw new Error("Invalid v1")
                    } else if ("string" === e.props.dtype) {
                        if (!["="].includes(e.props.operator)) throw new Error("Invalid operator");
                        if ("string" != typeof e.props.v1) throw new Error("Invalid v1")
                    }
                    if (!("output" in e.outputs)) throw new Error("No output");
                    if (!("output2" in e.outputs)) throw new Error("No output2")
                }
            }, alarmClock: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "alarmClock" !== e.type) throw new Error("Wrong type");
                    if ("string" != typeof e.props.type) throw new Error("Invalid props.type");
                    if ("periodicAlarm" === e.props.type) {
                        if (!Number.isInteger(e.props.hour)) throw new Error("Invalid hour");
                        if (e.props.hour < 0 || e.props.hour > 23) throw new Error("Hour out of range");
                        if (!Number.isInteger(e.props.minute)) throw new Error("Invalid minute");
                        if (e.props.minute < 0 || e.props.minute > 59) throw new Error("Minute out of range");
                        if (!Number.isInteger(e.props.second)) throw new Error("Invalid second");
                        if (e.props.second < 0 || e.props.second > 59) throw new Error("Second out of range");
                        if ("object" != typeof e.props.filter || null === e.props.filter) throw new Error("Invalid filter");
                        if ("day" in e.props.filter) {
                            if ("inHoliday" in e.props.filter) throw new Error("Double filter");
                            if (!Array.isArray(e.props.filter.day)) throw new Error("Invalid filter.day");
                            for (const t of e.props.filter.day) if (t < 0 || t > 6 || !Number.isInteger(t)) throw new Error(`Invalid day:${t}`)
                        }
                        if ("inHoliday" in e.props.filter) {
                            if ("day" in e.props.filter) throw new Error("Double filter");
                            if ("boolean" != typeof e.props.filter.inHoliday) throw new Error("Invliad filter.inHoliday")
                        }
                    } else {
                        if ("sunset" !== e.props.type) throw new Error("Invalid props.type");
                        if (!("latitude" in e.props) || "number" != typeof e.props.latitude) throw new Error("Invalid latitude");
                        if (e.props.latitude < -90 || e.props.latitude > 90) throw new Error("Latitude out of range");
                        if (!("longitude" in e.props) || "number" != typeof e.props.longitude) throw new Error("Invalid longitude");
                        if (e.props.longitude < -180 || e.props.longitude > 180) throw new Error("Longitude out of range");
                        if ("boolean" != typeof e.props.isSunset) throw new Error("Invalid isSunset");
                        if (!Number.isInteger(e.props.offset)) throw new Error("Invalid offset");
                        if ("object" != typeof e.props.filter || null === e.props.filter) throw new Error("Invalid filter");
                        if ("day" in e.props.filter) {
                            if ("inHoliday" in e.props.filter) throw new Error("Double filter");
                            if (!Array.isArray(e.props.filter.day)) throw new Error("Invalid filter.day");
                            for (const t of e.props.filter.day) if (t < 0 || t > 6 || !Number.isInteger(t)) throw new Error(`Invalid day:${t}`)
                        }
                        if ("inHoliday" in e.props.filter) {
                            if ("day" in e.props.filter) throw new Error("Double filter");
                            if ("boolean" != typeof e.props.filter.inHoliday) throw new Error("Invliad filter.inHoliday")
                        }
                    }
                }
            }, timeRange: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "timeRange" !== e.type) throw new Error("Wrong type");
                    if ("object" != typeof e.props.start || null === e.props.start) throw new Error("Invalid start");
                    if (!Number.isInteger(e.props.start.hour)) throw new Error("Invalid start.hour");
                    if (e.props.start.hour < 0 || e.props.start.hour > 23) throw new Error("Start.hour out of range");
                    if (!Number.isInteger(e.props.start.minute)) throw new Error("Invalid start.minute");
                    if (e.props.start.minute < 0 || e.props.start.minute > 59) throw new Error("Start.minute out of range");
                    if (!Number.isInteger(e.props.start.second)) throw new Error("Invalid start.second");
                    if (e.props.start.second < 0 || e.props.start.second > 59) throw new Error("Start.second out of range");
                    if ("object" != typeof e.props.end || null === e.props.end) throw new Error("Invalid end");
                    if (!Number.isInteger(e.props.end.hour)) throw new Error("Invalid end.hour");
                    if (e.props.end.hour < 0 || e.props.end.hour > 23) throw new Error("end.hour out of range");
                    if (!Number.isInteger(e.props.end.minute)) throw new Error("Invalid end.minute");
                    if (e.props.end.minute < 0 || e.props.end.minute > 59) throw new Error("end.minute out of range");
                    if (!Number.isInteger(e.props.end.second)) throw new Error("Invalid end.second");
                    if (e.props.end.second < 0 || e.props.end.second > 59) throw new Error("end.second out of range");
                    if ("object" != typeof e.props.filter || null === e.props.filter) throw new Error("Invalid filter");
                    if ("day" in e.props.filter) {
                        if ("inHoliday" in e.props.filter) throw new Error("Double filter");
                        if (!Array.isArray(e.props.filter.day)) throw new Error("Invalid day filter");
                        for (const t of e.props.filter.day) if (!Number.isInteger(t) || t < 0 || t > 6) throw new Error("Invalid day filter")
                    }
                    if ("inHoliday" in e.props.filter) {
                        if ("day" in e.props.filter) throw new Error("Double filter");
                        if ("boolean" != typeof e.props.filter.inHoliday) throw new Error("Invalid holiday filter")
                    }
                }
            }, delay: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "delay" !== e.type) throw new Error("Wrong type");
                    if (!Number.isInteger(e.props.timeout)) throw new Error("Invalid timeout")
                }
            }, signalOr: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "signalOr" !== e.type) throw new Error("Wrong type");
                    for (const t in e.inputs) {
                        if (!t.startsWith("input")) throw new Error("Invalid input name");
                        if (!Number.isInteger(Number(t.substring(5)))) throw new Error("Invalid input name");
                        if (null !== e.inputs[t]) throw new Error(`Invalid input ${t}`)
                    }
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, logicOr: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "logicOr" !== e.type) throw new Error("Wrong type");
                    for (const t in e.inputs) {
                        if (!t.startsWith("input")) throw new Error("Invalid input name");
                        if (!Number.isInteger(Number(t.substring(5)))) throw new Error("Invalid input name");
                        if ("boolean" != typeof e.inputs[t] && null !== e.inputs[t]) throw new Error(`Invalid input ${t}`)
                    }
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, logicAnd: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "logicAnd" !== e.type) throw new Error("Wrong type");
                    for (const t in e.inputs) {
                        if (!t.startsWith("input")) throw new Error("Invalid input name");
                        if (!Number.isInteger(Number(t.substring(5)))) throw new Error("Invalid input name");
                        if ("boolean" != typeof e.inputs[t] && null !== e.inputs[t]) throw new Error(`Invalid input ${t}`)
                    }
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, logicNot: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "logicNot" !== e.type) throw new Error("Wrong type");
                    if (!("input" in e.inputs)) throw new Error("No input");
                    if ("boolean" != typeof e.inputs.input && null !== e.inputs.input) throw new Error("Invalid input");
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, condition: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "condition" !== e.type) throw new Error("Wrong type");
                    if (!("trigger" in e.inputs)) throw new Error("No trigger");
                    if (null !== e.inputs.trigger) throw new Error("Invlaid trigger");
                    if (!("condition" in e.inputs)) throw new Error("No condition");
                    if ("boolean" != typeof e.inputs.condition && null !== e.inputs.condition) throw new Error("Invalid condition");
                    if (!("met" in e.outputs)) throw new Error("No met");
                    if (!("unmet" in e.outputs)) throw new Error("No unmet")
                }
            }, loop: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "loop" !== e.type) throw new Error("Wrong type");
                    if (!Number.isInteger(e.props.interval)) throw new Error("Invalid interval");
                    if (!("start" in e.inputs)) throw new Error("No start");
                    if (!("stop" in e.inputs)) throw new Error("No stop");
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, onlyNTimes: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "onlyNTimes" !== e.type) throw new Error("Wrong type");
                    if (!Number.isInteger(e.props.n) || e.props.n < 1) throw new Error("Invalid n");
                    if (!("input" in e.inputs)) throw new Error("No input");
                    if (!("zero" in e.inputs)) throw new Error("No zero");
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, counter: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "counter" !== e.type) throw new Error("Wrong type");
                    if (!Number.isInteger(e.props.n) || e.props.n < 1) throw new Error("Invalid n");
                    if (!("input" in e.inputs)) throw new Error("No input");
                    if (!("zero" in e.inputs)) throw new Error("No zero");
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, modeSwitch: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "modeSwitch" !== e.type) throw new Error("Wrong type");
                    if (!("input" in e.inputs)) throw new Error("No input");
                    let t = Object.keys(e.outputs).length;
                    for (let r = 0; r < t; r++) if (!(`output${r}` in e.outputs)) throw new Error(`output${r} missing`)
                }
            }, register: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "register" !== e.type) throw new Error("Wrong type");
                    if (!("setTrue" in e.inputs)) throw new Error("No setTrue");
                    if (!("setFalse" in e.inputs)) throw new Error("No setFalse");
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, eventSequence: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "eventSequence" !== e.type) throw new Error("Wrong type");
                    if (!("input1" in e.inputs)) throw new Error("No input1");
                    if (!("input2" in e.inputs)) throw new Error("No input2");
                    if (!("timeout" in e.props)) throw new Error("No timeout");
                    if (!Number.isInteger(e.props.timeout) || e.props.timeout <= 0) throw new Error("Invalid timeout");
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, statusLast: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "statusLast" !== e.type) throw new Error("Wrong type");
                    if (!("input" in e.inputs)) throw new Error("No input");
                    if (!("output" in e.outputs)) throw new Error("No output");
                    if (!("timeout" in e.props)) throw new Error("No timeout");
                    if (!Number.isInteger(e.props.timeout) || e.props.timeout <= 0) throw new Error("Invalid timeout")
                }
            }, onLoad: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "onLoad" !== e.type) throw new Error("Wrong type");
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, nop: class extends Ur {
            }, deviceInputSetVar: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "deviceInputSetVar" !== e.type) throw new Error("Wrong type");
                    if ("string" != typeof e.props.did) throw new Error("Invalid did");
                    if (!Number.isInteger(e.props.siid)) throw new Error("Invalid siid");
                    if ("piid" in e.props) {
                        if (!Number.isInteger(e.props.piid)) throw new Error("Invalid piid");
                        if (!["number", "boolean", "string"].includes(e.props.dtype)) throw new Error("Invalid dtype");
                        if ("string" != typeof e.props.scope) throw new Error("Invalid scope");
                        if ("string" != typeof e.props.id) throw new Error("Invalid var id");
                        if ("preload" in e.props && "boolean" != typeof e.props.preload) throw new Error("Invalid preload")
                    } else {
                        if (!("eiid" in e.props)) throw new Error("Not property nor event");
                        if (!Number.isInteger(e.props.eiid)) throw new Error("Invalid eiid");
                        if (!Array.isArray(e.props.arguments)) throw new Error("Invalid arguments");
                        for (const t of e.props.arguments) {
                            if (!Number.isInteger(t.piid)) throw new Error("Invalid arg piid");
                            if (!["number", "boolean", "string"].includes(t.dtype)) throw new Error("Invalid dtype");
                            if ("scope" in t) {
                                if ("string" != typeof t.scope) throw new Error("Invalid scope");
                                if ("string" != typeof t.id) throw new Error("Invalid var id")
                            }
                        }
                    }
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, deviceGetSetVar: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "deviceGetSetVar" !== e.type) throw new Error("Wrong type");
                    if (!("props" in e)) throw new Error("No props");
                    if ("string" != typeof e.props.did) throw new Error("Invalid did");
                    if (!Number.isInteger(e.props.siid)) throw new Error("Invalid siid");
                    if (!("piid" in e.props)) throw new Error("Not a property");
                    if (!Number.isInteger(e.props.piid)) throw new Error("Invalid piid");
                    if (!["number", "boolean", "string"].includes(e.props.dtype)) throw new Error("Invalid dtype");
                    if ("string" != typeof e.props.scope) throw new Error("Invalid scope");
                    if ("string" != typeof e.props.id) throw new Error("Invalid var id");
                    if (!("inputs" in e)) throw new Error("No inputs");
                    if (!("input" in e.inputs)) throw new Error("No inputs.input");
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, varChange: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "varChange" !== e.type) throw new Error("Wrong type");
                    if ("string" != typeof e.props.scope) throw new Error("Invalid scope");
                    if ("string" != typeof e.props.id) throw new Error("Invalid var id");
                    if (!["number", "string"].includes(e.props.varType)) throw new Error("Invalid var type");
                    if ("boolean" != typeof e.props.preload) throw new Error("Invalid preload");
                    if ("string" === e.props.varType) {
                        if ("=" !== e.props.operator) throw new Error("Invalid operator");
                        if ("string" != typeof e.props.v1) throw new Error("Invalid v1")
                    } else {
                        if (![">=", "<=", "=", "!=", ">", "<", "between"].includes(e.props.operator)) throw new Error("Invalid operator");
                        if ("number" != typeof e.props.v1 || Number.isNaN(e.props.v1)) throw new Error("Invalid v1");
                        if ("between" === e.props.operator && ("number" != typeof e.props.v2 || Number.isNaN(e.props.v2))) throw new Error("Invalid v2")
                    }
                    if (!("output" in e.outputs)) throw new Error("No output")
                }
            }, varGet: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "varGet" !== e.type) throw new Error("Wrong type");
                    if ("string" != typeof e.props.scope) throw new Error("Invalid scope");
                    if ("string" != typeof e.props.id) throw new Error("Invalid var id");
                    if (!["number", "string"].includes(e.props.varType)) throw new Error("Invalid var type");
                    if ("string" === e.props.varType) {
                        if ("=" !== e.props.operator) throw new Error("Invalid operator");
                        if ("string" != typeof e.props.v1) throw new Error("Invalid v1")
                    } else {
                        if (![">=", "<=", "=", "!=", ">", "<", "between"].includes(e.props.operator)) throw new Error("Invalid operator");
                        if ("number" != typeof e.props.v1 || Number.isNaN(e.props.v1)) throw new Error("Invalid v1");
                        if ("between" === e.props.operator && ("number" != typeof e.props.v2 || Number.isNaN(e.props.v2))) throw new Error("Invalid v2")
                    }
                    if (!("input" in e.inputs)) throw new Error("No input");
                    if (!("output" in e.outputs)) throw new Error("No output");
                    if (!("output2" in e.outputs)) throw new Error("No output2")
                }
            }, varSetNumber: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "varSetNumber" !== e.type) throw new Error("Wrong type");
                    if (!("input" in e.inputs)) throw new Error("No input");
                    if ("string" != typeof e.props.scope) throw new Error("Invalid scope");
                    if ("string" != typeof e.props.id) throw new Error("Invalid var id");
                    if (!Array.isArray(e.props.elements)) throw new Error("Invalid elements");
                    for (const r of e.props.elements) if ("const" === r.type) {
                        if ("string" != typeof r.value) throw new Error("Invalid element value")
                    } else {
                        if ("var" !== r.type) throw new Error("Invalid element type");
                        if ("string" != typeof r.scope) throw new Error("Invalid element scope");
                        if ("string" != typeof r.id) throw new Error("Invalid element var id")
                    }
                    let t = e.props.elements.map((e => "const" === e.type ? e.value : "$")).join("");
                    Mr.check(t)
                }
            }, varSetString: class extends Ur {
                static checkWebNode(e) {
                    if (super.checkWebNode(e), "varSetString" !== e.type) throw new Error("Wrong type");
                    if (!("input" in e.inputs)) throw new Error("No input");
                    if ("string" != typeof e.props.scope) throw new Error("Invalid scope");
                    if ("string" != typeof e.props.id) throw new Error("Invalid var id");
                    if (!Array.isArray(e.props.elements)) throw new Error("Invalid elements");
                    for (const t of e.props.elements) if ("const" === t.type) {
                        if ("string" != typeof t.value) throw new Error("Invalid element value")
                    } else {
                        if ("var" !== t.type) throw new Error("Invalid element type");
                        if ("string" != typeof t.scope) throw new Error("Invalid element scope");
                        if ("string" != typeof t.id) throw new Error("Invalid element var id")
                    }
                }
            }
        }, Dr = {
            checkWebRule(e) {
                if (!("id" in e) || "string" != typeof e.id) throw new Error("Invlaid rule id");
                if (!("id" in e)) throw new Error("Inavlid cfg");
                if (e.cfg.id !== e.id) throw new Error("cfg.id and id not matching");
                if ("boolean" != typeof e.cfg.enable) throw new Error("Invlaid cfg.enable");
                if (!("nodes" in e) || !Array.isArray(e.nodes)) throw new Error("Invalid nodes");
                for (const t of e.nodes) Pr[t.type].checkWebNode(t)
            }
        };

        async function xr(e, t, r) {
            let i = [], n = new Map;
            for (const c of t.nodes) n.set(c.id, new Kr[c.type](c, r));
            let a = new Vr(void 0), s = [];
            for (const c of e) try {
                let e = Or(c);
                e.graphId === t.id && s.push(e)
            } catch (o) {
            }
            for (const c of s) try {
                if ("l" === c.type) {
                    const e = n.get(c.srcNodeId) ?? a, t = n.get(c.dstNodeId) ?? a,
                        r = {true: "真", false: "伪", null: "事件"}[c.value] ?? "未定义";
                    if (!(e.outputTypes[c.srcName]?.includes(c.value) ?? 1) || !(t.inputTypes[c.dstName]?.includes(c.value) ?? 1)) continue;
                    i.push({
                        timestamp: c.timestamp,
                        type: "link",
                        srcNodeId: c.srcNodeId,
                        srcName: c.srcName,
                        dstNodeId: c.dstNodeId,
                        dstName: c.dstName,
                        value: r
                    })
                } else if ("r" === c.type) {
                    let e = JSON.parse(c.info);
                    if ("object" != typeof e || null === e) continue;
                    if ("boolean" != typeof e.enable) continue;
                    i.push({timestamp: c.timestamp, type: "rule", value: e.enable ? "规则启用" : "规则停用"})
                } else {
                    let e = n.get(c.nodeId) ?? a;
                    if ("i" === c.type) {
                        const t = await e.getInfo(c);
                        void 0 !== t && i.push({timestamp: c.timestamp, type: "info", nodeId: c.nodeId, value: t})
                    } else {
                        const e = `错误码: ${c.errorCode ?? -1}, 错误信息: ${c.errorMessage ?? "未知错误"}`;
                        i.push({timestamp: c.timestamp, type: "error", nodeId: c.nodeId, value: e})
                    }
                }
            } catch (o) {
            }
            return i
        }

        function Or(e) {
            let t = e.split("|");
            const r = t[0];
            if ("3" !== r) throw new Error(`Unsupported log version ${r}`);
            const i = Number(t[1]);
            if (Number.isNaN(i)) throw new Error("Invalid timestamp");
            const n = t[2], a = t[3];
            if (void 0 === a) throw new Error("Invalid graph id");
            if ("l" === n) {
                if (7 !== t.length) throw new Error("Invalid link log length");
                const e = t[4], [s, o] = e.split(".");
                if (void 0 === s || void 0 === o) throw new Error("Invalid src");
                const c = t[5], [f, d] = c.split(".");
                if (void 0 === f || void 0 === d) throw new Error("Invalid dst");
                return {
                    version: r,
                    type: n,
                    timestamp: i,
                    graphId: a,
                    srcNodeId: s,
                    srcName: o,
                    dstNodeId: f,
                    dstName: d,
                    value: t[6]
                }
            }
            if ("i" === n) {
                if (6 !== t.length) throw new Error("Invalid info length");
                const e = t[4];
                if (void 0 === e) throw new Error("Invalid node id");
                return {version: r, type: n, timestamp: i, graphId: a, nodeId: e, info: t[5]}
            }
            if ("e" === n) {
                if (7 !== t.length) throw new Error("Invalid error length");
                const e = t[4];
                if (void 0 === e) throw new Error("Invalid node id");
                const s = Number(t[5]);
                if (Number.isNaN(s)) throw new Error("Invalid error code");
                return {version: r, type: n, timestamp: i, graphId: a, nodeId: e, errorCode: s, errorMessage: t[6]}
            }
            if ("r" === n) {
                if (5 !== t.length) throw new Error("Invalid rule log length");
                return {version: r, type: n, timestamp: i, graphId: a, info: t[4]}
            }
            throw new Error(`Unsupported log type ${n}`)
        }

        class Vr {
            inputTypes = {};
            outputTypes = {};
            params;

            constructor(e, t) {
                this.params = e
            }

            async getInfo(e) {
                return "未知信息"
            }
        }

        const Kr = {
            deviceInput: class extends Vr {
                outputTypes = {output: ["true", "false", "null"]}
            }, deviceOutput: class extends Vr {
                inputTypes = {trigger: ["null"]};
                outputTypes = {output: ["null"]};

                async getInfo(e) {
                    return "success" === e.info ? "执行成功" : `命令发送，参数为：${JSON.parse(e.info).join(",")}`
                }
            }, deviceGet: class extends Vr {
                inputTypes = {input: ["null"]};
                outputTypes = {output: ["null"], output2: ["null"]};
                valueList = void 0;

                async initValueList() {
                    if (void 0 !== this.valueList) return;
                    this.valueList = {};
                    let e = (await o.parse(this.params.cfg.urn)).propertyNotify.find((e => e.siid === this.params.props.siid && e.piid === this.params.props.piid));
                    if (void 0 !== e && "valueList" in e) for (const t of e.valueList) this.valueList[`${t.value}`] = t.description
                }

                async getInfo(e) {
                    return await this.initValueList(), `查询成功, 值为${this.valueList[e.info] ?? e.info}`
                }
            }, alarmClock: class extends Vr {
                outputTypes = {output: ["null"]}
            }, timeRange: class extends Vr {
                outputTypes = {output: ["true", "false", "null"]}
            }, delay: class extends Vr {
                inputTypes = {input: ["null"]};
                outputTypes = {output: ["null"]}
            }, signalOr: class extends Vr {
                constructor(e) {
                    super(e), this.outputTypes = {output: ["null"]};
                    let t = Object.keys(e.inputs).map((e => Number(e.replace("input", ""))));
                    t.sort(((e, t) => e - t));
                    for (const r in t) this.inputTypes[`input${t[r]}`] = ["null"]
                }
            }, logicOr: class extends Vr {
                constructor(e) {
                    super(e), this.outputTypes = {output: ["true", "false", "null"]};
                    let t = Object.keys(e.inputs).map((e => Number(e.replace("input", ""))));
                    t.sort(((e, t) => e - t));
                    for (const r in t) this.inputTypes[`input${t[r]}`] = ["true", "false"]
                }
            }, logicAnd: class extends Vr {
                constructor(e) {
                    super(e), this.outputTypes = {output: ["true", "false", "null"]};
                    let t = Object.keys(e.inputs).map((e => Number(e.replace("input", ""))));
                    t.sort(((e, t) => e - t));
                    for (const r in t) this.inputTypes[`input${t[r]}`] = ["true", "false"]
                }
            }, logicNot: class extends Vr {
                inputTypes = {input: ["true", "false"]};
                outputTypes = {output: ["true", "false", "null"]}
            }, condition: class extends Vr {
                inputTypes = {trigger: ["null"], condition: ["true", "false"]};
                outputTypes = {met: ["null"], unmet: ["null"]}
            }, loop: class extends Vr {
                inputTypes = {start: ["null"], stop: ["null"]};
                outputTypes = {output: ["null"]}
            }, onlyNTimes: class extends Vr {
                inputTypes = {input: ["null"], zero: ["null"]};
                outputTypes = {output: ["null"]};

                async getInfo(e) {
                    let t = JSON.parse(e.info);
                    return "n" in t ? `当前计数为${t.n}` : "max" in t ? "已达到上限" : super.getInfo(e)
                }
            }, counter: class extends Vr {
                inputTypes = {input: ["null"], zero: ["null"]};
                outputTypes = {output: ["true", "false", "null"]};

                async getInfo(e) {
                    let t = JSON.parse(e.info);
                    return "n" in t ? `当前计数为${t.n}` : super.getInfo(e)
                }
            }, modeSwitch: class extends Vr {
                constructor(e) {
                    super(e), this.inputTypes = {input: ["null"]};
                    let t = Object.keys(e.outputs).map((e => Number(e.replace("output", ""))));
                    t.sort(((e, t) => e - t));
                    for (const r in t) this.outputTypes[`output${t[r]}`] = ["null"]
                }
            }, register: class extends Vr {
                inputTypes = {setTrue: ["null"], setFalse: ["null"]};
                outputTypes = {output: ["true", "false", "null"]}
            }, eventSequence: class extends Vr {
                inputTypes = {input1: ["null"], input2: ["null"]};
                outputTypes = {output: ["null"]}
            }, statusLast: class extends Vr {
                inputTypes = {input: ["true", "false"]};
                outputTypes = {output: ["true", "false", "null"]}
            }, onLoad: class extends Vr {
                outputTypes = {output: ["null"]}
            }, nop: class extends Vr {
            }, deviceInputSetVar: class extends Vr {
                outputTypes = {output: ["null"]};

                async getInfo(e) {
                    return "piid" in this.params.props ? `变量被设置为：${e.info}` : `变量被设置为：${JSON.parse(e.info).map((e => JSON.stringify(e))).join(",")}`
                }
            }, deviceGetSetVar: class extends Vr {
                inputTypes = {input: ["null"]};
                outputTypes = {output: ["null"]};

                async getInfo(e) {
                    return `变量被设置为：${e.info}`
                }
            }, varChange: class extends Vr {
                outputTypes = {output: ["true", "false", "null"]}
            }, varGet: class extends Vr {
                inputTypes = {input: ["null"]};
                outputTypes = {output: ["null"], output2: ["null"]};

                async getInfo(e) {
                    return `查询到的变量值为：${e.info}`
                }
            }, varSetNumber: class extends Vr {
                inputTypes = {input: ["null"]};
                outputTypes = {output: ["null"]};

                async getInfo(e) {
                    return `变量被设置为：${e.info}`
                }
            }, varSetString: class extends Vr {
                inputTypes = {input: ["null"]};
                outputTypes = {output: ["null"]};

                async getInfo(e) {
                    return `变量被设置为：${e.info}`
                }
            }
        };

        class zr {
            static getLogId(e) {
                if ("nodeId" in e) return `node:${e.nodeId}`;
                if (void 0 === e.srcNodeId || void 0 === e.srcName) throw new Error("Invalid params");
                if ("dstNodeIdAndName" in e) return `link:${e.srcNodeId}.${e.srcName}->${e.dstNodeIdAndName}`;
                if (void 0 === e.dstName || void 0 === e.dstNodeId) throw new Error("Invalid params");
                return `link:${e.srcNodeId}.${e.srcName}->${e.dstNodeId}.${e.dstName}`
            }

            #me = [];

            constructor(e) {
                let t = e.rule.nodes, r = new Set;
                for (const a of t) {
                    r.add(zr.getLogId({nodeId: a.id}));
                    for (const e in a.outputs) {
                        const t = a.outputs[e];
                        for (const i of t) r.add(zr.getLogId({srcNodeId: a.id, srcName: e, dstNodeIdAndName: i}))
                    }
                }
                if (void 0 !== e.filter) {
                    let t = new Set(e.filter);
                    for (const e of r) t.has(e) || r.delete(e)
                }
                let i = {}, n = 0;
                for (const a of e.log) {
                    let e;
                    if ("rule" === a.type) {
                        if ("规则启用" !== a.value) continue;
                        i = {}
                    } else {
                        let t;
                        if (t = "link" === a.type ? zr.getLogId({
                            srcNodeId: a.srcNodeId,
                            srcName: a.srcName,
                            dstNodeId: a.dstNodeId,
                            dstName: a.dstName
                        }) : zr.getLogId({nodeId: a.nodeId}), !r.has(t)) continue;
                        i[t] = {order: n++, type: a.type, timestamp: a.timestamp, info: a.value}, e = t
                    }
                    this.#me.push({timestamp: a.timestamp, new: e, status: {...i}})
                }
            }

            get totalSteps() {
                return this.#me.length
            }

            getStepStatus(e) {
                if (e < 0 || e >= this.#me.length) throw new Error("Out of range");
                return this.#me[e]
            }

            #ve(e) {
                let t = Math.ceil(this.#me.length / 2), r = t, i = -1;
                for (; ;) {
                    let n = this.#me[r].timestamp, a = -1;
                    if (t = Math.ceil(t / 2), n === e) return r;
                    if (n > e ? (a = r - t, a < 0 && (a = 0)) : (a = r + t, a >= this.#me.length && (a = this.#me.length - 1)), i === a) return -1;
                    i = r, r = a
                }
            }

            #be(e) {
                let t = Math.ceil(this.#me.length / 2), r = t, i = -1;
                for (; ;) {
                    let n = this.#me[r].timestamp, a = -1;
                    if (t = Math.ceil(t / 2), n > e ? (a = r - t, a < 0 && (a = 0)) : (a = r + t, a >= this.#me.length && (a = this.#me.length - 1)), i === a) {
                        r = Math.min(i, r);
                        break
                    }
                    i = r, r = a
                }
                return this.#me[r].timestamp > e ? -1 : r
            }

            #we(e) {
                let t = Math.ceil(this.#me.length / 2), r = t, i = -1;
                for (; ;) {
                    let n = this.#me[r].timestamp, a = -1;
                    if (t = Math.ceil(t / 2), n > e ? (a = r - t, a < 0 && (a = 0)) : (a = r + t, a >= this.#me.length && (a = this.#me.length - 1)), i === a) {
                        r = Math.max(i, r);
                        break
                    }
                    i = r, r = a
                }
                return this.#me[r].timestamp < e ? -1 : r
            }

            findFrameIndex(e) {
                let t = this.#ve(e.timestamp);
                if (t < 0) return 0;
                for (; this.#me[t - 1]?.timestamp === e.timestamp;) t--;
                for (; ;) {
                    let r = this.#me[t];
                    if (r.timestamp !== e.timestamp) return 0;
                    if (r.new === e.new) {
                        if (void 0 !== r.new && void 0 !== e.new) {
                            const i = r.status[r.new], n = e.status[e.new];
                            if (i.type !== n.type) {
                                t++;
                                continue
                            }
                            if (i.info !== n.info) {
                                t++;
                                continue
                            }
                        }
                        return t
                    }
                    t++
                }
            }

            getStepRangeFromTimeRange(e) {
                if (e.end <= e.start) throw new Error("Invalid range");
                let t = this.#we(e.start);
                if (t < 0) throw new Error("Out of range");
                let r = this.#be(e.end);
                if (r < 0) throw new Error("Out of range");
                if (r < t) throw new Error("Empty range");
                return {start: t, end: r}
            }

            gotoNextWatchPoint(e) {
                if ("number" != typeof e.from) throw new Error("Invalid params");
                if (!Array.isArray(e.watchPoints)) throw new Error("Invalid params");
                let t = new Set(e.watchPoints);
                for (let r = e.from; r < this.#me.length; r++) {
                    let e = this.#me[r];
                    if (void 0 !== e.new && t.has(e.new)) return {
                        watchPoint: e.new,
                        step: r,
                        timestamp: e.timestamp,
                        status: {...e.status}
                    }
                }
                throw new Error("Out of range")
            }
        }

        class qr {
            #Ee;

            set session(e) {
                this.#Ee = e
            }

            get SCOPE_GLOBAL() {
                return "global"
            }

            async listScope() {
                if (void 0 === this.#Ee) throw new Error("session not set");
                return (await this.#Ee.callAPI("getVarScopeList", {}, 5e3)).scopes
            }

            async listVar(e) {
                if (void 0 === this.#Ee) throw new Error("session not set");
                if ("string" != typeof e) throw new Error("Invalid scope");
                return await this.#Ee.callAPI("getVarList", {scope: e}, 5e3)
            }

            async createVar(e) {
                if (void 0 === this.#Ee) throw new Error("session not set");
                if ("string" != typeof e.scope) throw new Error("Invalid params.scope");
                if ("string" != typeof e.id) throw new Error("Invalid params.id");
                if (!["number", "string"].includes(e.type)) throw new Error("Invalid params.type");
                if ("number" === e.type && "number" != typeof e.value && void 0 !== e.value) throw new Error("Invalid params.value");
                if ("string" === e.type && "string" != typeof e.value && void 0 !== e.value) throw new Error("Invalid params.value");
                await this.#Ee.callAPI("createVar", {
                    scope: e.scope,
                    id: e.id,
                    type: e.type,
                    value: e.value,
                    userData: e.userData
                }, 5e3)
            }

            async deleteVar(e) {
                if (void 0 === this.#Ee) throw new Error("session not set");
                if ("string" != typeof e.scope) throw new Error("Invalid params.scope");
                let t;
                if ("id" in e) {
                    if ("string" != typeof e.id) throw new Error("Invalid params.id");
                    t = {scope: e.scope, id: e.id}
                } else {
                    if (!("all" in e)) throw new Error("Invalid params");
                    if (!0 !== e.all) throw new Error("Invalid params.all");
                    t = {scope: e.scope, all: !0}
                }
                await this.#Ee.callAPI("deleteVar", t, 5e3)
            }

            async getVarConfig(e) {
                if (void 0 === this.#Ee) throw new Error("session not set");
                if ("string" != typeof e.scope) throw new Error("Invalid params.scope");
                if ("string" != typeof e.id) throw new Error("Invalid params.id");
                return await this.#Ee.callAPI("getVarConfig", {scope: e.scope, id: e.id}, 5e3)
            }

            async setVarConfig(e) {
                if (void 0 === this.#Ee) throw new Error("session not set");
                if ("string" != typeof e.scope) throw new Error("Invalid params.scope");
                if ("string" != typeof e.id) throw new Error("Invalid params.id");
                if (void 0 === e.userData) throw new Error("No change provided");
                await this.#Ee.callAPI("setVarConfig", {scope: e.scope, id: e.id, userData: e.userData}, 5e3)
            }

            async getVarValue(e) {
                if (void 0 === this.#Ee) throw new Error("session not set");
                if ("string" != typeof e.scope) throw new Error("Invalid params.scope");
                if ("string" != typeof e.id) throw new Error("Invalid params.id");
                return await this.#Ee.callAPI("getVarValue", {scope: e.scope, id: e.id}, 5e3)
            }

            async setVarValue(e) {
                if (void 0 === this.#Ee) throw new Error("session not set");
                if ("string" != typeof e.scope) throw new Error("Invalid params.scope");
                if ("string" != typeof e.id) throw new Error("Invalid params.id");
                if (!["number", "string"].includes(typeof e.value)) throw new Error("Invalid value type");
                if ("number" == typeof e.value && Number.isNaN(e.value)) throw new Error("Invalid number");
                await this.#Ee.callAPI("setVarValue", {scope: e.scope, id: e.id, value: e.value}, 5e3)
            }

            async generateBackup() {
                let e = {};
                const t = await this.listScope();
                for (const r of t) {
                    e[r] = {};
                    const t = await this.listVar(r);
                    for (const i in t) e[r][i] = t[i]
                }
                return e
            }

            async loadBackupDeleteAll() {
                const e = await this.listScope();
                for (const r of e) try {
                    await this.deleteVar({scope: r, all: !0})
                } catch (t) {
                }
            }

            async loadBackupload(e) {
                for (const r in e) for (const i in e[r]) {
                    const n = e[r][i];
                    try {
                        await this.createVar({
                            ...n,
                            scope: r,
                            id: i
                        }), void 0 !== n.value && await this.setVarValue({scope: r, id: i, value: n.value})
                    } catch (t) {
                    }
                }
            }
        }

        class Fr {
            #Ee;

            set session(e) {
                this.#Ee = e
            }

            #Ce(e) {
                if (void 0 === this.#Ee) throw new Error("session not set");
                if ("string" != typeof e.from) throw new Error("Invalid params.from")
            }

            async getBackupList(e, t = 3e4) {
                return this.#Ce(e), await this.#Ee.callAPI("getBackupList", e, t)
            }

            async createBackup(e, t, r = 6e4) {
                if (this.#Ce(e), "object" != typeof e.params) throw new Error("Invalid params.params");
                if ("string" != typeof e.params.fileName) throw new Error("Invalid params.params.fileName");
                if (0 === e.params.fileName.length) throw new Error("params.fileName cannot be empty");
                const i = await this.#Ee.callAPI("createBackup", e, 5e3);
                let n = 0;
                for (; ;) {
                    if (n > 60) throw new Error("timeout");
                    await new Promise((e => setTimeout(e, 1e3)));
                    try {
                        let r = await this.getBackupProgress({from: e.from, params: {progress_id: i}});
                        if (void 0 === r.progress) {
                            if ("code" in r) throw new Error(`${r.code}, ${r.message}`);
                            throw new Error("backup failed")
                        }
                        if (t(r), 100 === r.progress) break
                    } catch (a) {
                    }
                    n++
                }
            }

            async downloadBackup(e, t, r = 6e4) {
                if (this.#Ce(e), "object" != typeof e.params) throw new Error("Invalid params.params");
                if ("string" != typeof e.params.did) throw new Error("Invalid params.params.did");
                if ("string" != typeof e.params.ts) throw new Error("Invalid params.params.ts");
                if ("string" != typeof e.params.fileName) throw new Error("Invalid params.params.fileName");
                const i = await this.#Ee.callAPI("downloadBackup", e, r);
                if (0 === i) return void t({progress: 100});
                let n = 0;
                for (; ;) {
                    if (n > 60) throw new Error("timeout");
                    await new Promise((e => setTimeout(e, 1e3)));
                    try {
                        let r = await this.getBackupProgress({from: e.from, params: {progress_id: i}});
                        if (void 0 === r.progress) {
                            if ("code" in r) throw new Error(`${r.code}, ${r.message}`);
                            throw new Error("download failed")
                        }
                        if (t(r), 100 === r.progress) break
                    } catch (a) {
                    }
                    n++
                }
            }

            #Se(e) {
                let t = c.md.sha256.create();
                for (let n = 0; n < e.byteLength; n += 2e3) t.update(String.fromCharCode(...new Uint8Array(e.slice(n, n + 2e3))));
                let r = t.digest().bytes(32), i = new Uint8Array(32);
                for (let n = 0; n < r.length; n++) i[n] = r.charCodeAt(n);
                return i
            }

            async generateBackup(e, t, r = 3e4) {
                if (this.#Ce(e), "object" != typeof e.params) throw new Error("Invalid params.params");
                if ("string" != typeof e.params.did) throw new Error("Invalid params.params.did");
                if ("string" != typeof e.params.ts) throw new Error("Invalid params.params.ts");
                if ("string" != typeof e.params.fileName) throw new Error("Invalid params.params.fileName");
                await this.downloadBackup(e, t, r);
                const i = await this.#Ee.callAPI("generateBackup", e, r),
                    n = Nr.compress((new TextEncoder).encode(JSON.stringify(i))), a = this.#Se(n);
                let s = new Uint8Array(n.byteLength + a.buffer.byteLength);
                return s.set(new Uint8Array(n), 0), s.set(a, n.byteLength), s.buffer
            }

            async loadBackup(e, t, r = 3e4) {
                if (this.#Ce(e), "object" != typeof e.params) throw new Error("Invalid params.params");
                if ("string" != typeof e.params.did) throw new Error("Invalid params.params.did");
                if ("string" != typeof e.params.ts) throw new Error("Invalid params.params.ts");
                if ("string" != typeof e.params.fileName) throw new Error("Invalid params.params.fileName");
                return await this.downloadBackup(e, t, r), await this.#Ee.callAPI("loadBackup", e, r)
            }

            async deleteBackup(e, t = 5e3) {
                if (this.#Ce(e), "object" != typeof e.params) throw new Error("Invalid params.params");
                if ("string" != typeof e.params.did) throw new Error("Invalid params.params.did");
                if ("string" != typeof e.params.ts) throw new Error("Invalid params.params.ts");
                if ("string" != typeof e.params.fileName) throw new Error("Invalid params.params.fileName");
                return await this.#Ee.callAPI("deleteBackup", e, t)
            }

            async getBackupProgress(e, t = 5e3) {
                if (this.#Ce(e), "object" != typeof e.params) throw new Error("Invalid params.params");
                if ("number" != typeof e.params.progress_id) throw new Error("Invalid params.params.progress_id");
                return await this.#Ee.callAPI("getBackupProgress", e, t)
            }

            async setBackupConfig(e, t = 5e3) {
                if (this.#Ce(e), "object" != typeof e.params) throw new Error("Invalid params.params");
                if ("boolean" != typeof e.params.autoBackup) throw new Error("Invalid params.params.enable");
                if (void 0 !== e.params.autoBackupLimit && "number" != typeof e.params.autoBackupLimit) throw new Error("Invalid params.params.autoBackupLimit");
                return await this.#Ee.callAPI("setBackupConfig", e, t)
            }

            async getBackupConfig(e, t = 5e3) {
                return this.#Ce(e), await this.#Ee.callAPI("getBackupConfig", e, t)
            }
        }

        const jr = new class {
            #Ee = void 0;
            #Ie = void 0;
            #Ae = new Map;
            #_e = void 0;
            #Te = void 0;
            #Be = [];
            #Ne = {ruleId: void 0, cache: new Map};
            #ke = new qr;
            backupManager = new Fr;

            async init(e) {
                if (void 0 !== this.#Ee) throw new Error("Reinit detected, deinit first");
                this.#Ee = e, this.#ke.session = e, this.backupManager.session = e
            }

            async deinit() {
                this.#Ee = void 0, this.#ke.session = void 0, this.backupManager.session = void 0
            }

            checkRule(e, t) {
                Dr.checkWebRule({id: t.id, nodes: e, cfg: t})
            }

            async saveRule(e, t) {
                if (void 0 === this.#Ee) throw new Error("Not initialized");
                const r = {id: t.id, nodes: e, cfg: t};
                await this.#Ee.callAPI("setGraph", r, 5e3), this.#Ae.set(t.id, r), this.#Ne.ruleId === t.id && (this.#Ne.ruleId = void 0, this.#Ne.cache.clear())
            }

            async deleteRule(e) {
                if (void 0 === this.#Ee) throw new Error("Not initialized");
                await this.#Ee.callAPI("deleteGraph", {id: e.id}, 5e3), this.#Ae.delete(e.id), this.#Ne.ruleId === e.id && (this.#Ne.ruleId = void 0, this.#Ne.cache.clear())
            }

            async changeRuleConfig(e) {
                if (void 0 === this.#Ee) throw new Error("Not initialized");
                await this.#Ee.callAPI("changeGraphConfig", e, 5e3);
                let t = this.#Ae.get(e.id);
                t && (t.cfg = e)
            }

            async getRuleConfigList() {
                if (void 0 === this.#Ee) throw new Error("Not initialized");
                return await this.#Ee.callAPI("getGraphList", {}, 5e3)
            }

            async getRuleContent(e) {
                if (void 0 === this.#Ee) throw new Error("Not initialized");
                const t = {id: e.id, nodes: (await this.#Ee.callAPI("getGraph", {id: e.id}, 5e3)).nodes, cfg: e};
                return this.#Ae.set(e.id, t), t.nodes
            }

            #Se(e) {
                let t = c.md.sha256.create();
                for (let n = 0; n < e.byteLength; n += 2e3) t.update(String.fromCharCode(...new Uint8Array(e.slice(n, n + 2e3))));
                let r = t.digest().bytes(32), i = new Uint8Array(32);
                for (let n = 0; n < r.length; n++) i[n] = r.charCodeAt(n);
                return i
            }

            async generateBackup() {
                let e = await this.getRuleConfigList(), t = [];
                for (const s of e) t.push({id: s.id, cfg: s, nodes: await this.getRuleContent(s)});
                const r = {version: 2, rules: t, variables: await this.#ke.generateBackup()},
                    i = Nr.compress((new TextEncoder).encode(JSON.stringify(r))), n = this.#Se(i);
                let a = new Uint8Array(i.byteLength + n.buffer.byteLength);
                return a.set(new Uint8Array(i), 0), a.set(n, i.byteLength), a.buffer
            }

            async checkBackup(e) {
                if (e.byteLength < 32) throw new Error("Invalid data");
                let t = new Uint8Array(e.slice(e.byteLength - 32)), r = e.slice(0, e.byteLength - 32), i = this.#Se(r);
                for (let n = 0; n < 32; n++) if (i[n] !== t[n]) throw new Error("Invalid data")
            }

            async loadBackup(e) {
                if (e.byteLength < 32) throw new Error("Invalid data");
                let t = new Uint8Array(e.slice(e.byteLength - 32)), r = e.slice(0, e.byteLength - 32), i = this.#Se(r);
                for (let c = 0; c < 32; c++) if (i[c] !== t[c]) throw new Error("Invalid data");
                let n = JSON.parse((new TextDecoder).decode(Nr.decompress(r))), a = Array.isArray(n) ? n : n.rules,
                    s = Array.isArray(n) ? void 0 : n.variables, o = await this.getRuleConfigList();
                for (const c of o) await this.deleteRule(c);
                await this.#ke.loadBackupDeleteAll(), void 0 !== s && await this.#ke.loadBackupload(s);
                for (const c of a) await this.saveRule(c.nodes, c.cfg)
            }

            #Re(e) {
                return "object" == typeof e && null !== e && ("boolean" == typeof e.online && ("boolean" == typeof e.pushAvailable && ("boolean" == typeof e.specV2Access && ("string" == typeof e.model && ("string" == typeof e.modelName && ("string" == typeof e.urn && ("string" == typeof e.roomId && ("string" == typeof e.roomName && "string" == typeof e.name))))))))
            }

            async getDevList() {
                if (void 0 === this.#Ee) throw new Error("Not initialized");
                this.#Ie = (await this.#Ee.callAPI("getDevList", {}, 1e4)).devList;
                for (const e in this.#Ie) this.#Re(this.#Ie[e]) || delete this.#Ie[e];
                return this.#Ie
            }

            async #Le() {
                return void 0 !== this.#_e || (this.#_e = (async () => {
                    try {
                        if (void 0 === this.#Ee) throw new Error("Not initialized");
                        let t = [];
                        for (let r = 0; ; r++) {
                            let i = "";
                            try {
                                i = await this.#Ee.callAPI("getLog", {num: r}, 5e3)
                            } catch (e) {
                            }
                            if ("" === i) {
                                this.#Be = [];
                                break
                            }
                            let n = i.trimEnd().split("\n");
                            if (t.push(n), void 0 !== this.#Be[0]?.[0] && this.#Be[0][0] === n[0]) break
                        }
                        this.#Be.shift();
                        for (let e = t.length - 1; e >= 0; e--) {
                            const r = t[e];
                            this.#Be.unshift(r)
                        }
                        this.#_e = void 0
                    } catch (e) {
                        throw this.#_e = void 0, e
                    }
                })()), this.#_e
            }

            async parseLog(e) {
                if (void 0 === this.#Ee) throw new Error("Not initialized");
                for (await this.#Le(); void 0 !== this.#Te;) try {
                    await this.#Te
                } catch (r) {
                }
                let t = [];
                return this.#Te = (async () => {
                    try {
                        await new Promise((e => {
                            setTimeout((() => {
                                e(void 0)
                            }), 0)
                        }));
                        let r = this.#Ae.get(e.id);
                        if (void 0 === r && await this.getRuleContent(e), r = this.#Ae.get(e.id), void 0 === r) return void (this.#Te = void 0);
                        if (void 0 === this.#Ie && await this.getDevList(), void 0 === this.#Ie) throw new Error("Can not get device list");
                        e.id !== this.#Ne.ruleId && (this.#Ne.ruleId = e.id, this.#Ne.cache.clear());
                        let i = new Set;
                        for (const e of this.#Be) i.add(e[0]);
                        this.#Ne.cache.forEach(((e, t) => {
                            i.has(t) || this.#Ne.cache.delete(t)
                        }));
                        for (let e = this.#Be.length - 1; e >= 0; e--) {
                            const i = this.#Ne.cache.get(this.#Be[e][0]);
                            if (void 0 !== i && i.blockLength === this.#Be[e].length) t = t.concat(i.log); else {
                                const i = await xr(this.#Be[e], r, this.#Ie);
                                t = t.concat(i), this.#Ne.cache.set(this.#Be[e][0], {
                                    blockLength: this.#Be[e].length,
                                    log: i
                                })
                            }
                        }
                        this.#Te = void 0
                    } catch (r) {
                        throw this.#Te = void 0, r
                    }
                })(), await this.#Te, t
            }

            async getLogAnimationCalculator(e) {
                let t = this.#Ae.get(e.ruleCfg.id);
                if (void 0 === t && await this.getRuleContent(e.ruleCfg), t = this.#Ae.get(e.ruleCfg.id), void 0 === t) throw new Error("Rule not found");
                return new zr({rule: t, log: e.log, filter: e.filter})
            }

            getLogAnimationCalculatorLogId(e) {
                return zr.getLogId(e)
            }

            get varManager() {
                return this.#ke
            }
        }, Hr = {
            compareUrn: (e, t) => e.split(":").slice(0, 5).join(":") === t.split(":").slice(0, 5).join(":"),
            compareProperty(e, t) {
                if (!this.compareUrn(e.sUrn, t.sUrn)) return !1;
                if (!this.compareUrn(e.urn, t.urn)) return !1;
                if (e.dtype !== t.dtype) return !1;
                if ("valueRange" in e) {
                    if (!("valueRange" in t)) return !1;
                    if (e.valueRange.max !== t.valueRange.max) return !1;
                    if (e.valueRange.min !== t.valueRange.min) return !1;
                    if (e.valueRange.step !== t.valueRange.step) return !1
                }
                if ("valueList" in e) {
                    if (!("valueList" in t)) return !1;
                    if (e.valueList.length !== t.valueList.length) return !1;
                    for (const r of e.valueList) if (void 0 === t.valueList.find((e => e.value === r.value))) return !1
                }
                return !0
            },
            compareEvent(e, t) {
                if (!this.compareUrn(e.sUrn, t.sUrn)) return !1;
                if (!this.compareUrn(e.urn, t.urn)) return !1;
                if (void 0 !== e.arguments) {
                    if (void 0 === t.arguments) return !1;
                    if (e.arguments.length !== t.arguments.length) return !1;
                    for (const r of e.arguments) {
                        const i = t.arguments.find((i => this.compareProperty({
                            ...r,
                            siid: e.siid,
                            sUrn: e.sUrn,
                            sDescription: e.sDescription
                        }, {...i, siid: t.siid, sUrn: t.sUrn, sDescription: t.sDescription})));
                        if (void 0 === i || r.piid !== i.piid) return !1
                    }
                }
                return !0
            },
            compareAction(e, t) {
                if (!this.compareUrn(e.sUrn, t.sUrn)) return !1;
                if (!this.compareUrn(e.urn, t.urn)) return !1;
                if (e.in.length !== t.in.length) return !1;
                for (const r of e.in) {
                    const i = t.in.find((i => this.compareProperty({
                        ...r,
                        siid: e.siid,
                        sUrn: e.sUrn,
                        sDescription: e.sDescription
                    }, {...i, siid: t.siid, sUrn: t.sUrn, sDescription: t.sDescription})));
                    if (void 0 === i || r.piid !== i.piid) return !1
                }
                return !0
            },
            async findDeviceByCapability(e, t, r) {
                let i = [];
                for (const n in e) {
                    const a = e[n], s = await o.parse(a.urn);
                    switch (r) {
                        case"notify":
                            if ("piid" in t) for (const e of s.propertyNotify) this.compareProperty(e, t) && i.push({
                                did: n,
                                siid: e.siid,
                                piid: e.piid
                            }); else if ("eiid" in t) for (const e of s.event) this.compareEvent(e, t) && i.push({
                                did: n,
                                siid: e.siid,
                                eiid: e.eiid
                            });
                            break;
                        case"get":
                            if (!("piid" in t)) break;
                            for (const e of s.propertyGet) this.compareProperty(e, t) && i.push({
                                did: n,
                                siid: e.siid,
                                piid: e.piid
                            });
                            break;
                        case"set":
                            if ("piid" in t) for (const e of s.propertySet) this.compareProperty(e, t) && i.push({
                                did: n,
                                siid: e.siid,
                                piid: e.piid
                            }); else if ("aiid" in t) for (const e of s.action) this.compareAction(e, t) && i.push({
                                did: n,
                                siid: e.siid,
                                aiid: e.aiid
                            })
                    }
                }
                return i
            },
            async findSimilarDevice(e, t, r, i) {
                const n = await o.parse(t);
                let a;
                switch (i) {
                    case"notify":
                        "piid" in r ? a = n.propertyNotify.find((e => e.siid === r.siid && e.piid === r.piid)) : "eiid" in r && (a = n.event.find((e => e.siid === r.siid && e.eiid === r.eiid)));
                        break;
                    case"get":
                        if (!("piid" in r)) break;
                        a = n.propertyGet.find((e => e.siid === r.siid && e.piid === r.piid));
                        break;
                    case"set":
                        "piid" in r ? a = n.propertySet.find((e => e.siid === r.siid && e.piid === r.piid)) : "aiid" in r && (a = n.action.find((e => e.siid === r.siid && e.aiid === r.aiid)))
                }
                if (void 0 === a) throw new Error("Can not find the original function");
                return this.findDeviceByCapability(e, a, i)
            }
        }
    }, 18597: e => {
        "use strict";
        e.exports = {i8: "6.5.4"}
    }
}]);
