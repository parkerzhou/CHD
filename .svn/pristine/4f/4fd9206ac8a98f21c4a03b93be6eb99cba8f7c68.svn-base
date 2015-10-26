package com.glorisun.chd.core.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.SecureRandom;
import java.security.Signature;
import java.util.StringTokenizer;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

/**
 * 本类主要实现加密,解密的服务, 支持：<br>
 * 1, 不可逆加密, 如MD5, SHA;<br>
 * 2, 可逆加密和解密, 如DES, DESede, BlowFish;<br>
 * 3, 签名验证.<br>
 * 本类的所有服务都是公用的静态方法, 可以通过类名直接调用.
 * 
 * @author XieYanTong 
 * @version 1.0
 *
 */
public class CodeUtil {

	
	/**
	 * 对字符串进行MD5加密, 密文长度为32位字符
	 * 
	 * @param info
	 *            要加密的字符串信息
	 * @return String 加密后的字符串
	 */
	public static String encodeByMD5(String info) {
		byte[] digesta = null;
		try {
			// 得到一个md5的消息摘要
			MessageDigest alga = MessageDigest.getInstance("MD5");
			// 添加要进行计算摘要的信息
			alga.update(info.getBytes());
			// 得到该摘要
			digesta = alga.digest();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return byte2Hex(digesta);
	}

	/**
	 * 对字符串进行SHA加密, 密文长度为40位字符
	 * 
	 * @param info
	 *            要加密的信息
	 * @return String 加密后的字符串
	 */
	public static String encodeBySHA(String info) {
		byte[] digesta = null;
		try {
			// 得到一个SHA-1的消息摘要
			MessageDigest alga = MessageDigest.getInstance("SHA-1");
			// 添加要进行计算摘要的信息
			alga.update(info.getBytes());
			// 得到该摘要
			digesta = alga.digest();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		// 将摘要转为字符串
		String rs = byte2Hex(digesta);
		return rs;
	}

	/**
	 * 创建密匙, 采用DES算法
	 * 
	 * @return SecretKey 密匙
	 */
	public static SecretKey createKey() {
		// 声明KeyGenerator对象
		KeyGenerator keygen;
		// 声明 密钥对象
		SecretKey deskey = null;
		try {
			// 返回生成指定算法的秘密密钥的 KeyGenerator 对象
			keygen = KeyGenerator.getInstance("DES");
			// 生成一个密钥
			deskey = keygen.generateKey();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		// 返回密匙
		return deskey;
	}

	/**
	 * 根据加密算法, 创建密匙.DES的密匙长度为16位字符, BlowFish为32位, DESede为48位
	 * 
	 * @param algorithm
	 *            加密算法,可用 DES,DESede,Blowfish
	 * @return SecretKey 秘密（对称）密钥
	 */
	public static SecretKey createKey(String algorithm) {
		// 声明KeyGenerator对象
		KeyGenerator keygen;
		// 声明 密钥对象
		SecretKey deskey = null;
		try {
			// 返回生成指定算法的秘密密钥的 KeyGenerator 对象
			keygen = KeyGenerator.getInstance(algorithm);
			// 生成一个密钥
			deskey = keygen.generateKey();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}

		// 返回密匙
		return deskey;
	}

	/**
	 * 将密匙保存到文件中
	 * 
	 * @param key
	 *            密匙
	 * @param fileName
	 *            用来保存密匙的文件名称
	 */
	public static void saveKeyToFile(SecretKey key, String fileName) {
		ObjectOutputStream oos = null;
		try {
			FileOutputStream fos = new FileOutputStream(new File(fileName));
			oos = new ObjectOutputStream(fos);
			oos.writeObject(key);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				oos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 从文件中取出密匙
	 * 
	 * @param fileName
	 *            保存密匙的文件名称
	 * @return 密匙
	 */
	public static SecretKey getKeyFromFile(String fileName) {
		ObjectInputStream ois = null;
		SecretKey obj = null;
		try {
			FileInputStream fis = new FileInputStream(new File(fileName));
			ois = new ObjectInputStream(fis);
			obj = (SecretKey) ois.readObject();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ois.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return obj;
	}

	/**
	 * 根据密匙对字节数组信息进行加密
	 * 
	 * @param key
	 *            密匙
	 * @param bytes
	 *            要加密的信息
	 * @return byte[] 加密后的信息
	 */
	public static byte[] encodeByKey(SecretKey key, byte[] bytes) {
		// 定义加密算法,可用 DES,DESede,Blowfish
		String algorithm = key.getAlgorithm();
		// 加密随机数生成器 (RNG),(可以不写)
		SecureRandom sr = new SecureRandom();
		// 定义要生成的密文
		byte[] cipherByte = null;
		try {
			// 得到加密/解密器
			Cipher c1 = Cipher.getInstance(algorithm);
			// 用指定的密钥和模式初始化Cipher对象
			// 参数:(ENCRYPT_MODE, DECRYPT_MODE, WRAP_MODE,UNWRAP_MODE)
			c1.init(Cipher.ENCRYPT_MODE, key, sr);
			// 对要加密的内容进行编码处理,
			cipherByte = c1.doFinal(bytes);
		} catch (Exception e) {
			e.printStackTrace();
		}
		// 返回密文
		return cipherByte;
	}

	/**
	 * 根据密匙对字符串信息加密
	 * 
	 * @param key
	 *            密匙
	 * @param info
	 *            要加密的信息
	 * @return String 加密后的信息
	 */
	public static String encodeByKey(SecretKey key, String info) {
		byte[] bytes = info.getBytes();
		return byte2Hex(encodeByKey(key, bytes));
	}

	/**
	 * 根据密匙对文件的内容进行可逆的加密
	 * 
	 * @param key
	 *            密匙
	 * @param sFile
	 *            文件对象
	 */
	public static void encodeByKey(SecretKey key, File sFile) {
		byte[] bytes = getDataFromFile(sFile);
		byte[] datas = encodeByKey(key, bytes);
		saveDataToFile(sFile.getName(), datas);
	}

	/**
	 * 根据密匙进行解密
	 * 
	 * @param key
	 *            密匙
	 * @param sInfo
	 *            要解密的密文
	 * @return String 返回解密后信息
	 */
	public static String decodeByKey(SecretKey key, String sInfo) {
		// 定义 加密算法,
		String algorithm = key.getAlgorithm();
		// 加密随机数生成器 (RNG)
		SecureRandom sr = new SecureRandom();
		byte[] cipherByte = null;
		try {
			// 得到加密/解密器
			Cipher c1 = Cipher.getInstance(algorithm);
			// 用指定的密钥和模式初始化Cipher对象
			c1.init(Cipher.DECRYPT_MODE, key, sr);
			// 对要解密的内容进行编码处理
			cipherByte = c1.doFinal(hex2byte(sInfo));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new String(cipherByte);
	}

	/**
	 * 根据密匙对已加密的文件进行解密
	 * 
	 * @param key
	 *            密匙
	 * @param file
	 *            文件（对象）
	 */
	public static void decryptByKey(SecretKey key, File file) {
		byte[] bytes = getDataFromFile(file);
		// 定义 加密算法,
		String algorithm = key.getAlgorithm();
		// 加密随机数生成器 (RNG)
		SecureRandom sr = new SecureRandom();
		byte[] cipherByte = null;
		try {
			// 得到加密/解密器
			Cipher c1 = Cipher.getInstance(algorithm);
			// 用指定的密钥和模式初始化Cipher对象
			c1.init(Cipher.DECRYPT_MODE, key, sr);
			// 对要解密的内容进行编码处理
			cipherByte = c1.doFinal(bytes);
		} catch (Exception e) {
			e.printStackTrace();
		}

		saveDataToFile(file.getName(), cipherByte);
	}

	// /////////////////////////////////////////////////////////////////////////////
	/**
	 * 创建密匙组，并将公匙，私匙放入到指定文件中
	 * 
	 * 默认放入mykeys.bat文件中
	 */
	public static void createPairKey() {
		try {
			// 根据特定的算法一个密钥对生成器
			KeyPairGenerator keygen = KeyPairGenerator.getInstance("DSA");
			// 加密随机数生成器 (RNG)
			SecureRandom random = new SecureRandom();
			// 重新设置此随机对象的种子
			random.setSeed(1000);
			// 使用给定的随机源（和默认的参数集合）初始化确定密钥大小的密钥对生成器
			keygen.initialize(512, random);// keygen.initialize(512);
			// 生成密钥组
			KeyPair keys = keygen.generateKeyPair();
			// 得到公匙
			PublicKey pubkey = keys.getPublic();
			// 得到私匙
			PrivateKey prikey = keys.getPrivate();
			// 将公匙私匙写入到文件当中
			doObjToFile("mykeys.bat", new Object[] { prikey, pubkey });
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 利用私匙对信息进行签名 把签名后的信息放入到指定的文件中
	 * 
	 * @param info
	 *            要签名的信息
	 * @param signfile
	 *            存入的文件
	 */
	public static void signToInfo(String info, String signfile) {
		// 从文件当中读取私匙
		PrivateKey myprikey = (PrivateKey) getObjFromFile("mykeys.bat", 1);
		// 从文件中读取公匙
		PublicKey mypubkey = (PublicKey) getObjFromFile("mykeys.bat", 2);
		try {
			// Signature 对象可用来生成和验证数字签名
			Signature signet = Signature.getInstance("DSA");
			// 初始化签署签名的私钥
			signet.initSign(myprikey);
			// 更新要由字节签名或验证的数据
			signet.update(info.getBytes());
			// 签署或验证所有更新字节的签名，返回签名
			byte[] signed = signet.sign();
			// 将数字签名,公匙,信息放入文件中
			doObjToFile(signfile, new Object[] { signed, mypubkey, info });
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 读取数字签名文件 根据公匙，签名，信息验证信息的合法性
	 * 
	 * @return true 验证成功 false 验证失败
	 */
	public static boolean validateSign(String signfile) {
		// 读取公匙
		PublicKey mypubkey = (PublicKey) getObjFromFile(signfile, 2);
		// 读取签名
		byte[] signed = (byte[]) getObjFromFile(signfile, 1);
		// 读取信息
		String info = (String) getObjFromFile(signfile, 3);
		try {
			// 初始一个Signature对象,并用公钥和签名进行验证
			Signature signetcheck = Signature.getInstance("DSA");
			// 初始化验证签名的公钥
			signetcheck.initVerify(mypubkey);
			// 使用指定的 byte 数组更新要签名或验证的数据
			signetcheck.update(info.getBytes());
			System.out.println(info);
			// 验证传入的签名
			return signetcheck.verify(signed);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	/**
	 * 将二进制转化为16进制字符串
	 * 
	 * @param bytes
	 *            二进制字节数组
	 * @return String
	 */
	public static String byte2Hex(byte[] bytes) {
		String hs = null;
		if (bytes != null) {
			final int size = bytes.length;
			if (size > 0) {
				StringBuilder sb = new StringBuilder();
				for (int i = 0; i < size; i++) {
					String tmp = (java.lang.Integer
							.toHexString(bytes[i] & 0XFF));
					if (tmp.length() == 1) {
						sb.append("0" + tmp);
					} else {
						sb.append(tmp);
					}
				}
				hs = sb.toString().toUpperCase();
			}
		}
		return hs;

	}

	/**
	 * 十六进制字符串转化为2进制
	 * 
	 * @param hex 十六进制字符串
	 * @return byte[] 字节数组
	 */
	public static byte[] hex2byte(String hex) {
		byte[] bytes = null;
		if (hex != null) {
			final int size = (hex.length()) / 2;
			if (size > 0) {
				bytes = new byte[size];
				for (int i = 0; i < size; i++) {
					String hsByte = hex.substring(i * 2, i * 2 + 2);
					byte b = 0;
					try {
						b = (byte) (Integer.parseInt(hsByte, 16));
					} catch (java.lang.NumberFormatException e) {
						b = 0;
					}
					bytes[i] = b;
				}
			}
		}
		return bytes;
	}

	/**
	 * 取出文件中的信息
	 * @param file 文件对象
	 * @return byte[] 字节数组信息
	 */
	public static byte[] getDataFromFile(File file) {
		FileInputStream fin;
		byte[] datas = null;
		try {
			fin = new FileInputStream(file);
			datas = new byte[fin.available()];
			fin.read(datas);
			fin.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return datas;
	}

	/**
	 * 将信息保存到文件中
	 * @param fileName 文件名称
	 * @param datas 信息（字节数组）
	 */
	public static void saveDataToFile(String fileName, byte[] datas) {
		try {
			FileOutputStream fout = new FileOutputStream(new File(fileName));
			fout.write(datas);
			fout.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 将指定的对象写入指定的文件
	 * 
	 * @param file
	 *            指定写入的文件
	 * @param objs
	 *            要写入的对象
	 */
	public static void doObjToFile(String file, Object[] objs) {
		ObjectOutputStream oos = null;
		try {
			FileOutputStream fos = new FileOutputStream(file);
			oos = new ObjectOutputStream(fos);
			for (int i = 0; i < objs.length; i++) {
				oos.writeObject(objs[i]);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				oos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	/**
	 * 返回在文件中指定位置的对象
	 * 
	 * @param file
	 *            指定的文件
	 * @param i
	 *            从1开始
	 * @return Object 对象
	 */
	public static Object getObjFromFile(String file, int i) {
		ObjectInputStream ois = null;
		Object obj = null;
		try {
			FileInputStream fis = new FileInputStream(file);
			ois = new ObjectInputStream(fis);
			for (int j = 0; j < i; j++) {
				obj = ois.readObject();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				ois.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return obj;
	}
    /** 
     * 将字符串按分隔符转换成字符数组 
     * @param string 字符串  
     * @param divisionChar 分隔符 
     * @return 字符串数组 
	 * @author dev_zhu
	 * @date 2012-12-24
	 */
	public static String[] stringAnalytical(String string, String divisionChar) {
		int i = 0;
		StringTokenizer tokenizer = new StringTokenizer(string, divisionChar);

		String[] str = new String[tokenizer.countTokens()];

		while (tokenizer.hasMoreTokens()) {
			str[i] = new String();
			str[i] = tokenizer.nextToken();
			i++;
		}
		return str;
	}  
	
    /** 
     * 切割指定长度的中英文(中文占二个字节) 
     * @param str 字符串  
     * @param len 长度
     * @return 字符串 
	 * @author dev_zhu
	 * @date 2013-01-23
	 */	
	public static String checkString(String str,int len){
		try {
			int counterOfDoubleByte = 0;
			byte[] b = str.getBytes("gb2312");
			if (b.length <= len)
				return str;
			for (int i = 0; i < len; i++) {
				if (b[i] < 0) {
					counterOfDoubleByte++;
				}
			}
			if (counterOfDoubleByte % 2 == 0)
				return new String(b, 0, len, "gb2312");
			else
				return new String(b, 0, len - 1, "gb2312");
		} catch (Exception ex) {
			return "";
		}
	}
}
