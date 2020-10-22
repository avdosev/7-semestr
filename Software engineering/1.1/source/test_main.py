import unittest
import sys

sys.path.append("../")
print(sys.path)
import randomizer
from Plot import Plot
import numpy as np



class RandomizerTest(unittest.TestCase):
    def test_size_is_equal(self):
        length = 100
        res = randomizer.getUniformInt(length, 0, 20)
        self.assertEqual(len(res), length)

    def test_random_generation_with_same_seed_are_equal(self):
        args = (10, 0, 2)

        np.random.seed(1)
        firstRes = randomizer.getNormalFloat(*args)

        np.random.seed(99)
        np.random.seed(1)
        secondRes = randomizer.getNormalFloat(*args)
        self.assertEqual(firstRes.all(), secondRes.all())



if __name__ == '__main__':
    unittest.main()
